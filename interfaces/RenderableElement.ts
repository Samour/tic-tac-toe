export type PluginContainerName = 'above-names' | 'below-names' | 'below-board';

export interface RenderableElement {
  ownerPlugin: string;
  container: string;
  name: string;
  className?: string;
  callbacks?: Record<string, string>;
  children?: RenderableElement[];
}
