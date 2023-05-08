import React from 'react';
import { StyleSheets, CSS_Rules } from '../../module/esm';

import { useStyleGuide } from '../styles';

const Main = () => {
  const {
    extended,
    helpers: { styleSheets, setTheme, mergeCss },
    state: { themeFlags },
  } = useStyleGuide();

  const styles = styleSheets(
    {
      code: {
        fontFamily: 'sans-serif',
        fontSize: '2em',
      },
      compare: {
        display: 'flex',
        flexDirection: 'row',
      },
      main: {
        width: '100%',
        height: ['265px', '128px'],
        backgroundColor: [extended.colors.grays40, extended.colors.grays70, extended.colors.grays90],
        cursor: 'pointer',
        maxWidth: extended.maxWidth.screenSm,
      },
      one: {
        display: 'flex',
        width: ['512px', '265px', '128px'],
        height: ['265px', '128px'],
        backgroundColor: ['red', 'blue', 'green'],
      },
      two: {
        width: '50%',
        height: '512px',
      },
    },
    'facepaint',
  );

  const handleTheme = () => {
    if (themeFlags.base) setTheme('other');
    if (themeFlags.other) setTheme('base');
  };

  const test = [styles.one, styles.two];
  const testJoin = mergeCss(test);

  return (
    <>
      <div css={[extended.card, styles.main]} onClick={handleTheme}>
        Change theme
      </div>
      <div css={testJoin} />
      <div css={styles.compare}>
        <code css={styles.code}>
          <pre>{JSON.stringify(test, null, 4)}</pre>
        </code>
        <code css={styles.code}>
          <pre>{JSON.stringify(testJoin, null, 4)}</pre>
        </code>
      </div>
    </>
  );
};

export default Main;
