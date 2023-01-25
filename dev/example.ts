const baseProps = {
  breakPoints: [360, 720],
  initThemeName: 'theme_mila',
  // whithAtoms: true, ?
  root: {
    colors: { color: '#color' },
    fontFamily: { display: 'Font Family' },
  },
  scheme: {
    tags: ['dark', 'rounded', 'light'],
    colors: ['main'],
    fontFamily: ['display'],
  },
  themes: [
    {
      name: 'theme_mila' as const,
      tags: ['dark', 'rounded'],
      colors: { main: '#color' },
      fontFamily: { display: 'Font Family' },
    },
    {
      name: 'theme_pancho' as const,
      tags: ['light'],
      colors: { main: '#color' },
      fontFamily: { display: 'Font Family' },
      // baseThemeName: 'theme_mila', ?
    },
  ],
};

const computedProps = {
  breakPoints: [360, '720'],
  root: {
    colors: { main: '#color' },
    fontFamily: { display: 'Font Family' },
  },
  theme: {
    name: 'theme_mila',
    tags: ['dark', 'rounded'],
    colors: { main: '#color' },
    fontFamily: { display: 'Font Family' },
  },
  themes: [
    {
      name: 'theme_mila',
      tags: ['dark', 'rounded'],
      colors: { main: '#color' },
      fontFamily: { display: 'Font Family' },
    },
    {
      name: 'theme_pancho',
      tags: ['light'],
      colors: { main: '#color' },
      fontFamily: { display: 'Font Family' },
      // baseThemeName: 'theme_mila', ?
    },
  ],
  themesFlags: {
    theme_mila: true,
    theme_pancho: false,
  },
  tagsFlags: {
    dark: true,
    rounded: true,
    light: false,
  },
  helpers: {
    mq: {
      360: '@media (min-width: 360px)',
      720: '@media (min-width: 360px)',
    },
    mqCss: `({ color: ['green', 'gray'] }) => [
      { color: 'green' }
      { color: 'gray' },
    ]`,
    // setTheme: `(themeName) => {}`,
  },
};

// Post proccess => TODO analizar bien Atoms
const post = (computedProps: any) => {
  return {};
};

const final = {
  ...computedProps,
  atoms: post(computedProps),
};
