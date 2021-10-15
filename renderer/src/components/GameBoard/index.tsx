import { iterateIndices } from '@tictactoe/interfaces';
import React from 'react';
import CellsRow from './CellsRow';
import ClearBoardButton from './ClearBoardButton';

const GameBoard = (): React.ReactElement => (
  <div>
    <div className='game-board-container'>
      <div className='game-board'>
        {iterateIndices().map((i) => (
          <CellsRow key={i} row={i} />
        ))}
      </div>
    </div>
    <ClearBoardButton />
  </div>
);

export default GameBoard;
