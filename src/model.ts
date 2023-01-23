import type * as CSS from 'csstype';
import { ValueOf } from 'next/dist/shared/lib/constants';

// DEFAULT SETTINGS
// base
const breakPoints = [360, 680, 960, 1140, 1440];

const colors = {
  primary: '#0f172a',
};

const fonts = {
  display: 'Source Serif Pro Georgia serif',
};

// components
const baseProps = {
  texts: {
    fontSize: '1em',
    fontWeight: 400,
    whiteSpace: 'pre-line',
  },
  elements: {
    display: 'flex',
  }
};

const texts = {
  p: {
    ...baseProps.texts,
    fontFamily: fonts.display,
    color: colors.primary[700],
  },
};

const atoms = {
  row: {
    ...baseProps.elements,
    flexDirection: 'row',
  }
};

const theme = {
  name: 'theme',
  colors,
  fonts,
  texts,
  atoms,
};

export const emptyTheme = {
  name: '',
  colors: {},
  fonts: {},
  texts: {},
  atoms: {},
};

// config
const defaultConfig = {
  breakPoints,
  colors,
  fonts,
  texts,
  atoms,
  themes: { theme },
  initTheme: 'theme',
  baseTheme: 'theme',
};

// helper types
// type FrstParamFn<T> = T extends (param: infer U) => any ? U : T;
// type ReturnFn<T> = T extends (param: any) => infer U ? U : T;

// types

export type Entries<T> = { [K in keyof T]: [K, T[K]]; }[keyof T][];

export type CSS_Rule = {[K in keyof CSS.Properties]: CSS.Properties[K] | CSS.Properties[K][] };

export type CSS_Rule_Facepaint = CSS_Rule[];

export type CSS_Rules = Record<string, CSS_Rule>;

export type CSS_Rules_Facepaint = Record<string, CSS_Rule_Facepaint>;

export type Flags<T> = {
  [Property in keyof T]: boolean;
};

export type Colors = Record<string, CSS.Properties['color']>;
export type Fonts = Record<string, string>;
export type Texts = Record<string, CSS.Properties>;
export type Atoms = Record<string, CSS.Properties>;

export type KnownTheme = {
  colors?: Colors;
  fonts?: Fonts;
  texts?: Texts;
  atoms?: Atoms;
};

export type KnownBaseTheme = {
  name: string;
  colors: Colors;
  fonts: Fonts;
  texts: Texts;
  atoms: Atoms;
};

export type KnownRoot = {
  colors?: Colors;
  fonts?: Fonts;
  texts?: Texts;
  atoms?: Atoms;
};

type KnownThemes = Record<string, KnownTheme>;

export type KnownInitGuide = {
  activeTheme?: string;
  baseTheme?: keyof KnownThemes;
  breakPoints: number[];
  themes?: KnownThemes;
} & KnownRoot;

export type KnownBaseGuide = {
  root: KnownRoot;
  theme: KnownBaseTheme;
  themes: Record<string, KnownBaseTheme>;
  themesFlags: Record<string, boolean>;
  breakPoints: number[];
};

export type Theme<T> = T[keyof T]
& { name: keyof T };

export type Root<T> = Omit<T, `
    themes
  | baseTheme
  | activeTheme
  | breakPoints
`>;

export type BaseGuide<T> = T extends KnownInitGuide ? {
  theme: Theme<T['themes']>;
  themes: T['themes'];
  themesFlags: Flags<T['themes']>;
  breakPoints: T['breakPoints'];
  root: Root<T>;
} & KnownBaseGuide: never;


export type InitGuide<T> = T extends KnownInitGuide ? T : KnownInitGuide;

export enum Actions { 'THEME', 'GUIDE' }

export type Reducer = (p1: any, p2: [Actions, any]) => any;

export default defaultConfig;
