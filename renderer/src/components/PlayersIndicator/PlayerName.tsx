import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GameState, Player } from '@tictactoe/interfaces';
import { playerChangeActiveMutation } from '@tictactoe/interfaces/mutations';

export interface Props {
  playerId: string;
}

const selector = (playerId: string) => (state: GameState): Player => state.players.players.get(playerId) as Player;

const PlayerName = ({ playerId }: Props): React.ReactElement => {
  const player = useSelector(selector(playerId));
  const dispatch = useDispatch();

  const makeActive = () => dispatch(playerChangeActiveMutation(playerId));

  const classes = ['player'];
  if (player.active) {
    classes.push('active-player');
  }

  const className = classes.join(' ');
  return (
    <div className={className} onClick={makeActive}>
      <h1>
        {player.name}
      </h1>
    </div>
  );
};

export default PlayerName;
