import React, { useMemo } from 'react';
import * as R from 'ramda';
import facepaint from 'facepaint';
import { css } from '@emotion/react';
import newContext from './helpers/context';
import { themeBuilder } from './theme';

import {
  InitGuide,
  BaseGuide,
  Reducer,
  Actions,
  CSS_Rule,
  CSS_Rules,
  CSS_Rule_Facepaint,
  CSS_Rules_Facepaint,
  emptyTheme,
  Entries,
  KnownInitGuide,
  Colors,
  Fonts,
  KnownTheme,
} from './model';

const {
  toString,
  equals,
  map,
  whereEq,
  keys,
  values,
  reduce,
  mergeDeepRight,
  includes,
  all,
  type,
  is,
  intersection,
  find,
  // not,
  // and,
} = R;

enum PRINT_TYPE {
  ERROR,
  ALERT,
  LOG,
}
enum VERIFY {
  TY,
  TY_IN,
  VALUES_TY_IN_ARR,
  KEYS_TY_IN_ARR,
  EQ,
  KEYS_EQ_KEYS,
  OBJ_IN_OBJ,
  WHERE_IN_ARR,
  ARR_IN_ARR,
  KEYS_IN_KEYS,
  KEY_IN_ARR,
}

// VRIFY SCHEME AND FORM
const printVerifyMesage = (
  printType: PRINT_TYPE,
  v: VERIFY,
  expected: any,
  received: any,
) => {
  // create message by v:
  let mesage = 'Ups missing error rule.';
  if (v === VERIFY.TY)
    mesage = `This element: ${toString(received)} does not instead of ${toString(type(expected()))}.`;
  if (v === VERIFY.TY_IN
    || v === VERIFY.VALUES_TY_IN_ARR
    || v === VERIFY.KEYS_TY_IN_ARR)
    mesage = `This element: ${toString(received)} does not contain only ${toString(type(expected()))}'.`;
  if (v === VERIFY.EQ || v === VERIFY.KEYS_EQ_KEYS)
    mesage = `This element: ${toString(received)} does not match to schema: ${toString(expected)}.`;
  if (v === VERIFY.OBJ_IN_OBJ
    || v === VERIFY.KEYS_IN_KEYS
    || v === VERIFY.KEY_IN_ARR
    || v === VERIFY.ARR_IN_ARR)
    mesage = `This element: ${toString(received)} is not included in the scheme: ${toString(expected)}.`;
  // print rules:
  if (printType === PRINT_TYPE.ERROR) throw new Error(mesage);
  if (printType === PRINT_TYPE.ALERT) return console.error(mesage);
  return console.log(mesage);
};

const verifyScheme = (
  received: any,
  expected: any,
  v: VERIFY,
  emptyMode = false,
  printType: PRINT_TYPE = PRINT_TYPE.ALERT,
) => {
  if (emptyMode && (!received || !expected)) return true;
  // console.log({ received, expected, v });
  let pass = true;
  if (v === VERIFY.TY) pass = is(expected, received);
  if (v === VERIFY.TY_IN) pass = all(is(expected))(received);
  if (v === VERIFY.VALUES_TY_IN_ARR) pass = all(is(expected))(values(received));
  if (v === VERIFY.KEYS_TY_IN_ARR) pass = all(is(expected))(keys(received));
  if (v === VERIFY.EQ) pass = equals(expected, received);
  if (v === VERIFY.OBJ_IN_OBJ) pass = whereEq(expected)(received);
  if (v === VERIFY.WHERE_IN_ARR) pass = all(expected)(received);
  if (v === VERIFY.KEYS_EQ_KEYS) pass = equals(expected, keys(received));
  if (v === VERIFY.KEYS_IN_KEYS) pass = equals(intersection(keys(expected), keys(received)), keys(received));
  if (v === VERIFY.ARR_IN_ARR) pass = equals(intersection(expected, received), received);
  if (v === VERIFY.KEY_IN_ARR) pass = includes(received)(expected);
  if (!pass) printVerifyMesage(printType, v, expected, received);
  // console.log(pass);
  return pass;
};

// SUPPORT FNS
const createMediaQueries = reduce((pre: object, value: number) => {
  return mergeDeepRight(pre, { [value]: `@media (min-width: ${value}px)` });
}, {});

const createObjfromRule = (type: any) =>
  reduce((pre: object, value: number) => {
    return mergeDeepRight(pre, { [value]: type });
  }, {});

// INI CONFIG
export const getInitConfig = <T extends KnownInitGuide>(init: InitGuide<T>) => {
  // EMPTY INIT
  const empty = {
    breakPoints: [],
    initThemeName: '',
    root: { colors: {}, fontFamily: {} },
    themes: [],
    scheme: {},
    theme: { name: '', tags: [], colors: {}, fontFamily: {} },
  };

  // SCHEME
  const emptyScheme = {
    name: null,
    tags: null,
    colors: null,
    fontFamily: null,
  };
  const baseScheme = init.scheme || empty.scheme;
  verifyScheme(baseScheme, Object, VERIFY.TY, true);
  const scheme = mergeDeepRight(emptyScheme, baseScheme);
  verifyScheme(scheme, emptyScheme, VERIFY.KEYS_IN_KEYS);

  // BREAKEPOINTS
  const breakPoints = init.breakPoints || empty.breakPoints;
  verifyScheme(breakPoints, Array, VERIFY.TY);
  verifyScheme(breakPoints, Number, VERIFY.TY_IN);
  // DERIVED BREAKEPOINTS =>
  // media quieris map
  const mq = createMediaQueries(breakPoints);
  // media quieris with facepaint and css function helper
  const mqCss = (rule: CSS_Rule, ...args: any[]) => {
    const format = map((point: number) => mq[point])(breakPoints);
    const build = facepaint(format);
    return css(build(rule));
  };
  const styleSheets = (rules: CSS_Rules, procces = mqCss) => {
    return reduce((pre: CSS_Rules, key: string) => {
      return mergeDeepRight(pre, { [key]: procces(rules[key] as CSS_Rule) });
    }, {})(keys(rules));
  };

  // ROOT
  const root = mergeDeepRight(init.root, empty.root);
  verifyScheme(root, Object, VERIFY.TY);
  verifyScheme(root, empty.root, VERIFY.KEYS_IN_KEYS);
  verifyScheme(root.colors, String, VERIFY.VALUES_TY_IN_ARR);
  verifyScheme(root.fontFamily, String, VERIFY.VALUES_TY_IN_ARR);

  // THEMES
  const themes = init.themes || empty.themes;
  map((x: any) => {
    verifyScheme(x.name, scheme.name, VERIFY.KEY_IN_ARR, true);
    verifyScheme(x.tags, scheme.tags, VERIFY.ARR_IN_ARR, true);
    verifyScheme(x.colors, scheme.colors, VERIFY.KEYS_EQ_KEYS, true);
    verifyScheme(x.fontFamily, scheme.fontFamily, VERIFY.KEYS_EQ_KEYS, true);
    verifyScheme(x.name, String, VERIFY.TY);
    verifyScheme(x.tags, String, VERIFY.VALUES_TY_IN_ARR);
    verifyScheme(x.colors, String, VERIFY.VALUES_TY_IN_ARR);
    verifyScheme(x.fontFamily, String, VERIFY.VALUES_TY_IN_ARR);
  })(themes);
  // DERIVED THEMES =>
  // init themeName
  const initThemeName = init.initThemeName || init.themes[0].name || empty.initThemeName;
  // list of themes
  const themesNames = map(({ name }: KnownTheme) => name)(themes);
  verifyScheme(initThemeName, themesNames, VERIFY.KEY_IN_ARR);
  verifyScheme(themesNames, scheme.name, VERIFY.EQ, true);
  // active theme
  const theme = find(({ name }: KnownTheme) => name === initThemeName)(themes) || empty.theme;

  return {
    breakPoints,
    root,
    theme,
    themes,
    helpers: {
      mq,
      mqCss,
      styleSheets,
    },
  } as unknown as BaseGuide<T>;
};

const reducer: Reducer = (data, [action, payload]) => {
  if (action === Actions.GUIDE) return payload;
  if (action === Actions.THEME)
    return {
      ...data,
      theme: find(({ name }: any) => equals(name, payload))(data.themes),
    };
  return data;
};

const createStyleGuide = <T extends KnownInitGuide>(config: InitGuide<T>) => {
  const initGuide: BaseGuide<T> = getInitConfig(config);

  const { StyleGuideProvider, useStyleGuideState, useStyleGuideUpdater } = newContext({
    name: 'StyleGuide',
    initState: initGuide,
    reducer,
  } as const);

  const useStyleGuide = () => {
    const base = useStyleGuideState();
    const set = useStyleGuideUpdater();

    const helpers = useMemo(() => {
      type Name = BaseGuide<T>['themes'][number]['name'];
      const setTheme = (themeName: Name) => {
        set([Actions.THEME, themeName]);
      };
      return { setTheme };
    }, [set]);

    const state = useMemo(() => {
      // themes flags
      const themesFlags = reduce((pre: object, { name }: KnownTheme) => {
        return mergeDeepRight(pre, { [name]: name === base.theme.name });
      }, {})(base.themes);
      // tags flags
      const tagsFlags = reduce((pre: object, { tags }: KnownTheme) => {
        const inners = reduce((pre: object, tag: string) => {
          return mergeDeepRight(pre, { [tag]: includes(tag)(base.theme.tags) });
        }, {})(tags);
        return mergeDeepRight(pre, inners);
      }, {})(base.themes);
      return { themesFlags, tagsFlags };
    }, [base]);

    // return base;
    return mergeDeepRight(base, { helpers, state });
  };

  return {
    StyleGuideProvider,
    useStyleGuide,
  };
};

export { createStyleGuide as default, themeBuilder };
