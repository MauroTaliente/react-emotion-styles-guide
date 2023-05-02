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
      main: {
        width: '100%',
        height: ['265px', '128px'],
        backgroundColor: [extended.colors.grays40, extended.colors.grays70, extended.colors.grays90],
        cursor: 'pointer',
        maxWidth: extended.maxWidth.screenSm,
      },
      one: {
        display: 'flex',
        maxWidth: ['512px', '265px', '128px'],
        width: '100%',
        height: ['265px', '128px'],
        backgroundColor: ['red', 'blue', 'green'],
      },
      two: {
        // width: '50%',
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
  console.log({ test, testJoin });

  return (
    <>
      <div css={[extended.card, styles.main]} onClick={handleTheme}>
        Change theme
      </div>
      <div css={testJoin} />
    </>
  );
};

export default Main;
