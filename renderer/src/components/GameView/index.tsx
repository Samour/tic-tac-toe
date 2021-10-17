import React from 'react';
import GameBoard from '../GameBoard';
import PlayersIndicator from '../PlayersIndicator';
import PluginComponentContainer from '../PluginComponentContainer';

const GameView = (): React.ReactElement => (
  <>
    <PluginComponentContainer name='above-names' />
    <PlayersIndicator />
    <PluginComponentContainer name='below-names' />
    <GameBoard />
    <PluginComponentContainer name='below-board' />
  </>
);

export default GameView;
