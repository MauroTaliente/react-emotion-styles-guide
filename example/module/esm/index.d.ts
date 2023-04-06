import baseExtended from './helpers/extended';
import { ForceIRR, ForceCSR } from './helpers/componets';
import { addTag } from './helpers/utils';
import { InitGuide, BaseGuide, CSS_Rule, CSS_Rules, KnownInitGuide, KnownTheme, BrakePoints, WrapFC, InitProps, KnownExtended, InitExtend, Extended, FullGuide, StyleSheets } from './model';
export declare const getInitConfig: <const T extends KnownInitGuide>(init: InitProps<T>) => InitGuide<T>;
declare const createStyleGuide: <const T extends KnownInitGuide, const E extends KnownExtended>(config: InitProps<T>, customExtended?: InitExtend<E>) => {
    StyleGuideProvider: WrapFC;
    useStyleGuide: (newOptions?: {}) => FullGuide<T, E>;
    initGuide: InitGuide<T>;
};
export { addTag, ForceIRR, ForceCSR, baseExtended, createStyleGuide, createStyleGuide as default, };
export type { CSS_Rule, CSS_Rules, KnownInitGuide, KnownTheme, KnownExtended, InitGuide, BaseGuide, InitExtend, Extended, FullGuide, BrakePoints, StyleSheets, };
