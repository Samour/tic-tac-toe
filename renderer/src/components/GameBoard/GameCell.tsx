import React, { useState } from 'react';
import { CellIndex } from '@tictactoe/interfaces';

export interface Props {
  row: CellIndex;
  column: CellIndex;
}

type CellValue = ' ' | 'X' | 'O';

const getNextValue = (currentValue: CellValue): CellValue => {
  switch (currentValue) {
    case ' ':
      return 'X';
    case 'X':
      return 'O';
    case 'O':
      return ' ';
  }
};

const GameCell = ({ row, column }: Props): React.ReactElement => {
  const [cellValue, setCellValue] = useState<CellValue>(' ');
  const toggle = () => setCellValue(getNextValue(cellValue));

  return (
    <div className='game-cell' onClick={toggle}>{cellValue}</div>
  );
};

export default GameCell;
