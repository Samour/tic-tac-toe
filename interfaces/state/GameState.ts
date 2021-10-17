import { BoardState } from './BoardState';
import { PlayersState } from './PlayersState';
import { PluginComponentsState } from './PluginComponentsState';

export interface GameState {
  players: PlayersState;
  board: BoardState;
  pluginComponents: PluginComponentsState;
}
