import { InitGuide, BaseGuide, createStyleGuide, CSS_Rule } from '../module/esm';

declare module 'react' {
  interface Attributes {
    css?: CSS_Rule;
  }
}

// BPS
const breakPoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  sl: 1440,
  ul: 1920,
};

// SCHEME
const scheme = {
  name: ['base', 'other'],
  tags: ['dark', 'rounded'],
  fontFamily: ['display', 'body'],
  colors: [
    'acent70',
    'acent30',
    'grays90',
    'grays80',
    'grays70',
    'grays40',
    'grays30',
    'grays20',
    'grays05',
    'grays03',
    'grays00',
  ],
};

// THEMES
const root = {
  colors: { brand: '#75BDA0' },
} as const;

const base = {
  name: 'base',
  tags: ['dark'],
  colors: {
    acent70: '#004745',
    acent30: '#75BDA0',
    grays90: '#010200',
    grays80: '#111111',
    grays70: '#1C1C1C',
    grays40: '#33302F',
    grays30: '#72716E',
    grays20: '#ABACA8',
    grays05: '#E2E2E2',
    grays03: '#F6F6F6',
    grays00: '#FFFFFF',
  },
  fontFamily: {
    display: 'Unbounded',
    body: 'Raleway',
  },
} as const;

const other = {
  name: 'other',
  tags: ['rounded'],
  colors: {
    acent70: '#FF5A5F',
    acent30: '#FFB164',
    grays90: '#010200',
    grays80: '#111111',
    grays70: '#1C1C1C',
    grays40: '#33302F',
    grays30: '#72716E',
    grays20: '#ABACA8',
    grays05: '#E2E2E2',
    grays03: '#F6F6F6',
    grays00: '#FFFFFF',
  },
} as const;

export const config = {
  options: {
    initTheme: 'base',
    styleSheets: 'facepaint',
  },
  breakPoints,
  root,
  base,
  scheme,
  themes: [base, other],
} as const;

type I = typeof config;
type A = InitGuide<I>;
type B = BaseGuide<A>;

const extended = {
  colors: ({ theme }: B) => ({ ...theme.colors, superAcent: theme.colors.acent70 }),
  card: ({ theme }: B) => ({ backgroundColor: theme.colors.acent30, color: 'red' }),
};

export const { StyleGuideProvider, useStyleGuide } = createStyleGuide(config, extended);
