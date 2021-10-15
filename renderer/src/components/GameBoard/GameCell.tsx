import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CellIndex, CellState, GameState } from '@tictactoe/interfaces';
import { boardChangeCellHeldByPlayerMutation } from '@tictactoe/interfaces/mutations';

export interface Props {
  row: CellIndex;
  column: CellIndex;
}

interface State {
  occupied: boolean;
  symbol: string;
  activePlayerId: string;
}

const selector = (row: CellIndex, column: CellIndex) => (state: GameState): State => {
  const activePlayerId = Array.from(state.players.players.values())
    .find((p) => p.active)
    ?.playerId as string;
  const cell = state.board.cells.get(row)?.get(column) as CellState;

  if (!cell.heldByPlayerId) {
    return {
      occupied: false,
      symbol: ' ',
      activePlayerId,
    };
  } else {
    return {
      occupied: true,
      symbol: state.players.players.get(cell.heldByPlayerId)?.symbol as string,
      activePlayerId,
    };
  }
};

const GameCell = ({ row, column }: Props): React.ReactElement => {
  const cell = useSelector(selector(row, column));
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!cell.occupied) {
      dispatch(boardChangeCellHeldByPlayerMutation(row, column, cell.activePlayerId));
    }
  };

  return (
    <div className='game-cell' onClick={handleClick}>{cell.symbol}</div>
  );
};

export default GameCell;
