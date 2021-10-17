import { combineReducers } from 'redux';
import { GameState } from '@tictactoe/interfaces';
import players from './players';
import board from './board';
import pluginComponents from './pluginComponents';

const reducer = combineReducers<GameState>({
  players,
  board,
  pluginComponents,
});

export default reducer;
