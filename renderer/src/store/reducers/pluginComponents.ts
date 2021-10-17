import { PluginComponentsState, RootRenderableElement } from '@tictactoe/interfaces';
import {
  IMutation,
  MutationType,
  PluginComponentInsertMutation,
  PluginComponentRemoveMutation,
} from '@tictactoe/interfaces/mutations';
import { updateItemInList } from './updateItemInList';

const initialState: PluginComponentsState = {
  components: [],
};

const reducer = (state: PluginComponentsState | undefined, mutation: IMutation): PluginComponentsState => {
  state = state || initialState;
  if (mutation.type === MutationType.PLUGIN_COMPONENT__INSERT) {
    const { element } = mutation as PluginComponentInsertMutation;
    const elementFilter = (e: RootRenderableElement): boolean =>
      e.ownerPlugin === element.ownerPlugin && e.key === element.key;
    if (!state.components.find(elementFilter)) {
      return {
        ...state,
        components: [
          ...state.components,
          element,
        ],
      };
    } else {
      const elementMapper = updateItemInList(elementFilter)((e) => element);
      return {
        ...state,
        components: elementMapper(state.components),
      };
    }
  } else if (mutation.type === MutationType.PLUGIN_COMPONENT__REMOVE) {
    const { ownerPlugin, key } = mutation as PluginComponentRemoveMutation;
    return {
      ...state,
      components: state.components.filter((e) => e.ownerPlugin !== ownerPlugin || e.key !== key),
    };
  } else {
    return state;
  }
};

export default reducer;
