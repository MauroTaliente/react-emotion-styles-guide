import { ForceIRR, ForceCSR } from './helpers/componets';
import { InitGuide, BaseGuide, CSS_Rule, CSS_Rules, KnownInitGuide, KnownTheme, BrakePoints, WrapFC, InitProps, KnownExtended, InitExtend, Extended, FullGuide, StyleSheets } from './model';
export declare const getInitConfig: <T extends KnownInitGuide>(init: InitProps<T>) => InitGuide<T>;
declare const createStyleGuide: <T extends KnownInitGuide, E extends KnownExtended>(config: InitProps<T>, customExtended?: InitExtend<E>) => {
    StyleGuideProvider: WrapFC;
    useStyleGuide: (newOptions?: {}) => FullGuide<T, E>;
    initGuide: InitGuide<T>;
};
export { ForceIRR, ForceCSR, createStyleGuide, createStyleGuide as default, };
export type { CSS_Rule, CSS_Rules, KnownInitGuide, KnownTheme, KnownExtended, InitGuide, BaseGuide, InitExtend, Extended, FullGuide, BrakePoints, StyleSheets, };
