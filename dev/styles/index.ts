import createStyleGuide from "../../src";

const {
  StyleGuideProvider,
  useStyleGuide,
} = createStyleGuide({
  breakPoints: [360, 720] as const,
  initThemeName: 'themeMila' as const,
  // whithAtoms: true, ?
  root: {
    colors: { color: '#eaeaea' },
    fontFamily: { display: 'Font Family' },
  } as const,
  scheme: {
    name: ['themeMila', 'themePancho'],
    tags: ['dark', 'light', 'rounded'],
    colors: [
      'acent',
      'primary',
      'secondary',
      'ngAcent',
      'bgPrimary',
      'bgSecondary',
    ],
    fontFamily: [
      'display',
      'body',
    ],
  } as const,
  themes: [
    {
      name: 'themeMila',
      tags: ['dark', 'rounded'],
      colors: {
        acent: '#9e8de5',
        primary: '#0f0f11',
        secondary: '#393e43',
        ngAcent: '#ffffff',
        bgPrimary: '#ffffff',
        bgSecondary: '#edf0fa',
      },
      fontFamily: {
        display: 'Unbounded',
        body: 'Raleway',
      },
    } as const,
    {
      name: 'themePancho',
      tags: ['light'],
      colors: {
        acent: '#ff4e30',
        primary: '#020202',
        secondary: '#747474',
        ngAcent: '#f0f0f0',
        bgPrimary: '#f0f0f0',
        bgSecondary: '#ffffff',
      },
      fontFamily: {
        display: 'Playfair Display',
        body: 'IBM Plex Sans',
      } as const,
      // baseThemeName: 'theme_mila', ?
    },
  ],
} as const);

// TODO meter texts adentro de atoms son lo mismo
// crear funcion createAtoms 


export {
  StyleGuideProvider,
  useStyleGuide,
};