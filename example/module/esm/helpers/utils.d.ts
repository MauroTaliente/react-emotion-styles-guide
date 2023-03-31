type GetString<T> = T extends string ? T : string;
export declare const addTag: <T extends {
    [K: string]: any;
}, A extends string>(props: T, tag: A) => { [Key in keyof T extends string ? keyof T : string as `${GetString<A>}${GetString<Capitalize<Key>>}`]: T[keyof T]; };
export {};
