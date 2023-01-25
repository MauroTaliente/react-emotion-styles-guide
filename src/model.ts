import type * as CSS from 'csstype';
import facepaint from 'facepaint';

// DEFAULT SETTINGS
export const emptyTheme = {
  name: '',
  tags: [],
  colors: {},
  fontFamily: {},
};
export const emptyConfig = {
  breakPoints: [],
  initThemeName: '',
  root: { colors: {}, fontFamily: {} },
  themes: [],
  scheme: {},
  theme: emptyTheme,
};

// types
export type Entries<T> = { [K in keyof T]: [K, T[K]]; }[keyof T][];
export type CSS_Rule = {[K in keyof CSS.Properties]: CSS.Properties[K] | CSS.Properties[K][] };
export type CSS_Rule_Facepaint = CSS_Rule[];
export type CSS_Rules = Record<string, CSS_Rule>;
export type CSS_Rules_Facepaint = Record<string, CSS_Rule_Facepaint>;
export type Flags<T> = {
  [Property in keyof T]: boolean;
};
export type Colors = Record<string, string>;
export type Fonts = Record<string, string>;
// export type Atoms = Record<string, CSS.Properties>;

export type KnownTheme = {
  name: string,
  tags: readonly string[];
  colors: Colors;
  fontFamily: Fonts;
};

export type KnownRoot = {
  colors: Colors;
  fontFamily:  Fonts;
};

export type KnownInitGuide = {
  breakPoints: readonly number[];
  initThemeName: string;
  root: KnownRoot;
  scheme: any;
  themes: readonly KnownTheme[];
};

export type InitGuide<T> = T extends KnownInitGuide ?
  T : KnownInitGuide;

export type KnownBaseGuide = {
  breakPoints: readonly number[];
  root: KnownRoot;
  theme: KnownTheme;
  themes: readonly KnownTheme[];
  helpers: {
    mq: Record<number, string>,
    mqCss: (r: CSS_Rule) => facepaint.DynamicStyle;
    styleSheets: <S extends CSS_Rules>(r: S) => Record<keyof S, any>;
    themesFlags: Record<string, boolean>;
    tagsFlags: Record<string, boolean>;
  };
};

export type BaseGuide<T> = T extends KnownInitGuide
  ? KnownBaseGuide & {
    breakPoints: T['breakPoints'];
    root: T['root'];
    theme: T['themes'][number];
    themes: T['themes'];
    helpers: {
      themesFlags: Record<T['themes'][number]['name'], boolean>;
      tagsFlags: Record<T['themes'][number]['tags'][number], boolean>;
    }
  } : KnownBaseGuide;

export enum Actions { 'THEME', 'GUIDE' }

export type Reducer = (p1: any, p2: [Actions, any]) => any;
