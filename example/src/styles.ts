import { InitGuide, BaseGuide, createStyleGuide, baseExtended, CSS_Rule } from '../module/esm';

declare module 'react' {
  interface Attributes {
    css?: CSS_Rule;
  }
}

const config = {
  breakPoints: { md: 640 },
  options: {
    initTheme: 'mauro',
  },
  base: {
    spacing: {
      sm: '1rem',
      md: '2rem',
    },
  },
  themes: [
    {
      name: 'mauro',
      tags: ['dark'],
      colors: {
        acent: '#9D84B8',
        primary: '#FFFFFD',
        secondary: '#A8A7AC',
        ngAcent: '#212025',
        bgPrimary: '#212025',
        bgSecondary: '#29282D',
      },
      fontFamily: {
        display: 'Unbounded',
        body: 'Raleway',
        element: 'Raleway',
      },
      spacing: {
        sm: '1.5rem',
      },
    } as const,
    {
      name: 'sabri',
      tags: ['light'],
      colors: {
        acent: 'red',
        primary: 'white',
        secondary: 'blue',
        ngAcent: 'black',
        bgPrimary: 'pink',
        bgSecondary: 'yellow',
      },
      fontFamily: {
        display: 'Raleway',
        body: 'Unbounded',
        element: 'Unbounded',
      },
    } as const,
  ],
} as const;

const extended = {
  ...baseExtended,
  extra: ({ breakPoints, theme: { colors } }: BaseGuide<typeof config>) => ({
    color: colors.acent,
    other: 'pink',
    maxWidth: `${breakPoints.md}px`,
  }),
  common: {
    padding: '12px',
  },
  noCss: ({ theme: { colors } }: BaseGuide<typeof config>) => ({ ...colors }),
};

type T = InitGuide<typeof config>['helpers']['styleSheets'];

export const { StyleGuideProvider, useStyleGuide } = createStyleGuide(config, extended);
