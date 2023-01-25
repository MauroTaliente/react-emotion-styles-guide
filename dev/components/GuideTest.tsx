import React from 'react';
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
    state: {
      themesFlags: { themeMila },
      tagsFlags: { rounded }},
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
    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'center',
      padding: '4em 2em 2em 2em',
      backgroundColor: colors.bgSecondary,
      borderRadius: rounded ? '1em' : '0.25em',
    },
    h1: {
      paddingBottom: '2rem',
      fontSize: '3rem',
      fontFamily: fontFamily.display,
    },
    p: {
      paddingBottom: '2rem',
      fontFamily: fontFamily.body,
    },
    button: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: themeMila ? '25em' : 'auto', 
      padding: '1em 2em',
      fontSize: '0.75em',
      fontFamily: fontFamily.display,
      borderRadius: rounded ? '1em' : '0.25em',
      borderColor: 'transparent',
      color: colors.ngAcent,
      backgroundColor: colors.acent,
      cursor: 'pointer',
    },
  });

  return (
    <div
      css={styles.container}
    >
      <div
        css={themeMila ? styles.card : styles.content}
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
