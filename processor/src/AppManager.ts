import { EventBus } from '@tictactoe/internal';
import { PluginEventBridge } from './plugin/eventBridge';
import { PluginManager } from './plugin/PluginManager';
import { pluginManager } from './plugin/PluginManagerImpl';

interface AppManager {

  onAppReady(): void;

  connectEventBus(eventBus: EventBus): void;

  onAppClose(): void;
}

class AppManagerImpl implements AppManager {

  constructor(private readonly pluginManager: PluginManager) { }

  onAppReady(): void {
    this.pluginManager.loadPlugins();
  }

  connectEventBus(eventBus: EventBus): void {
    console.log('connectEventBus() called');
    const eventBridge = new PluginEventBridge(this.pluginManager);
    eventBus.registerSubscriber(eventBridge);
    console.log('connectEventBus() completed');
  }

  onAppClose(): void {
    this.pluginManager.unloadAllPlugins({ appShutDown: true });
  }
}

const createAppManager = (): AppManager => new AppManagerImpl(pluginManager());

export const registerApp = () => {
  (window as any).myGlobal = 'MyGlobal';
  console.log('createAppManager()');
  const appManager = createAppManager();

  window.addEventListener('DOMContentLoaded', () => {
    appManager.onAppReady();
  });

  window.addEventListener('App/EventBusCreated', (event) => {
    console.log(event);
    console.log((event as CustomEvent).detail);
    appManager.connectEventBus((event as CustomEvent).detail);
  });

  window.addEventListener('beforeunload', (e) => {
    appManager.onAppClose();
  });
};
