import { GameState, UnloadPlugin } from '@tictactoe/interfaces';
import { IEvent } from '@tictactoe/interfaces/events';
import { pluginLoader, PluginLoader } from './PluginLoader';
import { PluginManager } from './PluginManager';
import { createPlugin, PluginWrapper } from './PluginWrapper';

class PluginManagerImpl implements PluginManager {

  private readonly plugins: Map<string, PluginWrapper> = new Map();

  constructor(private readonly pluginLoader: PluginLoader) { }

  async loadPlugins(): Promise<void> {
    const pluginFactories = await this.pluginLoader.loadPlugins();
    for (let factory of pluginFactories) {
      const plugin = createPlugin(this, factory);
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
    return null;
  }

  publishEvent(event: IEvent): void {

  }

  unloadPlugin(pluginName: string, unloadPlugin: UnloadPlugin): void {
    if (!this.plugins.has(pluginName)) {
      return;
    }
    const plugin = this.plugins.get(pluginName);
    this.plugins.delete(pluginName);
    plugin.onUnload(unloadPlugin);
  }

  unloadAllPlugins(unloadPlugin: UnloadPlugin): void {
    Array.from(this.plugins.keys()).forEach((n) =>
      this.unloadPlugin(n, unloadPlugin)
    );
  }
}

export const pluginManager = (): PluginManager => new PluginManagerImpl(pluginLoader());
