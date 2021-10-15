import { BoardState, iterateIndices } from '@tictactoe/interfaces';
import { IMutation, MutationType, BoardChangeCellHeldByPlayerMutation } from '@tictactoe/interfaces/mutations';

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
    return {
      ...state,
      cells: new Map(
        Array.from(state.cells.entries())
          .map(([i, rowState]) => [
            i,
            new Map(
              Array.from(rowState.entries())
                .map(([j, cell]) => [
                  j,
                  i == row && j == column ? {
                    ...cell,
                    heldByPlayerId,
                  } : cell,
                ]),
            ),
          ]),
      ),
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
