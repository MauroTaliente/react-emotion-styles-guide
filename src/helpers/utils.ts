import * as R from 'ramda';

type GetString<T> = T extends string ? T : string;

type ChangeKey<B, C, A> = `${GetString<B>}${GetString<C>}${GetString<A>}`;

// UTILS
export const addTag = <T extends { [K: string]: any }, A extends string>(props: T, tag: A) => {
  type Keys = keyof T;
  type Build = { [Key in Keys extends string ? Keys : string as ChangeKey<A, Capitalize<Key>, ''>]: T[Keys] };
  const joinTag = (pre: any, key: Keys) => ({ ...pre, [`${tag}${key as string}`]: props[key] });
  const build: Build = R.reduce(joinTag, {})(R.keys(props));
  return build;
};
