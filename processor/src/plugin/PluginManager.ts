import { GameState, UnloadPlugin } from '@tictactoe/interfaces';
import { IEvent } from '@tictactoe/interfaces/events';

export interface PluginManager {
  
  loadPlugins(): Promise<void>;

  getState(): GameState;

  // TODO this will probably need to be a different inteface to include additional data, eg. plugin that published
  // event
  publishEvent(event: IEvent): void;

  unloadPlugin(pluginName: string, unloadPlugin: UnloadPlugin): void;

  unloadAllPlugins(unloadPlugin: UnloadPlugin): void;
}
