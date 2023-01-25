import * as R from 'ramda';
import facepaint from "facepaint";

import { CSS_Rule, CSS_Rule_Facepaint, CSS_Rules, CSS_Rules_Facepaint, Entries } from "./model";

type P0 = {
  name: string;
  colors: any;
  fonts: any;
  base: any,
};

type P1<T> = T extends P0 ? T : never;
type P2<T> = T extends P0 ? {
  name: T['name'];
  colors: T['colors'] & T['base']['colors'];
  fonts: T['fonts'] & T['base']['fonts'];
  base: any;
} : never;

type R0 = Record<string, Record<string, string>>;
type R1<A> = A extends R0 ? Record<keyof A, CSS_Rule> : A;
type F1<T, A> = (t: P2<T>) => CSS_Rules;

const createStyle = (rule: CSS_Rule, breakPoints: number[]) => {
  const format = breakPoints.map((value) => (
    `@media (min-width: ${value}px)`
  ));
  const calc = facepaint(format);
  const create = calc(rule);
  return create as CSS_Rule_Facepaint;
};

const createStyles = (rules: CSS_Rules, breakPoints: number[]) => {
  const base = Object.entries(rules) as Entries<any>;
  const create = base.reduce((pre: any, [key, value]) => {
    return { ...pre, [key]: createStyle(value as CSS_Rule, breakPoints) };
  }, {});
  return create as CSS_Rules_Facepaint;
};

const themeBuilder = <T,>(props: P1<T>) => {
  // const { ...conf } = props;
  const initTheme = {...props};
  const merges = R.mergeDeepLeft(initTheme, props.base) as P1<T>;

  console.log(merges);
  
  const builder = <A,>(cb: F1<T, A>) => {
    const rules = cb(merges as any);
    const atoms = createStyles(rules as any, props.base.breakPoints);
    const theme = { ...merges, atoms: R.mergeDeepLeft(atoms, props.base.atoms || {}) };
    return theme;
  };
  return builder;
};

export { themeBuilder };