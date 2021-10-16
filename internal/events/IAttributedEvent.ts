import { IEvent } from '@tictactoe/interfaces/events';

export const CORE_RENDERER_PUBLISHER: string = 'Core/renderer';
export const CORE_PROCESSOR_PUBLISHER: string = 'Core/processor';
export const PLUGIN_PUBLISHER: string = 'Plugin/';

export interface IAttributedEvent extends IEvent {
  publishedBy: string;
}
