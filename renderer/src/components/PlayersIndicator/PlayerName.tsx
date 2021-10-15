import React from 'react';

export interface Props {
  playerId: string;
}

const PlayerName = ({ playerId }: Props): React.ReactElement => {
  const classes = ['player'];
  if (playerId === 'player1') {
    classes.push('active-player');
  }

  const className = classes.join(' ');
  return (
    <div className={className}>
      <h1>
        {playerId}
      </h1>
    </div>
  );
};

export default PlayerName;
