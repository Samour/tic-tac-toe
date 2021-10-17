import { MutationType } from '../MutationType';
import { IMutation } from '../IMutation';

export interface PluginComponentRemoveMutation extends IMutation {
  type: MutationType.PLUGIN_COMPONENT__REMOVE;
  ownerPlugin: string;
  name: string;
}

export const pluginComponentRemoveMutation = (name: string, ownerPlugin: string): PluginComponentRemoveMutation => ({
  type: MutationType.PLUGIN_COMPONENT__REMOVE,
  name,
  ownerPlugin,
});
