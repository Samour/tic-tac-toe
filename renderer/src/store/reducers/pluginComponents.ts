import { PluginComponentsState } from '@tictactoe/interfaces';
import { IMutation, MutationType } from '@tictactoe/interfaces/mutations';

const initialState: PluginComponentsState = {
  components: [],
};

const reducer = (state: PluginComponentsState | undefined, mutation: IMutation): PluginComponentsState => {
  state = state || initialState;
  if (mutation.type === MutationType.PLUGIN_COMPONENT__INSERT) {
    
  }

  return state;
};

export default reducer;
