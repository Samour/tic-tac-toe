import { MutationType } from '../MutationType';
import { IMutation } from '../IMutation';

export interface PluginComponentRemoveMutation extends IMutation {
  type: MutationType.PLUGIN_COMPONENT__REMOVE;
  ownerPlugin: string;
  key: string;
}

export const pluginComponentRemoveMutation = (key: string, ownerPlugin: string): PluginComponentRemoveMutation => ({
  type: MutationType.PLUGIN_COMPONENT__REMOVE,
  key,
  ownerPlugin,
});
