import React from 'react';
import PlayerName from './PlayerName';

const PlayersIndicator = (): React.ReactElement => (
  <div className='players-container'>
    <PlayerName playerId='player1' leading={true}/>
    <div className='player-buffer'>&nbsp;</div>
    <PlayerName playerId='player2' leading={false}/>
  </div>
);

export default PlayersIndicator;
