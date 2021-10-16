const { ipcRenderer } = require('electron');

interface AppManager {
  onAppReady(): void;

  onAppClose(): void;
}

class AppManagerImpl implements AppManager {

  onAppReady(): void {
    console.log('Hello Manager!');
    ipcRenderer.send('debugMessage', 'Hello Manager!');
  }

  onAppClose(): void {
    ipcRenderer.send('debugMessage', 'Goodbye Manager!');
  }
}

export const registerApp = () => {
  console.log('registerApp');
  console.log(window);
  const appManager: AppManager = new AppManagerImpl();

  window.addEventListener('DOMContentLoaded', () => {
    appManager.onAppReady();
  });

  window.addEventListener('beforeunload', (e) => {
    appManager.onAppClose();
  });
};
