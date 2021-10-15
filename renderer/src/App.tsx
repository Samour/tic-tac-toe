import React from 'react';
import { Provider } from 'react-redux';
import GameView from './components/GameView';
import store from './store';

const App = (): React.ReactElement => (
  <Provider store={store}>
    <div>
      <GameView />
    </div>
  </Provider>
);

export default App;
