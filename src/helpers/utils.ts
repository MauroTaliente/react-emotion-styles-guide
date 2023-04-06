import * as R from 'ramda';

type GetString<T> = T extends string ? T : string;

type ChangeKey<B, C, A> = `${GetString<B>}${GetString<C>}${GetString<A>}`;

// UTILS
const capitalized = <W extends string>(word: W) => `${word.charAt(0).toUpperCase()}${word.slice(1)}` as Capitalize<W>;

export const addTag = <T extends Record<string, any>, A extends string>(props: T, tag: A) => {
  type Build = { [K in keyof T as K extends string ? ChangeKey<A, Capitalize<K>, ''> : K]: T[K] };
  const joinTag = (pre: any, key: string) => ({ ...pre, [`${tag}${capitalized(key)}`]: props[key] });
  const build = R.reduce(joinTag, {})(R.keys(props) as string[]) as Build;
  return build;
};
