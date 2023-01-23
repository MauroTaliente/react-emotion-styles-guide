import React, { useMemo } from 'react';
import * as R from 'ramda';
import facepaint from 'facepaint';

// import defaultConfig from './model';
import newContext from './helpers/context';

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
} from './model';

export const getInitConfig = <T,>({
  themes: initTemes = {},
  activeTheme = '',
  baseTheme = '',
  breakPoints,
  ...root
}: InitGuide<T>): BaseGuide<T> => {
  // gets props
  const themesNames = Object.keys(initTemes);
 
  const themesFlags = themesNames.reduce((pre: any, name) => {
    return { ...pre, [name]: activeTheme === name };
  }, {});
 
  const base = (() => {
    if (baseTheme in initTemes) return initTemes[activeTheme];
    if (themesNames.length) return initTemes[themesNames[0]];
    return {};
  })();

  const themes = themesNames.reduce((pre: any, name) => {
    return { ...pre, [name]: {
      ...emptyTheme, name,
      ...R.mergeDeepLeft(initTemes[name], base),
    } };
  }, {});

  const theme = (() => {
    if (activeTheme in themes) return themes[activeTheme];
    if (themesNames.length) return themes[themesNames[0]];
    return {};
  })();

  // res root and others themes
  return {
    root,
    theme,
    themes,
    themesFlags,
    breakPoints,
  } as any;
};

const reducer: Reducer = (data, [action, payload]) => {
  if (action === Actions.GUIDE)
    return payload;
  if (action === Actions.THEME)
    return {...data, theme: data.themes[payload]};
  return data;
};

const createStyleGuide = <T,>(config: InitGuide<T>) => { 
  const initGuide = getInitConfig(config);

  const {
    StyleGuideProvider,
    useStyleGuideState,
    useStyleGuideUpdater,
  } = newContext({
    name: 'StyleGuide',
    initState: initGuide,
    reducer,
  } as const);

  const useStyleGuide = () => {
    const base = useStyleGuideState();
    const set = useStyleGuideUpdater();

    const helpers = useMemo(() => {
      const setTheme = (themeName: keyof typeof base.themes) => {
        set([Actions.THEME, themeName]);
      };
  
      const activeTheme = (data: any) => {
        return data[base.theme.name] || data?.default;
      }
  
      const createStyle = (rule: CSS_Rule) => {
        const format = base.breakPoints.map((value) => (
          `@media (min-width: ${value}px)`
        ));
        const calc = facepaint(format);
        const create = calc(rule);
        return create as CSS_Rule_Facepaint;
      };
  
      const createStyles = (rules: CSS_Rules) => {
        const base = Object.entries(rules) as Entries<T>;
        const create = base.reduce((pre: any, [key, value]) => {
          return { ...pre, [key]: createStyle(value as CSS_Rule) };
        }, {});
        return create as CSS_Rules_Facepaint;
      };
  
      return {
        createStyles, createStyle, actions: {
          setTheme, activeTheme,
        },
      };
    }, [base, set]);

    return {
      ...base,
      ...helpers,
    };
  }

  return {
    StyleGuideProvider,
    useStyleGuide,
  };
}

export default createStyleGuide;
