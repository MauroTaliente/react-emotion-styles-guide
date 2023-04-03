import React from 'react';
import { StyleSheets, CSS_Rules } from '../../module/esm';

import { useStyleGuide } from '../styles';

const Main = () => {
  const {
    theme,
    helpers,
    extended,
    helpers: { styleSheets },
    extended: { common, noCss, aspectRatio },
  } = useStyleGuide();

  const styles = styleSheets({
    main: { width: '100%', background: 'red' },
  });

  return <div css={styles.main}>Main</div>;
};

export default Main;
