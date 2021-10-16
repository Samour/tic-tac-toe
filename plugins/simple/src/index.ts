import { Plugin, PluginAccess, PluginFactory, UnloadPlugin } from '@tictactoe/interfaces';
import { EventType, IEvent } from '@tictactoe/interfaces/events';

class SimplePlugin implements Plugin {

  constructor(private readonly pluginAccess: PluginAccess) {}
  
  onLoad(): void {
    console.log('Loaded test plugin - written with Typescript');
    console.log(this.pluginAccess.getState());
  }

  handleEvent(event: IEvent): void {
    console.log('Event received');
    console.log(event);

    if (event.type === EventType.STATE_UPDATED) {
      console.log('New state:');
      console.log(this.pluginAccess.getState());
    }
  }

  onUnload(unloadPlugin: UnloadPlugin): void {
    console.log('Unloaded test plugin');
  }
}

const factory: PluginFactory = {
  getPluginName: () => 'simplePlugin',
  create: (pluginAccess: PluginAccess) => new SimplePlugin(pluginAccess),
};

export { factory };
