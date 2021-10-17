export type PluginContainerName = 'above-names' | 'below-names' | 'below-board';

export interface RenderableElement {
  key: string;
  name: string;
  className?: string;
  callbacks?: Record<string, string>;
  children?: (RenderableElement | string)[];
}

export interface RootRenderableElement extends RenderableElement {
  ownerPlugin: string;
  container: PluginContainerName;
}
