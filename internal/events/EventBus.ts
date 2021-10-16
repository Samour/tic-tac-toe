import { IAttributedEvent } from './IAttributedEvent';

export interface EventSubscriber {
  processEvent(event: IAttributedEvent): void;
}

export interface EventBus {

  registerSubscriber(subscriber: EventSubscriber): void;

  unregisterSubscriber(subscriber: EventSubscriber): void;

  receiveEvent(event: IAttributedEvent): void;
}
