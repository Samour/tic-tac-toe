import { IAttributedEvent, CORE_RENDERER_PUBLISHER } from './IAttributedEvent';
import { EventBus, EventSubscriber } from './EventBus';

const WINDOW_EVENT_FROM_RENDERER = 'Renderer/TransmitEvent';
const WINDOW_EVENT_FROM_PROCESSOR = 'Processor/TransmitEvent';

abstract class EventContextBridge implements EventSubscriber {

  constructor(private readonly publishEventType: string, private readonly subscribeEventType: string) { }

  protected abstract mayPublishEventFromSource(publishedBy: string): boolean;

  protected publisherIsRenderer(publishedBy: string): boolean {
    return publishedBy === CORE_RENDERER_PUBLISHER;
  }

  bindToEventBus(eventBus: EventBus): void {
    window.addEventListener(this.subscribeEventType, (e) => {
      eventBus.receiveEvent((e as CustomEvent<IAttributedEvent>).detail);
    });
    eventBus.registerSubscriber(this);
  }

  processEvent(event: IAttributedEvent): void {
    if (this.mayPublishEventFromSource(event.publishedBy)) {
      window.dispatchEvent(new CustomEvent(this.publishEventType, { detail: event }));
    }
  }
}

export class RendererEventContextBridge extends EventContextBridge {

  constructor() {
    super(WINDOW_EVENT_FROM_RENDERER, WINDOW_EVENT_FROM_PROCESSOR);
  }

  protected mayPublishEventFromSource(publishedBy: string): boolean {
    return this.publisherIsRenderer(publishedBy);
  }
}

export class ProcessorEventContextBridge extends EventContextBridge {

  constructor() {
    super(WINDOW_EVENT_FROM_PROCESSOR, WINDOW_EVENT_FROM_RENDERER);
  }

  protected mayPublishEventFromSource(publishedBy: string): boolean {
    return !this.publisherIsRenderer(publishedBy);
  }
}
