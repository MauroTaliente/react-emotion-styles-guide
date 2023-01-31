/* eslint-disable @typescript-eslint/indent */
import type * as CSS from 'csstype';
import facepaint from 'facepaint';
import { FC, ReactElement, ReactNode } from 'react';

// DEFAULT SETTINGS
export const emptyTheme = {
  name: '',
  tags: [],
  colors: {},
  fontFamily: {},
};
export const emptyConfig = {
  breakPoints: {},
  initThemeName: '',
  root: { colors: {}, fontFamily: {} },
  themes: [],
  scheme: {},
  theme: emptyTheme,
};

// types
export type WrapFC = FC<{ children: ReactElement }>;
export type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];
export type CSS_Rule = { [K in keyof CSS.Properties]: CSS.Properties[K] | CSS.Properties[K][] };
export type CSS_Rule_Facepaint = CSS_Rule[];
export type CSS_Rules = Record<string, CSS_Rule>;
export type CSS_Rules_Facepaint = Record<string, CSS_Rule_Facepaint>;
export type Flags<T> = {
  [Property in keyof T]: boolean;
};
export type Colors = Record<string, string>;
export type Fonts = Record<string, string>;
export type BrakePoints = Record<string, number>;

type FacepaintCss = (r: CSS_Rule) => facepaint.DynamicStyle;
// type EmotionCss = typeof css;

type StyleSheets = <S extends Record<string, CSS_Rule>, P>(r: S, p?: P) => S;

export type KnownTheme = {
  name: string;
  tags: readonly string[];
  colors: Colors;
  fontFamily: Fonts;
};

export type KnownRoot = {
  colors: Colors;
  fontFamily: Fonts;
};

export type KnownInitGuide = {
  breakPoints: BrakePoints;
  initThemeName: string;
  root: KnownRoot;
  scheme?: {
    tags?: readonly string[];
    colors?: readonly string[];
    fontFamily?: readonly string[];
  };
  themes: readonly KnownTheme[];
  noSsr?: {
    active: boolean;
    defer?: boolean;
    loading?: ReactNode;
  };
};

export type InitGuide<T> = T extends KnownInitGuide ? T : KnownInitGuide;

export type KnownBaseGuide = {
  breakPoints: BrakePoints;
  root: KnownRoot;
  theme: KnownTheme;
  themes: readonly KnownTheme[];
  atoms: CSS_Rules;
  helpers: {
    mq: Record<number, string>;
    mqCss: FacepaintCss;
    styleSheets: StyleSheets;
    setTheme: (n: string) => void;
  };
  state: {
    mediaFlags: Record<string, boolean>;
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
        setTheme: (n: T['themes'][number]['name']) => void;
      };
      state: {
        mediaFlags: Record<keyof T['breakPoints'], boolean>;
        themesFlags: Record<T['themes'][number]['name'], boolean>;
        tagsFlags: Record<T['themes'][number]['tags'][number], boolean>;
      };
    }
  : KnownBaseGuide;

export enum Actions {
  'THEME',
  'GUIDE',
}

export type Reducer = (p1: any, p2: [Actions, any]) => any;
