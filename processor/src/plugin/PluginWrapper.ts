import { Plugin, PluginFactory, UnloadPlugin } from '@tictactoe/interfaces';
import { IEvent } from '@tictactoe/interfaces/events';
import { EventFilter } from './EventFilters';
import { PluginAccessImpl } from './PluginAccess';
import { PluginManager } from './PluginManager';

export interface PluginWrapper {

  getName(): string;

  onLoad(): void;

  handleEvent(event: IEvent): void;

  onUnload(unload: UnloadPlugin): void;
}

class PluginWrapperImpl implements PluginWrapper {

  constructor(private readonly name: string, private readonly plugin: Plugin) { }

  private invokeWithCatch(action: () => void): void {
    try {
      action();
    } catch (e) {
      console.error(`Exception caught in plugin ${this.name}`, e);
    }
  }

  getName(): string {
    return this.name;
  }

  onLoad(): void {
    this.invokeWithCatch(() => this.plugin.onLoad?.());
  }

  handleEvent(event: IEvent): void {
    this.invokeWithCatch(() => this.plugin.handleEvent?.(event));
  }

  onUnload(unload: UnloadPlugin): void {
    this.invokeWithCatch(() => this.plugin.onUnload?.(unload));
  }
}

export const createPlugin = (
  manager: PluginManager,
  factory: PluginFactory,
  eventFilter: EventFilter,
): PluginWrapper | null => {
  let name: string;
  try {
    name = factory.getPluginName();
    if (!name) {
      throw new Error('Name not provided by plugin');
    }
  } catch (e) {
    console.error('Exception occurred while attempting to determine plugin name', e);
    return null;
  }

  try {
    const pluginAccess = new PluginAccessImpl(name, manager, eventFilter);
    const plugin = factory.create(pluginAccess);

    return new PluginWrapperImpl(name, plugin);
  } catch (e) {
    console.error(`Exception occurred while creating plugin ${name}`, e);
    return null;
  }
};
