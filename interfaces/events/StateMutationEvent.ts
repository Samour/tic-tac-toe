import { EventType } from './EventType';
import { IMutation } from '../mutations/IMutation';
import { IEvent } from './IEvent';

export interface StateMutationEvent extends IEvent {
  type: EventType.STATE_MUTATION;
  mutation: IMutation;
}

export const stateMutationEvent = (mutation: IMutation): StateMutationEvent => ({
  type: EventType.STATE_MUTATION,
  mutation,
});
