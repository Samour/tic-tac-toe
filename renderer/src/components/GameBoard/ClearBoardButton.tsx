import React from 'react';
import { useDispatch } from 'react-redux';
import { boardClearAllCellsMutation } from '@tictactoe/interfaces/mutations';

const ClearBoardButton = (): React.ReactElement => {
  const dispatch = useDispatch();

  const clearBoard = () => dispatch(boardClearAllCellsMutation());

  return (
    <div className='clear-board-container'>
      <button onClick={clearBoard}>Reset Board</button>
    </div>
  );
};

export default ClearBoardButton;
