import { GameState } from '@tictactoe/interfaces';
import { EventType } from '@tictactoe/interfaces/events';
import { IAttributedEvent } from './IAttributedEvent';

export interface StateUpdatedEvent extends IAttributedEvent {
  type: EventType.STATE_UPDATED;
  state: GameState;
}
