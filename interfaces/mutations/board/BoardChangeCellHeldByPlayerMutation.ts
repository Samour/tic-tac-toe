import { MutationType } from '../MutationType';
import { IMutation } from '../IMutation';
import { CellIndex } from '../../Cell';

export interface BoardChangeCellHeldByPlayerMutation extends IMutation {
  type: MutationType.BOARD__CHANGE_CELL_HELD_BY_PLAYER,
  row: CellIndex,
  column: CellIndex,
  heldByPlayerId: string | null;
}

export const boardChangeCellHeldByPlayerMutation = (
  row: CellIndex,
  column: CellIndex,
  heldByPlayerId: string | null
): BoardChangeCellHeldByPlayerMutation => ({
  type: MutationType.BOARD__CHANGE_CELL_HELD_BY_PLAYER,
  row,
  column,
  heldByPlayerId,
});
