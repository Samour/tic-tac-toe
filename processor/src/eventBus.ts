import { EventBus, EventBusImpl, ProcessorEventContextBridge } from '@tictactoe/internal';

export const createEventBus = (): EventBus => {
  const eventBus = new EventBusImpl();
  const contextBridge = new ProcessorEventContextBridge();
  contextBridge.bindToEventBus(eventBus);

  return eventBus;
};
