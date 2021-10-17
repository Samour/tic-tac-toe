import React, { createElement } from 'react';
import { useSelector } from 'react-redux';
import { GameState, PluginContainerName, RenderableElement } from '@tictactoe/interfaces';

export interface Props {
  name: PluginContainerName;
}

const selector = (containerName: string) => (state: GameState): RenderableElement[] =>
  state.pluginComponents.components.filter((c) => c.container === containerName);

const convertToElement = (element: RenderableElement | string): React.ReactElement | string => {
  if (typeof element === 'string') {
    return element;
  }

  const props: any = {
    key: `${element.ownerPlugin}-${element.name}`,
  };
  if (element.className) {
    props.className = element.className;
  }
  const children = (element.children ?? []).map((c) => convertToElement(c));

  return createElement(element.name, props, ...children);
};

const PluginComponentContainer = ({ name }: Props): React.ReactElement => {
  const elements = useSelector(selector(name));

  return (
    <div className='plugin-components-container'>{elements}</div>
  );
};

export default PluginComponentContainer;
