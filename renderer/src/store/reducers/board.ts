import { BoardState, iterateIndices } from '@tictactoe/interfaces';
import { IMutation } from '@tictactoe/interfaces/mutations';

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
  return state || initialState;
};

export default reducer;
