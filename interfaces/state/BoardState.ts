import { CellIndex } from '../Cell';

export interface CellState {
  heldByPlayerId: string | null;
}

export interface BoardState {
  cells: Map<CellIndex, Map<CellIndex, CellState>>;
}
