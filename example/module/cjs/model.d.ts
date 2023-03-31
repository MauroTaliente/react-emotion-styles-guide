import type * as CSS from 'csstype';
import facepaint from 'facepaint';
import { FC, ReactElement } from 'react';
export declare enum Actions {
    'THEME' = 0,
    'GUIDE' = 1
}
type PartialDeep<T> = T extends string | number | bigint | boolean | null | undefined | symbol | Date ? T | undefined : T extends Array<infer ArrayType> ? Array<PartialDeep<ArrayType>> : T extends ReadonlyArray<infer ArrayType> ? ReadonlyArray<ArrayType> : T extends Set<infer SetType> ? Set<PartialDeep<SetType>> : T extends ReadonlySet<infer SetType> ? ReadonlySet<SetType> : T extends Map<infer KeyType, infer ValueType> ? Map<PartialDeep<KeyType>, PartialDeep<ValueType>> : T extends ReadonlyMap<infer KeyType, infer ValueType> ? ReadonlyMap<PartialDeep<KeyType>, PartialDeep<ValueType>> : {
    [K in keyof T]?: PartialDeep<T[K]>;
};
export type Reducer = (p1: any, p2: [Actions, any]) => any;
export type Flags<T> = {
    [Property in keyof T]: boolean;
};
export type WrapFC = FC<{
    children: ReactElement;
}>;
export type Entries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T][];
export type CSS_Properties = {
    [K in keyof CSS.Properties]: CSS.Properties[K] | CSS.Properties[K][];
};
export type CSS_Rule = CSS_Properties | CSS_Properties[];
export type CSS_Rule_Media = CSS_Rule[];
export type CSS_Rules = Record<string, CSS_Rule>;
export type CSS_Rules_Media = Record<string, CSS_Rule_Media>;
export type Colors = Record<string, string>;
export type Fonts = Record<string, string>;
export type BrakePoints = Record<string, number>;
export type SimpleProcessCss = (r: CSS_Rule) => CSS_Rule;
export type MediaProcessCss = (r: CSS_Rule, o?: facepaint.Options) => facepaint.DynamicStyle;
export type ProcessStyles = 'simple' | 'facepaint';
export type CSS_Media<T> = Record<keyof T, T[keyof T][]>;
export type StyleSheets = <P extends ProcessStyles, R extends CSS_Rules>(rules: R, processStyles?: P, options?: facepaint.Options) => R;
export type ExtendedTheme = {
    [K: string]: Record<string, string | number> | any;
};
export type KnownTheme = {
    name: string;
    colors: Colors;
    fontFamily: Fonts;
    tags: readonly string[];
} & ExtendedTheme;
export type KnownBase = {
    colors: Colors;
    fontFamily: Fonts;
} & ExtendedTheme;
export type BaseInitGuide = {
    breakPoints: BrakePoints;
    options: {
        forceIrr: boolean;
        mediaQrr: boolean;
        mode: ProcessStyles;
        literal: boolean;
        overlap: boolean;
        initTheme: string;
    };
    base: KnownBase;
    root: ExtendedTheme;
    scheme: {
        tags: readonly string[];
        colors: readonly string[];
        fontFamily: readonly string[];
    };
    themes: readonly KnownTheme[];
};
export type KnownInitGuide = PartialDeep<BaseInitGuide>;
export type InitGuide<T> = T extends KnownInitGuide ? T : KnownInitGuide;
export type KnownBuildGuide = {
    breakPoints: BrakePoints;
    root: ExtendedTheme;
    theme: KnownTheme;
    themes: readonly KnownTheme[];
    atoms: CSS_Rules | CSS_Rules_Media;
    options: {
        forceIrr: boolean;
        mediaQrr: boolean;
        mode: ProcessStyles;
        literal: boolean;
        overlap: boolean;
    };
    helpers: {
        mq: Record<number, string>;
        facepaintCss: MediaProcessCss;
        styleSheets: StyleSheets;
        setTheme: (n: string) => void;
    };
    state: {
        mediaFlags: Record<string, boolean>;
        themeFlags: Record<string, boolean>;
        tagsFlags: Record<string, boolean>;
    };
};
export type BaseGuide<T> = T extends BaseInitGuide ? KnownBuildGuide & {
    breakPoints: T['breakPoints'];
    options: T['options'];
    root: T['root'];
    theme: T['themes'][number];
    themes: T['themes'];
    helpers: {
        setTheme: (n: T['themes'][number]['name']) => void;
    };
    state: {
        mediaFlags: Record<keyof T['breakPoints'], boolean>;
        themeFlags: Record<T['themes'][number]['name'], boolean>;
        tagsFlags: Record<T['themes'][number]['tags'][number], boolean>;
    };
} : KnownBuildGuide;
export declare const emptyTheme: KnownTheme;
export declare const emptyConfig: {
    breakPoints: {};
    initThemeName: string;
    base: {};
    themes: never[];
    scheme: {};
    theme: KnownTheme;
};
export {};
