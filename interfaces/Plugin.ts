import { GameState } from './state/GameState';
import { IEvent } from './events';

export interface UnloadPlugin {
  appShutDown: boolean;
}

export interface PluginAccess {

  getState(): GameState;

  publishEvent(event: IEvent): void;

  unloadPlugin(): void;
}

export interface Plugin {

  onLoad?(): void;

  handleEvent?(event: IEvent): void;

  onUnload?(unload: UnloadPlugin): void;
}

export interface PluginFactory {

  getPluginName(): string;

  create(pluginAccess: PluginAccess): Plugin;
}
