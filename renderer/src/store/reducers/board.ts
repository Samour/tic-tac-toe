import { BoardState, CellIndex, CellState, iterateIndices } from '@tictactoe/interfaces';
import { IMutation, MutationType, BoardChangeCellHeldByPlayerMutation } from '@tictactoe/interfaces/mutations';
import { updateMap } from './updateItemInList';

const initialState: BoardState = {
  cells: new Map(
    iterateIndices().map((i) => [
      i,
      new Map(
        iterateIndices().map((j) => [
          j,
          { heldByPlayerId: null },
        ]),
      ),
    ]),
  ),
};

const reducer = (state: BoardState | undefined, mutation: IMutation): BoardState => {
  state = state || initialState;

  if (mutation.type === MutationType.BOARD__CHANGE_CELL_HELD_BY_PLAYER) {
    const { row, column, heldByPlayerId } = mutation as BoardChangeCellHeldByPlayerMutation;

    const innerMapper = updateMap<CellIndex, CellState>(column, (c) => ({
      ...c,
      heldByPlayerId
    }));
    const outerMapper = updateMap<CellIndex, Map<CellIndex, CellState>>(row, innerMapper);

    return {
      ...state,
      cells: outerMapper(state.cells),
    };
  } else if (mutation.type === MutationType.BOARD__CLEAR_ALL_CELLS) {
    return {
      ...state,
      cells: initialState.cells,
    };
  } else {
    return state;
  }
};

export default reducer;
