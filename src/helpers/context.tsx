import React, { createContext, useReducer, useContext, useCallback, ReactNode, FC } from 'react';

interface NewContextReturn<P> {
  (props: P): {
    [Key: string]: any;
  };
}
interface ContextProps {
  name?: string;
  initState: any;
  reducer?: (p1: any, p2: any) => unknown;
}

interface ProviderProps {
  children?: ReactNode[] | ReactNode;
}

type NC = NewContextReturn<ContextProps>;

const newContext: NC = ({ name = 'Context', reducer = (_, d) => d, initState }) => {
  const StateContext = createContext<any>(undefined);
  const UpdaterContext = createContext<any>(undefined);
  // STORE
  const Provider: FC<ProviderProps> = ({ children = null }) => {
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

  return {
    [`${name}Provider`]: Provider,
    [`use${name}State`]: useState,
    [`use${name}Updater`]: useUpdater,
  };
};

export default newContext;
