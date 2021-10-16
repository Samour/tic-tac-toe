import { Store } from 'redux';
import { GameState } from '@tictactoe/interfaces';
import { EventType } from '@tictactoe/interfaces/events';
import { CORE_RENDERER_PUBLISHER, EventBus, EventSubscriber, IAttributedEvent } from '@tictactoe/internal';

class StoreEventBridge implements EventSubscriber {

  constructor(private readonly store: Store<GameState>, private readonly eventBus: EventBus) { }

  initialise(): void {
    this.store.subscribe(() => this.receiveDispatch());
  }

  private receiveDispatch(): void {
    this.eventBus.receiveEvent({
      type: EventType.STATE_UPDATED,
      publishedBy: CORE_RENDERER_PUBLISHER,
    });
  }

  processEvent(event: IAttributedEvent): void {

  }
}

export const registerStoreEventBridge = (store: Store<GameState>, eventBus: EventBus) => {
  const eventBridge = new StoreEventBridge(store, eventBus);
  eventBridge.initialise();
  eventBus.registerSubscriber(eventBridge);
};
