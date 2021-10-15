import { BoardState } from './BoardState';
import { PlayersState } from './PlayersState';

export interface GameState {
  players: PlayersState;
  board: BoardState;
}
