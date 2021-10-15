import React from 'react';
import { CellIndex } from '@tictactoe/interfaces';

export interface Props {
  row: CellIndex;
  column: CellIndex;
}

const GameCell = ({ row, column }: Props): React.ReactElement => {
  return (
    <div className='game-cell' onClick={() => { }}></div>
  );
};

export default GameCell;
