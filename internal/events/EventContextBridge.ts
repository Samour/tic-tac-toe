import { IAttributedEvent, CORE_RENDERER_PUBLISHER } from './IAttributedEvent';
import { EventBus, EventSubscriber } from './EventBus';
import EventEmitter from 'events';

const WINDOW_EVENT_FROM_RENDERER = 'Renderer/TransmitEvent';
const WINDOW_EVENT_FROM_PROCESSOR = 'Processor/TransmitEvent';

export interface SendEvent {
  send(channel: string, ...args: any[]): void;
}

abstract class EventContextBridge implements EventSubscriber {

  private cleanup?: () => void;

  constructor(
    private readonly publishEventType: string,
    private readonly subscribeEventType: string,
    private readonly emitter: EventEmitter,
    private readonly sendEvent: SendEvent,
  ) { }

  protected abstract mayPublishEventFromSource(publishedBy: string): boolean;

  protected publisherIsRenderer(publishedBy: string): boolean {
    return publishedBy === CORE_RENDERER_PUBLISHER;
  }

  bindToEventBus(eventBus: EventBus): void {
    const handler = (e: any, arg: any) => eventBus.receiveEvent(arg);
    this.emitter.on(this.subscribeEventType, handler);
    eventBus.registerSubscriber(this);

    this.cleanup = () => {
      this.emitter.removeListener(this.subscribeEventType, handler);
      eventBus.unregisterSubscriber(this);
    };
  }

  processEvent(event: IAttributedEvent): void {
    if (this.mayPublishEventFromSource(event.publishedBy)) {
      this.sendEvent.send(this.publishEventType, event);
    }
  }

  closeBridge(): void {
    this.cleanup?.();
    this.cleanup = undefined;
  }
}

export class RendererEventContextBridge extends EventContextBridge {

  constructor(emitter: EventEmitter, send: SendEvent) {
    super(WINDOW_EVENT_FROM_RENDERER, WINDOW_EVENT_FROM_PROCESSOR, emitter, send);
  }

  protected mayPublishEventFromSource(publishedBy: string): boolean {
    return this.publisherIsRenderer(publishedBy);
  }
}

export class ProcessorEventContextBridge extends EventContextBridge {

  constructor(emitter: EventEmitter, send: SendEvent) {
    super(WINDOW_EVENT_FROM_PROCESSOR, WINDOW_EVENT_FROM_RENDERER, emitter, send);
  }

  protected mayPublishEventFromSource(publishedBy: string): boolean {
    return !this.publisherIsRenderer(publishedBy);
  }
}
