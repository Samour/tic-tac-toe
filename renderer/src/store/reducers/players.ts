import { PlayersState, Player } from '@tictactoe/interfaces';
import { IMutation, MutationType, PlayerChangeActiveMutation } from '@tictactoe/interfaces/mutations';

const createEntry = (player: Player): [string, Player] => [player.playerId, player];

const initialState: PlayersState = {
  players: new Map([
    createEntry({
      playerId: 'player1',
      name: 'Player 1',
      symbol: 'X',
      active: true,
    }),
    createEntry({
      playerId: 'player2',
      name: 'Player 2',
      symbol: 'O',
      active: false,
    }),
  ]),
};

const reducer = (state: PlayersState | undefined, mutation: IMutation): PlayersState => {
  state = state || initialState;

  if (mutation.type === MutationType.PLAYER__CHANGE_ACTIVE) {
    const { activePlayerId } = mutation as PlayerChangeActiveMutation;
    if (!state.players.has(activePlayerId)) {
      // invalid player id; ignore
      return state;
    }
    return {
      ...state,
      players: new Map(
        Array.from(state.players.values())
          .map((p) => ({
            ...p,
            active: p.playerId === activePlayerId,
          })).map(createEntry),
      ),
    };
  } else {
    return state;
  }
};

export default reducer;
