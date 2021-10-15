import { iterateIndices } from '@tictactoe/interfaces';
import React from 'react';
import CellsRow from './CellsRow';

const GameBoard = (): React.ReactElement => (
  <div className='game-board-container'>
    <div className='game-board'>
      {iterateIndices().map((i) => (
        <CellsRow key={i} row={i} />
      ))}
    </div>
  </div>
);

export default GameBoard;
