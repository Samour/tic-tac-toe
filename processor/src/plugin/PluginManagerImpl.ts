import { GameState, UnloadPlugin } from '@tictactoe/interfaces';
import { EventType } from '@tictactoe/interfaces/events';
import {
  CORE_RENDERER_PUBLISHER,
  PLUGIN_PUBLISHER,
  EventBus,
  IAttributedEvent,
  StateUpdatedEvent,
} from '@tictactoe/internal';
import { chainFilters, EventFilter, eventFilters } from './EventFilters';
import { pluginLoader, PluginLoader } from './PluginLoader';
import { PluginManager } from './PluginManager';
import { createPlugin, PluginWrapper } from './PluginWrapper';

class PluginManagerImpl implements PluginManager {

  private readonly plugins: Map<string, PluginWrapper> = new Map();

  private gameState: GameState = undefined as any;

  constructor(
    private readonly pluginLoader: PluginLoader,
    private readonly eventBus: EventBus,
    private readonly eventFilter: EventFilter,
  ) { }

  async loadPlugins(): Promise<void> {
    const pluginFactories = await this.pluginLoader.loadPlugins();
    for (let factory of pluginFactories) {
      const plugin = createPlugin(this, factory, this.eventFilter);
      if (!plugin) {
        continue;
      }
      if (this.plugins.has(plugin.getName())) {
        console.warn(`Plugin has name '${plugin.getName()}', but a plugin is already loaded with that name`);
        continue;
      }
      this.plugins.set(plugin.getName(), plugin);
      plugin.onLoad();
    }
  }

  getState(): GameState {
    return this.gameState;
  }

  publishEvent(event: IAttributedEvent): void {
    this.eventBus.receiveEvent(event);
  }

  handleEvent(event: IAttributedEvent): void {
    if (event.publishedBy === CORE_RENDERER_PUBLISHER && event.type === EventType.STATE_UPDATED) {
      const { state } = event as StateUpdatedEvent;
      this.gameState = state;
    }

    Array.from(this.plugins.entries())
      .filter(([name, p]) => PLUGIN_PUBLISHER + name !== event.publishedBy)
      .map(([name, p]) => p)
      .forEach((p) => p.handleEvent(event));
  }

  unloadPlugin(pluginName: string, unloadPlugin: UnloadPlugin): void {
    if (!this.plugins.has(pluginName)) {
      return;
    }
    const plugin = this.plugins.get(pluginName) as PluginWrapper;
    this.plugins.delete(pluginName);
    plugin.onUnload(unloadPlugin);
  }

  unloadAllPlugins(unloadPlugin: UnloadPlugin): void {
    Array.from(this.plugins.keys()).forEach((n) =>
      this.unloadPlugin(n, unloadPlugin)
    );
  }
}

export const pluginManager = (eventBus: EventBus): PluginManager => new PluginManagerImpl(
  pluginLoader(),
  eventBus,
  chainFilters(eventFilters()),
);
