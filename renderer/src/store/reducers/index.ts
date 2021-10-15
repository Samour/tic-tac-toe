import { combineReducers } from 'redux';
import { GameState } from '@tictactoe/interfaces';
import players from './players';
import board from './board';

const reducer = combineReducers<GameState>({
  players,
  board,
});

export default reducer;
