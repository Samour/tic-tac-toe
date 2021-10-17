import { MutationType } from '../MutationType';
import { RenderableElement } from '../../RenderableElement';
import { IMutation } from '../IMutation';

export interface PluginComponentInsertMutation extends IMutation {
  type: MutationType.PLUGIN_COMPONENT__INSERT;
  element: RenderableElement;
}

export const pluginComponentInsertMutation = (element: RenderableElement): PluginComponentInsertMutation => ({
  type: MutationType.PLUGIN_COMPONENT__INSERT,
  element,
});
