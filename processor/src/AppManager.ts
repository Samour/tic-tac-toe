import { createEventBus } from './eventBus';
import { PluginEventBridge } from './plugin/eventBridge';
import { PluginManager } from './plugin/PluginManager';
import { pluginManager as createPluginManager } from './plugin/PluginManagerImpl';

interface AppManager {

  onAppReady(): void;

  onAppClose(): void;
}

class AppManagerImpl implements AppManager {

  constructor(private readonly pluginManager: PluginManager) { }

  onAppReady(): void {
    this.pluginManager.loadPlugins();
  }

  onAppClose(): void {
    this.pluginManager.unloadAllPlugins({ appShutDown: true });
  }
}

export const registerApp = () => {
  const eventBus = createEventBus();
  const pluginManager = createPluginManager();
  const pluginEventBridge = new PluginEventBridge(pluginManager);
  eventBus.registerSubscriber(pluginEventBridge);
  
  const appManager = new AppManagerImpl(pluginManager);

  window.addEventListener('DOMContentLoaded', () => {
    appManager.onAppReady();
  });

  window.addEventListener('beforeunload', (e) => {
    appManager.onAppClose();
  });
};
