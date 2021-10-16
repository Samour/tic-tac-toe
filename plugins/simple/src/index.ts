import { Plugin, PluginAccess, PluginFactory, UnloadPlugin } from '@tictactoe/interfaces';
import { IEvent } from '@tictactoe/interfaces/events';

class SimplePlugin implements Plugin {
  
  onLoad(): void {
    console.log('Loaded test plugin - written with Typescript');
  }

  handleEvent(event: IEvent): void {
    console.log('Event received');
    console.log(event);
  }

  onUnload(unloadPlugin: UnloadPlugin): void {
    console.log('Unloaded test plugin');
  }
}

const factory: PluginFactory = {
  getPluginName: () => 'simplePlugin',
  create: (pluginAccess: PluginAccess) => new SimplePlugin(),
};

export { factory };
