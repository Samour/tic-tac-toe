export interface Player {
  playerId: string;
  name: string;
  symbol: string;
  active: boolean;
}

export interface PlayersState {
  players: Map<string, Player>;
}
