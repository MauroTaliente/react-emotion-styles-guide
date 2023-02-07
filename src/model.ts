import type * as CSS from 'csstype';
import facepaint from 'facepaint';
import { FC, ReactElement } from 'react';

// DEFAULT SETTINGS //
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
export enum Actions {
  'THEME',
  'GUIDE',
}

export type Reducer = (p1: any, p2: [Actions, any]) => any;

export type Flags<T> = { [Property in keyof T]: boolean };
export type WrapFC = FC<{ children: ReactElement }>;
export type Entries<T> = { [K in keyof T]: [K, T[K]] }[keyof T][];
export type CSS_Properties = {
  [K in keyof CSS.Properties]: CSS.Properties[K] | CSS.Properties[K][];
};
export type CSS_Rule = CSS_Properties | CSS_Properties[];
export type CSS_Rule_Media = CSS_Rule[];
export type CSS_Rules = Record<string, CSS_Rule>;
export type CSS_Rules_Media = Record<string, CSS_Rule_Media>;
export type Colors = Record<string, string>;
export type Fonts = Record<string, string>;
export type BrakePoints = Record<string, number>;

export type SimpleProcessCss = (r: CSS_Rule) => CSS_Rule;
export type MediaProcessCss = (r: CSS_Rule, o?: facepaint.Options) => facepaint.DynamicStyle;

export type ProcessStyles = 'simple' | 'facepaint';

export type CSS_Media<T> = Record<keyof T, T[keyof T][]>;

export type StyleSheets = <P extends ProcessStyles, R extends CSS_Rules>(
  rules: R,
  processStyles?: P,
  options?: facepaint.Options,
) => R;
// ) => P extends 'media' ? CSS_Media<R> : R; Funciona como un or a la hora de inferir y es confuso por ahora no se peude usar.

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
  styles?: {
    mode?: ProcessStyles;
  } & facepaint.Options;
  initThemeName: string;
  root: KnownRoot;
  scheme?: {
    tags?: readonly string[];
    colors?: readonly string[];
    fontFamily?: readonly string[];
  };
  themes: readonly KnownTheme[];
  forceIrr?: boolean;
};

export type InitGuide<T> = T extends KnownInitGuide ? T : KnownInitGuide;

export type KnownBaseGuide = {
  breakPoints: BrakePoints;
  root: KnownRoot;
  theme: KnownTheme;
  themes: readonly KnownTheme[];
  atoms: CSS_Rules | CSS_Rules_Media;
  helpers: {
    mq: Record<number, string>;
    facepaintCss: MediaProcessCss;
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
      styles: T['styles'];
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
