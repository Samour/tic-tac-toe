import { PluginManager } from './plugin/PluginManager';
import { pluginManager } from './plugin/PluginManagerImpl';

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

const createAppManager = (): AppManager => new AppManagerImpl(pluginManager());

export const registerApp = () => {
  const appManager = createAppManager();

  window.addEventListener('DOMContentLoaded', () => {
    appManager.onAppReady();
  });

  window.addEventListener('beforeunload', (e) => {
    appManager.onAppClose();
  });
};
