import { EventSubscriber, IAttributedEvent } from '@tictactoe/internal';
import { PluginManager } from './PluginManager';

export class PluginEventBridge implements EventSubscriber {

  constructor(private readonly pluginManager: PluginManager) {}

  processEvent(event: IAttributedEvent): void {
    this.pluginManager.handleEvent(event);
  }
}
