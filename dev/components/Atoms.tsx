import React, { Children } from 'react';
import { useStyleGuide } from '../styles';

declare module 'react' {
  interface Attributes {
    css?: any;
  }
}

const Atoms = ({ children }) => {
  const {
    theme: { colors, fontFamily },
    state: {
      themesFlags: { themeMila },
      tagsFlags: { rounded },
    },
  } = useStyleGuide();

  return children;
};

export default Atoms;
