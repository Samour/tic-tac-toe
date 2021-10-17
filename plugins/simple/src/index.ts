import { Plugin, PluginAccess, PluginFactory, RootRenderableElement, UnloadPlugin } from '@tictactoe/interfaces';
import { EventType, IEvent, stateMutationEvent } from '@tictactoe/interfaces/events';
import { pluginComponentInsertMutation } from '@tictactoe/interfaces/mutations';

const PLUGIN_NAME: string = 'simplePlugin';

class SimplePlugin implements Plugin {

  constructor(private readonly pluginAccess: PluginAccess) {}
  
  onLoad(): void {
    console.log('Loaded test plugin - written with Typescript');
    console.log(this.pluginAccess.getState());

    const element: RootRenderableElement = {
      ownerPlugin: PLUGIN_NAME,
      key: 'hello-world',
      container: 'above-names',
      name: 'div',
      children: [
        {
          key: 'hello-world-text',
          name: 'strong',
          children: ['Hello World!']
        },
        ' Hopefully this displays properly',
      ],
    };
    const mutation = pluginComponentInsertMutation(element);
    const event = stateMutationEvent(mutation);
    this.pluginAccess.publishEvent(event);
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
  getPluginName: () => PLUGIN_NAME,
  create: (pluginAccess: PluginAccess) => new SimplePlugin(pluginAccess),
};

export { factory };
