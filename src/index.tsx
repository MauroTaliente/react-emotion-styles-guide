import * as R from 'ramda';
import facepaint from 'facepaint';

import { useCallback, useEffect, useState } from 'react';

import StyleGuideProvider from './StyleGuideProvider';
import { useStylesState, useStylesUpdater } from './context';
import DEFAUT_CONFIG, { Root, Theme, Themes, SetTheme, Css, Scss, Guide } from './model';

// helpers
const cleanObj = R.reject(R.anyPass([R.isEmpty, R.isNil]));
const isEmpty = R.isEmpty;
const merge = R.mergeDeepRight;

const formatConfigData = ({ payload, base = {}, name }: any): Root | Theme => {
  const breakPoints = payload.breakPoints || base.breakPoints;
  const colors = merge(base?.colors || {}, payload?.colors || {});
  const fonts = merge(base?.fonts || {}, payload?.fonts || {});
  const texts = merge(base?.texts || {}, payload?.texts || {});
  const atoms = merge(base?.atoms || {}, payload?.atoms || {});

  const format = cleanObj({
    breakPoints,
    colors,
    fonts,
    texts,
    atoms,
    name,
  });
  return format;
};

const formtaThemesData = (payload: any): Themes => {
  const themes: Themes = Object.entries(payload.themes).reduce(
    (pre, [name, data]) => ({
      ...pre,
      [name]: formatConfigData({
        name,
        payload: data,
        base: payload.themes?.[payload.baseTheme],
      }),
    }),
    {},
  );

  return themes;
};

const getActiveTheme = ({ root, themes }: any): Theme | null => {
  const themeNames = Object.keys(themes);
  if (root.initTheme && themeNames.length && !themes[root.initTheme]) {
    throw new Error('The initTheme is not available.');
  }
  if (!themeNames.length) return null;
  if (themes[root.initTheme]) return themes[root.initTheme];
  return themes[themeNames[0]];
};

const getRootConfig = (payload: any) => {
  const root = formatConfigData({ payload, base: DEFAUT_CONFIG });
  const themes = formtaThemesData(payload);
  const theme = getActiveTheme({ root, themes });
  return { root, theme, themes };
};

const useCreateStylesGuide = (payload: any): boolean => {
  const stylesGuide: Guide = useStylesState();
  const updateGuide = useStylesUpdater();
  const [themes, setThemes] = useState<Themes>({});
  const [ready, setReady] = useState<boolean>(false);

  // FUNCS
  const setTheme: SetTheme = useCallback(
    (name: string) => {
      updateGuide(['SET_THEME', themes[name]]);
    },
    [themes, updateGuide],
  );

  const css: Css = useCallback(
    (rule) => {
      const breakPoints = stylesGuide.root.breakPoints || [];
      const format = breakPoints.map((value) => `@media (min-width: ${value}px)`);
      const calc = facepaint(format);
      const create = calc(rule);
      return create;
    },
    [stylesGuide.root],
  );

  const scss: Scss = useCallback(
    (rules) => {
      const base = Object.entries(rules);
      const create = base.reduce((pre, [key, value]) => {
        return { ...pre, [key]: css(value) };
      }, {});
      return create;
    },
    [css],
  );

  // AUTO
  useEffect(() => {
    const { root, theme, themes } = getRootConfig(payload);
    updateGuide(['SET_CONFIG', { root, theme }]);
    setThemes(themes);
    return () => {};
  }, []);

  useEffect(() => {
    updateGuide(['PUT_CONFIG', { setTheme, css, scss }]);
    setReady(!isEmpty(stylesGuide));
    return () => {};
  }, [stylesGuide.root]);

  return ready;
};

const useStyleGuide: () => Guide = useStylesState;

export { StyleGuideProvider, useCreateStylesGuide, useStyleGuide };
