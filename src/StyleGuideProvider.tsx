import React, { FC } from 'react';

import { StylesProvider } from './context';
import { useCreateStylesGuide } from '.';

interface Props {
  [key: string]: any;
  config: any;
}

const InitStyles: FC<Props> = ({ children, config }) => {
  const c = useCreateStylesGuide(config);
  return c ? children : null;
};

const StyleGuideProvider: FC<Props> = ({ children, config }) => {
  return (
    <StylesProvider>
      <InitStyles config={config}>{children}</InitStyles>
    </StylesProvider>
  );
};

export default StyleGuideProvider;
