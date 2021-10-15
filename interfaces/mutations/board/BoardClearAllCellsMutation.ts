import { MutationType } from "../MutationType";
import { IMutation } from "../IMutation";

export interface BoardClearAllCellsMutation extends IMutation {
  type: MutationType.BOARD__CLEAR_ALL_CELLS,
}

export const boardClearAllCellsMutation = (): BoardClearAllCellsMutation => ({
  type: MutationType.BOARD__CLEAR_ALL_CELLS,
});
