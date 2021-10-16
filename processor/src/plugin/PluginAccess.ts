import { GameState, PluginAccess } from '@tictactoe/interfaces';
import { IEvent } from '@tictactoe/interfaces/events';
import { PLUGIN_PUBLISHER } from '@tictactoe/internal';
import { PluginManager } from './PluginManager';

export class PluginAccessImpl implements PluginAccess {

  constructor(private readonly pluginName: string, private readonly manager: PluginManager) { }

  getState(): GameState {
    return this.manager.getState();
  }

  publishEvent(event: IEvent) {
    this.manager.publishEvent({
      ...event,
      publishedBy: PLUGIN_PUBLISHER + this.pluginName,
    });
  }

  unloadPlugin(): void {
    this.manager.unloadPlugin(this.pluginName, { appShutDown: false });
  }
}
