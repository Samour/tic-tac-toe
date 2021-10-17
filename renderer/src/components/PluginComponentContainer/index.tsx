import React, { createElement } from 'react';
import { useSelector } from 'react-redux';
import { GameState, PluginContainerName, RenderableElement, RootRenderableElement } from '@tictactoe/interfaces';

export interface Props {
  name: PluginContainerName;
}

const selector = (containerName: string) => (state: GameState): RootRenderableElement[] =>
  state.pluginComponents.components.filter((c) => c.container === containerName);

const convertToElement = (element: RenderableElement | string, key?: string): React.ReactElement | string => {
  if (typeof element === 'string') {
    return element;
  }

  const props: any = {
    key: key ?? element.key,
  };
  if (element.className) {
    props.className = element.className;
  }
  const children = (element.children ?? []).map((c) => convertToElement(c));

  return createElement(element.name, props, ...children);
};

const PluginComponentContainer = ({ name }: Props): React.ReactElement => {
  const elements = useSelector(selector(name));

  const renderedElements = elements.map((e) => convertToElement(e, `${e.ownerPlugin}-${e.key}`));

  return (
    <div className='plugin-components-container'>{renderedElements}</div>
  );
};

export default PluginComponentContainer;
