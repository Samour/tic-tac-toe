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
import { MutationType } from '@tictactoe/interfaces/mutations';

const ALLOWED_MUTATIONS = [
  MutationType.PLAYER__CHANGE_ACTIVE,
  MutationType.BOARD__CHANGE_CELL_HELD_BY_PLAYER,
  MutationType.BOARD__CLEAR_ALL_CELLS,
];

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
    if (!ALLOWED_MUTATIONS.includes(mutation.type)) {
      return;
    }

    this.store.dispatch(mutation);
  }
}

export const registerStoreEventBridge = (store: Store<GameState>, eventBus: EventBus) => {
  const eventBridge = new StoreEventBridge(store, eventBus);
  eventBridge.initialise();
  eventBus.registerSubscriber(eventBridge);
};
