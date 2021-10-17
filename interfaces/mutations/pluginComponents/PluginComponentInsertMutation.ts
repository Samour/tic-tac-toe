import { RootRenderableElement } from '../../RenderableElement';
import { MutationType } from '../MutationType';
import { IMutation } from '../IMutation';

export interface PluginComponentInsertMutation extends IMutation {
  type: MutationType.PLUGIN_COMPONENT__INSERT;
  element: RootRenderableElement;
}

export const pluginComponentInsertMutation = (element: RootRenderableElement): PluginComponentInsertMutation => ({
  type: MutationType.PLUGIN_COMPONENT__INSERT,
  element,
});
