// SI
import React, { useMemo, useState } from 'react';
// utils
import * as R from 'ramda';
// styles
import facepaint from 'facepaint';

// local utils
import newContext from './helpers/context';
import baseExtended from './helpers/extended';
import { ForceIRR, ForceCSR } from './helpers/componets';

import {
  InitGuide,
  BaseGuide,
  Reducer,
  Actions,
  CSS_Rule,
  CSS_Rules,
  KnownInitGuide,
  KnownTheme,
  BrakePoints,
  WrapFC,
  InitProps,
  KnownExtended,
  InitExtend,
  Extended,
  FullGuide,
  StyleSheets,
  ProcessStyles,
  // PartialDeep,
  // KnownBuildGuide,
  // Join,
} from './model';

const {
  // empty,
  toString,
  equals,
  map,
  forEach,
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
  findIndex,
  last,
  curry,
  or,
  __,
} = R;

const IS_SSR = typeof document === 'undefined';
if (IS_SSR) {
  React.useLayoutEffect = React.useEffect;
}
const useIsomorphicLayoutEffect = React.useLayoutEffect;

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
const printVerifyMesage = (printType: PRINT_TYPE, v: VERIFY, expected: any, received: any) => {
  // create message by v:
  let mesage = 'Ups missing error rule.';
  if (v === VERIFY.TY)
    mesage = `This element: ${toString(received)} does not instead of ${toString(type(expected()))}.`;
  if (v === VERIFY.TY_IN || v === VERIFY.VALUES_TY_IN_ARR || v === VERIFY.KEYS_TY_IN_ARR)
    mesage = `This element: ${toString(received)} does not contain only ${toString(type(expected()))}'.`;
  if (v === VERIFY.EQ || v === VERIFY.KEYS_EQ_KEYS)
    mesage = `This element: ${toString(received)} does not match to schema: ${toString(expected)}.`;
  if (v === VERIFY.OBJ_IN_OBJ || v === VERIFY.KEYS_IN_KEYS || v === VERIFY.KEY_IN_ARR || v === VERIFY.ARR_IN_ARR)
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
const getLayout = () => (IS_SSR ? { width: 0, height: 0 } : { width: window.innerWidth, height: window.innerHeight });

// export useRefreshLayot posible include in next versions.
// const useRefreshLayot = () => {
//   const [layout, setLayout] = useState(getLayout());
//   const updateLayout = () => setLayout(getLayout());
//   useIsomorphicLayoutEffect(() => {
//     updateLayout();
//     window.addEventListener('resize', updateLayout);
//     return () => window.removeEventListener('resize', updateLayout);
//   }, []);
//   return layout;
// };

const createMediaFlafs = (bp: BrakePoints, width: number) => {
  return reduce((pre: object, key: string) => {
    return mergeDeepRight(pre, { [key]: bp[key] <= width });
  }, {})(keys(bp));
};

const useMediaFlags = (bp: BrakePoints, enable: boolean) => {
  const bpValeus = values(bp);

  const initLimitMax = (() => {
    const borderMax = or(last(bpValeus), 0);
    const width = getLayout().width;
    if (width >= borderMax) return borderMax;
    const limitMaxOn = find((v: number) => width <= v)(bpValeus);
    return or(limitMaxOn, 0);
  })();

  const [limitMax, setLimitMax] = useState(initLimitMax);
  const limitMaxIndex = findIndex(equals(limitMax))(bpValeus);

  useIsomorphicLayoutEffect(() => {
    if (enable) {
      const updateLayout = () => {
        const borderMax = or(last(bpValeus), 0);
        const width = getLayout().width;
        if (width >= borderMax) return;
        const limitMin = bpValeus[limitMaxIndex - 1];
        if (width >= limitMax) setLimitMax(bpValeus[limitMaxIndex + 1]);
        if (width < limitMin) setLimitMax(bpValeus[limitMaxIndex - 1]);
      };
      updateLayout();
      window.addEventListener('resize', updateLayout);
      return () => window.removeEventListener('resize', updateLayout);
    }
    return () => {};
  }, [limitMax, limitMaxIndex, bpValeus]);

  const mediaFlags = createMediaFlafs(bp, limitMax);
  return mediaFlags;
};

const createMediaQueries = (brakePoints: BrakePoints) => {
  return reduce((pre: object, key: string) => {
    return mergeDeepRight(pre, {
      [key]: `@media (min-width: ${brakePoints[key]}px)`,
    });
  }, {})(keys(brakePoints));
};

// INI CONFIG
export const getInitConfig = <T extends KnownInitGuide>(init: InitProps<T>) => {
  // EMPTY INIT
  const empty = {
    breakPoints: {},
    options: {
      initTheme: '',
      forceIrr: false,
      overlap: true,
      literal: false,
      styleSheets: 'simple',
      baseExtendedOn: false,
    },
    root: {},
    base: {
      colors: {},
      fontFamily: {},
    },
    theme: {
      name: '',
      tags: [],
      colors: {},
      fontFamily: {},
    },
    themes: [],
    scheme: {},
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

  // OPTIONS
  const options = mergeDeepRight(empty.options, init.options || {}) as InitGuide<T>['options'];
  // BREAKEPOINTS
  const breakPoints = (init.breakPoints || empty.breakPoints) as InitGuide<T>['breakPoints'];
  verifyScheme(breakPoints, Object, VERIFY.TY);
  verifyScheme(breakPoints, Number, VERIFY.VALUES_TY_IN_ARR);
  // DERIVED BREAKEPOINTS =>
  const stMode = options.styleSheets as ProcessStyles;
  const stOptions = { overlap: options.overlap, literal: options.literal } as facepaint.Options;
  // media quieris map
  const mq = createMediaQueries(breakPoints) as InitGuide<T>['helpers']['mq'];
  // media quieris with facepaint and css function helper
  const facepaintCss = (rule: CSS_Rule, options: facepaint.Options = stOptions) => {
    const format = map((point: string) => point)(values(mq) as string[]);
    const build = facepaint(format, options);
    return build(rule);
  }; // => todo add type.
  // simlple css
  const siCss = (rule: CSS_Rule) => {
    return rule;
  }; // => todo add type.
  // styles builder
  const styleSheets = (rules: CSS_Rules, mode = stMode, options = stOptions) => {
    const process = (() => {
      if (mode === 'facepaint') {
        const mqCssReady = curry(facepaintCss)(__, options);
        return mqCssReady;
      }
      return siCss;
    })();
    const result = reduce((pre: object, key: string) => {
      return mergeDeepRight(pre, { [key]: process(rules[key] as CSS_Rule) });
    }, {})(keys(rules) as string[]) as CSS_Rules;
    return result as CSS_Rules;
  }; // => todo add type.
  // ROOT
  const root = mergeDeepRight(empty.root, init.root || {});
  // BASE
  const base = mergeDeepRight(empty.base, init.base || {});
  verifyScheme(base, Object, VERIFY.TY);
  verifyScheme(base, empty.base, VERIFY.KEYS_IN_KEYS, true);
  verifyScheme(base.colors, String, VERIFY.VALUES_TY_IN_ARR, true);
  verifyScheme(base.fontFamily, String, VERIFY.VALUES_TY_IN_ARR, true);

  // THEMES
  const initThemes = init.themes || empty.themes;
  const themes = map((x: any) => {
    // scheme verifications
    forEach((rKey: keyof typeof scheme) => {
      const v = (() => {
        if (equals(rKey, 'name')) return VERIFY.KEY_IN_ARR;
        if (equals(rKey, 'tags')) return VERIFY.ARR_IN_ARR;
        return VERIFY.KEYS_EQ_KEYS;
      })();
      verifyScheme(x[rKey], scheme[rKey], v, true);
    })(keys(scheme));
    // others verifications
    verifyScheme(x.name, String, VERIFY.TY);
    verifyScheme(x.tags, String, VERIFY.VALUES_TY_IN_ARR, true);
    verifyScheme(x.colors, String, VERIFY.VALUES_TY_IN_ARR, true);
    verifyScheme(x.fontFamily, String, VERIFY.VALUES_TY_IN_ARR, true);
    return mergeDeepRight(base, x);
  })(initThemes) as InitGuide<T>['themes'];
  // DERIVED THEMES =>
  // init themeName
  const initThemeName = init?.options?.initTheme || init?.themes?.[0].name || empty?.options?.initTheme;
  // list of themes
  const themesNames = map(({ name }: KnownTheme) => name)(themes);
  verifyScheme(initThemeName, themesNames, VERIFY.KEY_IN_ARR);
  verifyScheme(themesNames, scheme.name, VERIFY.EQ, true);
  // active theme
  const theme = (find(({ name }: KnownTheme) => name === initThemeName)(themes) ||
    empty.theme) as InitGuide<T>['theme'];

  return {
    breakPoints,
    root,
    theme,
    themes,
    options,
    helpers: {
      mq,
      styleSheets,
    },
  } as InitGuide<T>;
};

// EXTENDS
const processExtends = <T extends KnownInitGuide, E extends KnownExtended>(
  guide: BaseGuide<T>,
  extended: InitExtend<E>,
) => {
  const ready = reduce((pre: object, key: string) => {
    let result;
    const rule = extended[key];
    if (is(Function, rule)) result = rule(guide);
    result = rule;
    return { ...pre, [key]: result };
  }, {} as Extended<E>)(keys(extended) as any) as Extended<E>;
  return ready;
};

const getExtended = <E extends KnownExtended>(baseExtendedOn = false, customExtended = {} as InitExtend<E>) => {
  if (baseExtendedOn) return mergeDeepRight(baseExtended, customExtended) as InitExtend<E>;
  return customExtended as InitExtend<E>;
};

// REDUCER
const reducer: Reducer = (data, [action, payload]) => {
  if (action === Actions.GUIDE) return payload;
  if (action === Actions.THEME)
    return {
      ...data,
      theme: find(({ name }: any) => equals(name, payload))(data.themes),
    };
  return data;
};

// PROVIDER
const getProvider = (forceIrr = false, BaseProvider: WrapFC) => {
  const StyleGuideProvider: WrapFC = forceIrr
    ? ({ children }) => (
        <ForceIRR>
          <BaseProvider>{children}</BaseProvider>
        </ForceIRR>
      )
    : BaseProvider;
  return StyleGuideProvider;
};

// OPTIONS
const getOptions = <T extends object>(baseOptions: T, newOptions: object) => {
  return mergeDeepRight(baseOptions, newOptions || {});
};

// MAIN
const createStyleGuide = <T extends KnownInitGuide, E extends KnownExtended>(
  config: InitProps<T>,
  customExtended = {} as InitExtend<E>,
) => {
  const initGuide: InitGuide<T> = getInitConfig(config);
  const {
    StyleGuideProvider: BaseProvider,
    useStyleGuideState,
    useStyleGuideUpdater,
  } = newContext({
    name: 'StyleGuide',
    initState: initGuide,
    reducer,
  } as const);

  const StyleGuideProvider: WrapFC = getProvider(initGuide.options.forceIrr, BaseProvider);
  const extended = getExtended(initGuide.options.baseExtendedOn, customExtended);

  // USE STG
  const useStyleGuide = (newOptions = {}) => {
    const initGuide = useStyleGuideState();
    const set = useStyleGuideUpdater();
    type Options = BaseGuide<T>['options'];
    const options: Options = getOptions(initGuide.options, newOptions);
    const mediaFlags = useMediaFlags(initGuide.breakPoints, options.mediaQrr);

    // not use merge but take full control join.
    const fullGuide = useMemo(() => {
      type Theme = BaseGuide<T>['themes'][number];
      // themes flags
      const themeFlags = reduce((pre: object, { name }: Theme) => {
        return mergeDeepRight(pre, { [name]: name === initGuide.theme.name });
      }, {})(initGuide.themes);
      // tags flags
      const tagsFlags = reduce((pre: object, { tags }: Theme) => {
        const inners = reduce((pre: object, tag: string) => {
          return mergeDeepRight(pre, { [tag]: includes(tag)(initGuide.theme.tags || []) });
        }, {})(tags || []);
        return mergeDeepRight(pre, inners);
      }, {})(initGuide.themes);
      // set theme
      const setTheme = (themeName: Theme['name']) => {
        set([Actions.THEME, themeName]);
      };
      // base
      const base = mergeDeepRight(initGuide, {
        state: { themeFlags, tagsFlags, mediaFlags },
        helpers: { setTheme },
      }) as unknown as BaseGuide<T>;
      // extended
      const full = { ...base, extended: processExtends(base, extended) };
      return full;
    }, [initGuide, mediaFlags, set]);

    return fullGuide as FullGuide<T, E>;
  };

  return {
    StyleGuideProvider,
    useStyleGuide,
    initGuide,
  };
};

export {
  // main
  ForceIRR,
  ForceCSR,
  createStyleGuide,
  createStyleGuide as default,
};
export type {
  // types
  CSS_Rule,
  CSS_Rules,
  KnownInitGuide,
  KnownTheme,
  KnownExtended,
  InitGuide,
  BaseGuide,
  InitExtend,
  Extended,
  FullGuide,
  BrakePoints,
  StyleSheets,
};
