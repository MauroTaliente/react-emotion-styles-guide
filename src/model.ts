import type * as CSS from 'csstype';
import facepaint from 'facepaint';
import { FC, ReactElement } from 'react';
import { Merge } from 'ramda';

// types
export enum Actions {
  'THEME',
  'GUIDE',
}

export type Expand<T> = T extends (...args: infer A) => infer R
  ? (...args: Expand<A>) => Expand<R>
  : T extends infer O
  ? { [K in keyof O]: O[K] }
  : never;

export type ExpandRecursively<T> = T extends (...args: infer A) => infer R
  ? (...args: ExpandRecursively<A>) => ExpandRecursively<R>
  : T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T;

export type Join<T> = { [K in keyof T]: [K, T[K]] } & object;

export type RequiredDeep<T> = T extends string | number | bigint | boolean | null | undefined | symbol | Date
  ? NonNullable<T>
  : T extends Array<infer ArrayType>
  ? Array<RequiredDeep<ArrayType>>
  : T extends ReadonlyArray<infer ArrayType>
  ? ReadonlyArray<ArrayType>
  : T extends Set<infer SetType>
  ? Set<RequiredDeep<SetType>>
  : T extends ReadonlySet<infer SetType>
  ? ReadonlySet<SetType>
  : T extends Map<infer KeyType, infer ValueType>
  ? Map<RequiredDeep<KeyType>, RequiredDeep<ValueType>>
  : T extends ReadonlyMap<infer KeyType, infer ValueType>
  ? ReadonlyMap<RequiredDeep<KeyType>, RequiredDeep<ValueType>>
  : Required<{ [K in keyof T]: RequiredDeep<T[K]> }>;

export type PartialDeep<T> = T extends string | number | bigint | boolean | null | undefined | symbol | Date
  ? T | undefined
  : T extends Array<infer ArrayType>
  ? Array<PartialDeep<ArrayType>>
  : T extends ReadonlyArray<infer ArrayType>
  ? ReadonlyArray<ArrayType>
  : T extends Set<infer SetType>
  ? Set<PartialDeep<SetType>>
  : T extends ReadonlySet<infer SetType>
  ? ReadonlySet<SetType>
  : T extends Map<infer KeyType, infer ValueType>
  ? Map<PartialDeep<KeyType>, PartialDeep<ValueType>>
  : T extends ReadonlyMap<infer KeyType, infer ValueType>
  ? ReadonlyMap<PartialDeep<KeyType>, PartialDeep<ValueType>>
  : { [K in keyof T]?: PartialDeep<T[K]> };

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

// STEP 0 | Known
export type ProcessStyles = 'simple' | 'facepaint';

export type KnownOptions = {
  forceIrr?: boolean;
  mediaQrr?: boolean;
  mode?: ProcessStyles;
  literal?: boolean;
  overlap?: boolean;
  initTheme?: string;
  baseExtendedOn?: boolean;
};

export type KnownProps = {
  [K: string]: any;
};

export type KnownTheme = {
  name: string;
  colors?: Colors;
  fontFamily?: Fonts;
  tags?: readonly string[];
} & KnownProps;

export type KnownBase = {
  colors?: Colors;
  fontFamily?: Fonts;
} & KnownProps;

export type KnownInitGuide = {
  breakPoints?: BrakePoints;
  options?: KnownOptions;
  base?: KnownBase;
  root?: KnownProps;
  scheme?: {
    tags?: readonly string[];
    colors?: readonly string[];
    fontFamily?: readonly string[];
  };
  themes?: readonly KnownTheme[];
};

// STEP 1
export type InitProps<T> = T extends KnownInitGuide ? T : never;

// STEP 2 | support types ->
type Themes<T extends KnownInitGuide> = RequiredDeep<T['themes']>;
type Theme<T extends KnownInitGuide> = Merge<Themes<T>[number], NonNullable<T['base']>, 'deep'>;
type StyleSheets = <P extends ProcessStyles, R extends CSS_Rules>(
  rules: R,
  processStyles?: P,
  options?: facepaint.Options,
) => R; // TODO mejora pendiente.
export type InitGuide<T> = T extends KnownInitGuide
  ? ExpandRecursively<{
      breakPoints: NonNullable<T['breakPoints']>;
      options: RequiredDeep<T['options']>;
      root: NonNullable<T['root']>;
      theme: Theme<T>;
      themes: Themes<T>;
      helpers: {
        mq: Record<number, string>;
        styleSheets: StyleSheets;
      };
    }>
  : never;

// STEP 3 | support types ->
type MediaFlags<T extends KnownInitGuide> = Record<keyof T['breakPoints'], boolean>;
type ThemeFlags<T extends KnownInitGuide> = Record<Theme<T>['name'], boolean>;
type TagsFlags<T extends KnownInitGuide> = Record<Theme<T>['tags'][number], boolean>;
export type BaseGuide<T> = T extends KnownInitGuide
  ? InitGuide<T> &
      ExpandRecursively<{
        helpers: {
          setTheme: (n: Themes<T>) => void;
        };
        state: {
          mediaFlags: MediaFlags<T>;
          themeFlags: ThemeFlags<T>;
          tagsFlags: TagsFlags<T>;
        };
      }>
  : never;

// STEP 4 / extended types ->
export type KnownExtended = Record<string, (g: any) => Record<string, any>>;
export type InitExtend<T> = T extends KnownExtended ? T : never;

export type FullGuide<T, E> = T extends KnownInitGuide
  ? E extends KnownExtended
    ? BaseGuide<T> &
        ExpandRecursively<{
          extended: { [K in keyof E]: ReturnType<E[K]> };
        }>
    : never
  : never;

export type Extended<E extends KnownExtended> = {
  [K in keyof E]: ReturnType<E[K]>;
};

// DEFAULT SETTINGS //
export const emptyTheme = {
  name: '',
  tags: [],
  colors: {},
  fontFamily: {},
} as KnownTheme;
export const emptyConfig = {
  breakPoints: {},
  initThemeName: '',
  base: {},
  themes: [],
  scheme: {},
  theme: emptyTheme,
};
