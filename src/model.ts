import type * as CSS from 'csstype';
import { DynamicStyle } from 'facepaint';

// DEFAULT SETTINGS
// base
const breakPoints = [360, 680, 960, 1140, 1440];

const colors = {
  // primary: '#0f172a',
};

const fonts = {
  // display: 'Source Serif Pro Georgia serif',
};

// components
// const baseProps = {
//   texts: {
//     fontSize: '1em',
//     fontWeight: 400,
//     whiteSpace: 'pre-line',
//   },
//   elements: {
//     display: 'flex',
//   }
// };

const texts = {
  // p: {
  //   ...baseProps.texts,
  //   fontFamily: fonts.display,
  //   color: colors.primary[700],
  // },
};

const atoms = {
  // row: {
  //   ...baseProps.elements,
  //   flexDirection: 'row',
  // }
};

// config
const defaultConfig = {
  breakPoints,
  colors,
  fonts,
  texts,
  atoms,
};

// types
export type BreakPoints = number[];
export type Colors = { [name: string]: CSS.Properties<'color'> | any };
export type CssRule = CSS.Properties<any | any[]>;
export type CssRules = { [name: string]: CssRule };
export type Css = (rule: CssRule) => DynamicStyle[];
export type Scss = (rules: CssRules) => { [name: string]: DynamicStyle[] };
export type SetTheme = (name: string) => void;

export interface Theme {
  name?: string;
  colors?: Colors;
  fonts?: CssRules;
  texts?: CssRules;
  atoms?: CssRules;
}

export interface Themes {
  [name: string]: Theme;
}

export interface Root {
  breakPoints?: BreakPoints;
  colors?: Colors;
  fonts?: CssRules;
  texts?: CssRules;
  atoms?: CssRules;
  initTheme?: string;
  baseTheme?: string;
  themes?: Themes;
}

export interface Helpers {
  css: Css;
  scss: Scss;
  setTheme: SetTheme;
}

export interface Guide extends Helpers {
  root: Root;
  theme?: Theme;
}

export default defaultConfig;
