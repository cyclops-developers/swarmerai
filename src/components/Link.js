import React from 'react';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import { Text } from './Text';

export const Link = ({ children, ...props }) => (
  <ReactRouterDomLink {...props}>
    <Text>{children}</Text>
  </ReactRouterDomLink>
);

export const BlueLink = ({ children, ...props }) => (
  <ReactRouterDomLink {...props}>
    <Text color="text.blue">{children}</Text>
  </ReactRouterDomLink>
);
