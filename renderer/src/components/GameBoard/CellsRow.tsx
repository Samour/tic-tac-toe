import React from 'react';
import { CellIndex, iterateIndices } from '@tictactoe/interfaces';
import GameCell from './GameCell';

export interface Props {
  row: CellIndex;
}

const CellsRow = ({ row }: Props): React.ReactElement => (
  <div className='cells-row'>
    {iterateIndices().map((i) => (
      <GameCell key={i} row={row} column={i} />
    ))}
  </div>
);

export default CellsRow;
