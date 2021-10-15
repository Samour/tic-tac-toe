import React from 'react';
import GameBoard from '../GameBoard';
import PlayersIndicator from '../PlayersIndicator';

const GameView = (): React.ReactElement => (
  <>
    <PlayersIndicator />
    <GameBoard />
  </>
);

export default GameView;
