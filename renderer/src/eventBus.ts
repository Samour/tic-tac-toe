import { Store } from 'redux';
import { GameState } from '@tictactoe/interfaces';
import { EventBus, EventBusImpl } from '@tictactoe/internal';
import { registerStoreEventBridge } from './store/eventBridge';

export const initialiseEventBus = (store: Store<GameState>): void => {
  console.log('Reading myglobal');
  console.log((window as any).myGlobal);
  const eventBus: EventBus = new EventBusImpl();

  registerStoreEventBridge(store, eventBus);

  window.addEventListener('App/EventBusCreated', (e) => {
    console.log('From same location');
    console.log(e);
    console.log((e as CustomEvent).detail.registerSubscriber);
  });

  window.dispatchEvent(new CustomEvent('App/EventBusCreated', {
    detail: eventBus
  }));
};
