import React from 'react';
import { css } from '@emotion/react';

import { useStyleGuide } from '../styles';

declare module 'react' {
  interface Attributes {
    css?: any
  }
}

const GuideTest = () => {
  const {
    breakPoints,
    helpers: { setTheme, styleSheets },
    theme: { name, colors, fontFamily },
  } = useStyleGuide();

  const change = () => {
    const next = (() => {
      if (name === 'themeMila') return 'themePancho';
      return 'themeMila';
    })()
    setTheme(next);
  }

  const styles = styleSheets({
    container: {
      display: 'flex',
      backgroundColor: colors.bgPrimary,
      width: '100vw',
      height: '100vh',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    h1: {
      paddingBottom: '2rem',
      fontSize: '3rem',
      fontFamily: fontFamily.display,
    },
    p: {
      paddingBottom: '2rem',
    },
    button: {
      display: 'flex'
      // ...atoms.button,
    },
  });

  return (
    <div
      css={styles.container}
    >
      <div
        // css={atoms.card}
      >
        <h1 css={[styles.h1]}>
          Hi this is style guide!
        </h1>
        <p css={[styles.p]}>
          Esta libreria esta pensada para hacer muchos componentes
        </p>
        <button
          css={[styles.button]}
          onClick={change}
        >
          change Theme
        </button>
      </div>
    </div>
  );
};

export default GuideTest;
