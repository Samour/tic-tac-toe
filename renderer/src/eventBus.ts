import { Store } from 'redux';
import { GameState } from '@tictactoe/interfaces';
import { EventBusImpl, RendererEventContextBridge } from '@tictactoe/internal';
import { registerStoreEventBridge } from './store/eventBridge';

const { ipcRenderer } = require('electron');

export const initialiseEventBus = (store: Store<GameState>): void => {
  const eventBus = new EventBusImpl();
  const contextBridge = new RendererEventContextBridge(ipcRenderer, ipcRenderer);
  contextBridge.bindToEventBus(eventBus);

  registerStoreEventBridge(store, eventBus);
};
