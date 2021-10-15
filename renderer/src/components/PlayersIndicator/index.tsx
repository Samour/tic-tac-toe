import React from 'react';
import PlayerName from './PlayerName';

const PlayersIndicator = (): React.ReactElement => (
  <div className='players-container'>
    <PlayerName playerId='player1'/>
    <div className='player-buffer'>&nbsp;</div>
    <PlayerName playerId='player2'/>
  </div>
);

export default PlayersIndicator;
