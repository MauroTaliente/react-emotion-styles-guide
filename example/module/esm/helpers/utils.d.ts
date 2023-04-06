type GetString<T> = T extends string ? T : string;
export declare const addTag: <T extends Record<string, any>, A extends string>(props: T, tag: A) => { [K in keyof T as K extends string ? `${GetString<A>}${GetString<Capitalize<K>>}` : K]: T[K]; };
export {};
