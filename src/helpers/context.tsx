import React, {
  createContext,
  useReducer,
  useContext,
  useCallback,
  ReactNode,
  FC,
} from 'react';


type O = Record<string, any>;

type ValueOf<T> = T[keyof T];

type VerifyInfer<T, Y> = T extends Y ? T : Y;

type InferGeneric<T> = T extends O ? T : O;

type GetString<T> = T extends string ? T : string;

type ChangeKey<B, C, A> = `${GetString<B>}${GetString<C>}${GetString<A>}`

type SecondProp<F> = F extends (_: any, n: infer A) => any ? A : never;

type KnownParamsContext = {
  name: string;
  initState: any;
  reducer: (_: any, d: any) => any;
};

type RegProvider = { children?: ReactNode | ReactNode[], value?: any };

type MapProvider<T extends O> = {
  [Key in T['name'] as ChangeKey<'', Capitalize<Key>, 'Provider'>]: FC<RegProvider>;
};
type MapState<T extends O> = {
  [Key in T['name'] as ChangeKey<'use', Capitalize<Key>, 'State'>]: () => T['initState'];
};
type MapUpdater<T extends O> = {
  [Key in T['name'] as ChangeKey<'use', Capitalize<Key>, 'Updater'>]: () =>(n: SecondProp< T['reducer']>) => any;
};

export type Mapper<T> =
MapProvider<PraramsContext<T>>
& MapState<PraramsContext<T>>
& MapUpdater<PraramsContext<T>>;

export type PraramsContext<T> = T extends KnownParamsContext ? T : KnownParamsContext;
export type ReturnContext<T> = T extends KnownParamsContext ? Mapper<PraramsContext<T>> : KnownParamsContext;

const capitalized = (s: string) => s ? s[0].toUpperCase() + s.slice(1) : s;

const newContext = <T,>({
  name = '',
  initState,
  reducer = (_: any, d: any) => d,
}: PraramsContext<T>): ReturnContext<T> => {
  name = capitalized(name);
  const StateContext = createContext(initState);
  const UpdaterContext = createContext((s: any) => s);

  const Provider: FC<RegProvider> = ({ children = null, value = null }) => {
    const [store, setStore] = useReducer(reducer, value || initState);
    return (
      <StateContext.Provider value={store}>
        <UpdaterContext.Provider value={setStore}>
          {children}
        </UpdaterContext.Provider>
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

  return context as any;
};

export default newContext;
