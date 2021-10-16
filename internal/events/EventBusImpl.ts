import { IAttributedEvent } from './IAttributedEvent';
import { EventSubscriber, EventBus } from './EventBus';

export class EventBusImpl implements EventBus {

  private subscribers: EventSubscriber[] = [];

  registerSubscriber(subscriber: EventSubscriber): void {
    this.subscribers.push(subscriber);
  }

  unregisterSubscriber(subscriber: EventSubscriber): void {
    this.subscribers = this.subscribers
      .filter((s) => s !== subscriber);
  }

  receiveEvent(event: IAttributedEvent): void {
    for (let subscriber of this.subscribers) {
      try {
        subscriber.processEvent(event);
      } catch (e) {
        console.error('Exception occurred in event subscriber', e);
      }
    }
  }
}
