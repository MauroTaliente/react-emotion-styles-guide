import React from 'react';
import { StyleSheets, CSS_Rules } from '../../module/esm';

import { useStyleGuide } from '../styles';

const Main = () => {
  const {
    extended,
    helpers: { styleSheets, setTheme },
    state: { themeFlags },
  } = useStyleGuide();

  const styles = styleSheets({
    main: {
      width: '100%',
      height: ['265px', '128px'],
      color: extended.colors.grays40,
      cursor: 'pointer',
    },
  });

  const handleTheme = () => {
    if (themeFlags.base) setTheme('other');
    if (themeFlags.other) setTheme('base');
  };

  return (
    <div css={[extended.card, styles.main]} onClick={handleTheme}>
      Change theme
    </div>
  );
};

export default Main;
