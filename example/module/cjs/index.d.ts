import { ForceIRR, ForceCSR } from './helpers/componets';
import { InitGuide, BaseGuide, CSS_Rule, CSS_Rules, KnownInitGuide, KnownTheme, BrakePoints, WrapFC } from './model';
export declare const getInitConfig: <T extends {
    breakPoints?: {
        [x: string]: number | undefined;
    } | undefined;
    options?: {
        forceIrr?: boolean | undefined;
        mediaQrr?: boolean | undefined;
        mode?: "simple" | "facepaint" | undefined;
        literal?: boolean | undefined;
        overlap?: boolean | undefined;
        initTheme?: string | undefined;
    } | undefined;
    base?: {
        [x: string]: any;
        colors?: {
            [x: string]: string | undefined;
        } | undefined;
        fontFamily?: {
            [x: string]: string | undefined;
        } | undefined;
    } | undefined;
    root?: {
        [x: string]: any;
    } | undefined;
    scheme?: {
        tags?: readonly string[] | undefined;
        colors?: readonly string[] | undefined;
        fontFamily?: readonly string[] | undefined;
    } | undefined;
    themes?: readonly KnownTheme[] | undefined;
}>(init: InitGuide<T>) => BaseGuide<T>;
declare const createStyleGuide: <T extends {
    breakPoints?: {
        [x: string]: number | undefined;
    } | undefined;
    options?: {
        forceIrr?: boolean | undefined;
        mediaQrr?: boolean | undefined;
        mode?: "simple" | "facepaint" | undefined;
        literal?: boolean | undefined;
        overlap?: boolean | undefined;
        initTheme?: string | undefined;
    } | undefined;
    base?: {
        [x: string]: any;
        colors?: {
            [x: string]: string | undefined;
        } | undefined;
        fontFamily?: {
            [x: string]: string | undefined;
        } | undefined;
    } | undefined;
    root?: {
        [x: string]: any;
    } | undefined;
    scheme?: {
        tags?: readonly string[] | undefined;
        colors?: readonly string[] | undefined;
        fontFamily?: readonly string[] | undefined;
    } | undefined;
    themes?: readonly KnownTheme[] | undefined;
}>(config: InitGuide<T>) => {
    StyleGuideProvider: WrapFC;
    useStyleGuide: (newOptions: BaseGuide<T>["options"]) => BaseGuide<T>;
};
export { ForceIRR, ForceCSR, createStyleGuide, createStyleGuide as default, };
export type { CSS_Rule, CSS_Rules, KnownInitGuide, KnownTheme, BrakePoints, };
