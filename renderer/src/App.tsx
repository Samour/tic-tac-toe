import React from 'react';
import { Provider } from 'react-redux';
import GameView from './components/GameView';
import store from './store';
import { initialiseEventBus } from './eventBus';

const App = (): React.ReactElement => (
  <Provider store={store}>
    <div>
      <GameView />
    </div>
  </Provider>
);

initialiseEventBus(store);

export default App;
