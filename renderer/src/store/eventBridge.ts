import { Store } from 'redux';
import { GameState } from '@tictactoe/interfaces';
import { EventType, StateMutationEvent } from '@tictactoe/interfaces/events';
import {
  CORE_RENDERER_PUBLISHER,
  EventBus,
  EventSubscriber,
  IAttributedEvent,
  StateUpdatedEvent,
} from '@tictactoe/internal';

class StoreEventBridge implements EventSubscriber {

  constructor(private readonly store: Store<GameState>, private readonly eventBus: EventBus) { }

  initialise(): void {
    this.store.subscribe(() => this.receiveDispatch());
    this.receiveDispatch(); // To publish the initial state to other subscribers
  }

  private receiveDispatch(): void {
    const event: StateUpdatedEvent = {
      type: EventType.STATE_UPDATED,
      publishedBy: CORE_RENDERER_PUBLISHER,
      state: this.store.getState(),
    };
    this.eventBus.receiveEvent(event);
  }

  processEvent(event: IAttributedEvent): void {
    if (event.type !== EventType.STATE_MUTATION) {
      return;
    }
    const { mutation } = event as any as StateMutationEvent;

    this.store.dispatch(mutation);
  }
}

export const registerStoreEventBridge = (store: Store<GameState>, eventBus: EventBus) => {
  const eventBridge = new StoreEventBridge(store, eventBus);
  eventBridge.initialise();
  eventBus.registerSubscriber(eventBridge);
};
