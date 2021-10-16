import { Store } from 'redux';
import { GameState } from '@tictactoe/interfaces';
import { EventBusImpl, RendererEventContextBridge } from '@tictactoe/internal';
import { registerStoreEventBridge } from './store/eventBridge';

export const initialiseEventBus = (store: Store<GameState>): void => {
  const eventBus = new EventBusImpl();
  const contextBridge = new RendererEventContextBridge();
  contextBridge.bindToEventBus(eventBus);

  registerStoreEventBridge(store, eventBus);
};
