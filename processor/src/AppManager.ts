import { EventBus, SendEvent } from '@tictactoe/internal';
import { EventBusImpl, ProcessorEventContextBridge } from '@tictactoe/internal';
import EventEmitter from 'events';
import { PluginEventBridge } from './plugin/eventBridge';
import { PluginManager } from './plugin/PluginManager';
import { pluginManager as createPluginManager } from './plugin/PluginManagerImpl';

interface AppManager {

  onAppReady(): void;

  onAppUnload(): void;

  onAppClose(): void;
}

class AppManagerImpl implements AppManager {

  constructor(
    private readonly pluginManager: PluginManager,
    private readonly eventBus: EventBus,
    private readonly eventContextBridge: ProcessorEventContextBridge,
    private readonly pluginEventBridge: PluginEventBridge,
  ) { }

  onAppReady(): void {
    this.pluginManager.loadPlugins();
  }

  onAppUnload(): void {
    this.pluginManager.unloadAllPlugins({ appShutDown: true });
  }

  onAppClose(): void {
    this.onAppUnload();
    this.eventContextBridge.closeBridge();
    this.eventBus.unregisterSubscriber(this.pluginEventBridge);
  }
}

export const registerApp = (emitter: EventEmitter, send: SendEvent): () => void => {
  const eventBus = new EventBusImpl();
  const contextBridge = new ProcessorEventContextBridge(emitter, send);
  contextBridge.bindToEventBus(eventBus);

  const pluginManager = createPluginManager(eventBus);
  const pluginEventBridge = new PluginEventBridge(pluginManager);
  eventBus.registerSubscriber(pluginEventBridge);

  const appManager = new AppManagerImpl(pluginManager, eventBus, contextBridge, pluginEventBridge);

  const appReadyListener = () => appManager.onAppReady();
  const appCloseListener = () => appManager.onAppUnload();
  // TODO I think we have a multiplex issue here
  // If there are multiple BrowserWindows open, then there will be 1 AppManager
  // per BrowserWindow. But the events that are published by a single BrowserWindow
  // will be processed by every AppManager
  // Investigate & find potential solution.
  emitter.on('App/Ready', appReadyListener);
  emitter.on('App/Close', appCloseListener);

  return () => {
    emitter.removeListener('App/Ready', appReadyListener);
    emitter.removeListener('App/Close', appCloseListener);
    appManager.onAppClose();
  };
};
