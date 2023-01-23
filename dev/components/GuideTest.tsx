import React from 'react';
import { useStyleGuide } from '../styles';

declare module 'react' {
  interface Attributes {
    css?: any
  }
}
const GuideTest = () => {
  const {
    createStyle,
    createStyles,
    actions: {setTheme},
    theme: { name, colors, atoms, texts },
    root,
  } = useStyleGuide();

  const change = () => {
    setTheme(name === 'dark' ? 'ligth' : 'dark');
  }

  const styles = createStyles({
    container: {
      display: 'flex',
      backgroundColor: colors.bgPrimary,
      width: '100vw',
      height: '100vh',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      ...texts.h1,
      paddingBottom: '1em',
    },
    button: {
      ...atoms.button,
    },
  });

  return (
    <div
      css={styles.container}
    >
      <h1 css={styles.title}>
        Hi this is style guide!
      </h1>
      <button
        css={styles.button}
        onClick={change}
      >
        change Theme
      </button>
    </div>
  );
};

export default GuideTest;
