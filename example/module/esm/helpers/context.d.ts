import React from 'react';
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
declare const newContext: <T extends KnownParamsContext>({ name, initState, reducer, }: T) => ReturnContext<T>;
export default newContext;
