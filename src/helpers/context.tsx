import React, { createContext, useReducer, useContext, useCallback, FC } from 'react';

// type ValueOf<T> = T[keyof T];

// type VerifyInfer<T, Y> = T extends Y ? T : Y;

// type InferGeneric<T> = T extends O ? T : O;

type GetString<T> = T extends string ? T : string;

type ChangeKey<B, C, A> = `${GetString<B>}${GetString<C>}${GetString<A>}`;

type KnownParamsContext = {
  name: string;
  initState: any;
  reducer: (_: any, d: any) => any;
};

type Mutate<F> = F extends (_: any, n: infer B) => any ? (n: B) => void : never;

type MapProvider<T extends KnownParamsContext> = {
  [Key in T['name'] as ChangeKey<'', Capitalize<Key>, 'Provider'>]: React.FC<any>;
};
type MapState<T extends KnownParamsContext> = {
  [Key in T['name'] as ChangeKey<'use', Capitalize<Key>, 'State'>]: () => T['initState'];
};
type MapUpdater<T extends KnownParamsContext> = {
  [Key in T['name'] as ChangeKey<'use', Capitalize<Key>, 'Updater'>]: () => Mutate<T['reducer']>;
};

type Mapper<T extends KnownParamsContext> = MapProvider<T> & MapState<T> & MapUpdater<T>;

type ReturnContext<T extends KnownParamsContext> = Mapper<T>;

const capitalized = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

const newContext = <T extends KnownParamsContext>({
  name = '',
  initState,
  reducer = (_: any, d: any) => d,
}: T): ReturnContext<T> => {
  name = capitalized(name);
  const StateContext = createContext(initState);
  const UpdaterContext = createContext((s: any) => s);

  const Provider: FC<any> = ({ children = null }) => {
    const [store, setStore] = useReducer(reducer, initState);
    return (
      <StateContext.Provider value={store}>
        <UpdaterContext.Provider value={setStore}>{children}</UpdaterContext.Provider>
      </StateContext.Provider>
    );
  };

  const useState = () => {
    const storeState = useContext(StateContext);
    if (typeof StateContext === 'undefined') {
      throw new Error(`${name}.useState must be used within a StoreProvider`);
    }
    return storeState;
  };

  const useUpdater = () => {
    const setStore = useContext(UpdaterContext);
    if (typeof setStore === 'undefined') {
      throw new Error(`${name}.useUpdater must be used within a StoreProvider`);
    }
    const updater = useCallback(setStore, [setStore]);
    return updater;
  };

  const context = {
    [`${name}Provider`]: Provider,
    [`use${name}State`]: useState,
    [`use${name}Updater`]: useUpdater,
  };

  return context as ReturnContext<T>;
};

export default newContext;
