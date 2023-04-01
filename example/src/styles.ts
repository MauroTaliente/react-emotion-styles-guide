import { InitGuide, BaseGuide } from '@module/esm/model';
import { createStyleGuide, CSS_Rule } from '../module/esm';

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
        acent: '#9D84B8',
        primary: '#FFFFFD',
        secondary: '#A8A7AC',
        ngAcent: '#212025',
        bgPrimary: '#212025',
        bgSecondary: '#29282D',
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
  extra: (guide: BaseGuide<typeof config>) => ({
    color: guide.theme.colors.acent,
    other: 'pink',
    maxWidth: `${guide.breakPoints.md}px`,
  }),
  common: {
    padding: '12px',
  },
};

type T = InitGuide<typeof config>['helpers']['styleSheets'];

export const { StyleGuideProvider, useStyleGuide } = createStyleGuide(config, extended);
