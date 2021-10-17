import { IAttributedEvent, PLUGIN_PUBLISHER } from '@tictactoe/internal';
import { EventType, StateMutationEvent } from '@tictactoe/interfaces/events';
import { MutationType, PluginComponentInsertMutation, PluginComponentRemoveMutation } from '@tictactoe/interfaces/mutations';

export interface EventFilter {
  filter<T extends IAttributedEvent>(event: T): T;
}

abstract class ValidationEventFilter implements EventFilter {

  protected abstract isEventValid(event: IAttributedEvent): boolean;

  protected getErrorString(event: IAttributedEvent): string {
    return 'Event violates requirements for plugin';
  }

  filter<T extends IAttributedEvent>(event: T): T {
    if (!this.isEventValid(event)) {
      throw new Error(this.getErrorString(event));
    }

    return event;
  }
}

const ALLOWED_EVENTS = [
  EventType.STATE_MUTATION,
];

class EventTypeValidationFilter extends ValidationEventFilter {

  protected isEventValid(event: IAttributedEvent): boolean {
    return ALLOWED_EVENTS.includes(event.type);
  }
}

const ALLOWED_MUTATIONS = [
  MutationType.PLAYER__CHANGE_ACTIVE,
  MutationType.BOARD__CHANGE_CELL_HELD_BY_PLAYER,
  MutationType.BOARD__CLEAR_ALL_CELLS,
  MutationType.PLUGIN_COMPONENT__INSERT,
  MutationType.PLUGIN_COMPONENT__REMOVE,
];

class MutationTypeValidationFilter extends ValidationEventFilter {

  protected isEventValid(event: IAttributedEvent): boolean {
    if (event.type !== EventType.STATE_MUTATION) {
      return true;
    }
    const { mutation } = event as any as StateMutationEvent;

    return ALLOWED_MUTATIONS.includes(mutation.type);
  }
}

class InsertComponentMutationValidationFilter extends ValidationEventFilter {

  protected isEventValid(event: IAttributedEvent): boolean {
    if (event.type !== EventType.STATE_MUTATION) {
      return true;
    }
    const { mutation } = event as any as StateMutationEvent;
    if (mutation.type !== MutationType.PLUGIN_COMPONENT__INSERT) {
      return true;
    }

    const { element } = mutation as PluginComponentInsertMutation;
    return event.publishedBy === PLUGIN_PUBLISHER + element.ownerPlugin;
  }
}

class RemoveComponentMutationValidationFilter extends ValidationEventFilter {

  protected isEventValid(event: IAttributedEvent): boolean {
    if (event.type !== EventType.STATE_MUTATION) {
      return true;
    }
    const { mutation } = event as any as StateMutationEvent;
    if (mutation.type !== MutationType.PLUGIN_COMPONENT__REMOVE) {
      return true;
    }

    const { ownerPlugin } = mutation as PluginComponentRemoveMutation;
    return event.publishedBy === PLUGIN_PUBLISHER + ownerPlugin;
  }
}

export const eventFilters = (): EventFilter[] => [
  new EventTypeValidationFilter(),
  new MutationTypeValidationFilter(),
  new InsertComponentMutationValidationFilter(),
  new RemoveComponentMutationValidationFilter(),
];

class FilterChain implements EventFilter {

  constructor(private readonly chain: EventFilter[]) {}

  private invokeChain<T extends IAttributedEvent>(event: T, chain: EventFilter[]): T {
    if (!chain.length) {
      return event;
    }

    return this.invokeChain(chain[0].filter(event), chain.slice(1));
  }

  filter<T extends IAttributedEvent>(event: T): T {
    return this.invokeChain(event, this.chain);
  }
}

export const chainFilters = (filters: EventFilter[]): EventFilter => new FilterChain(filters);
