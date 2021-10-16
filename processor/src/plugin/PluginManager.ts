import { GameState, UnloadPlugin } from '@tictactoe/interfaces';
import { IAttributedEvent } from '@tictactoe/internal';

export interface PluginManager {
  
  loadPlugins(): Promise<void>;

  getState(): GameState;

  publishEvent(event: IAttributedEvent): void;

  handleEvent(event: IAttributedEvent): void;

  unloadPlugin(pluginName: string, unloadPlugin: UnloadPlugin): void;

  unloadAllPlugins(unloadPlugin: UnloadPlugin): void;
}
