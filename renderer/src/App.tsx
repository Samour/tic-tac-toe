import React from 'react';
import { Provider } from 'react-redux';
import GameView from './components/GameView';
import store from './store';
import { initialiseEventBus } from './eventBus';

const { ipcRenderer } = require('electron');

const App = (): React.ReactElement => (
  <Provider store={store}>
    <div>
      <GameView />
    </div>
  </Provider>
);

initialiseEventBus(store);

ipcRenderer.send('App/Ready');
window.addEventListener('beforeunload', () => {
  ipcRenderer.send('App/Close');
});

export default App;
