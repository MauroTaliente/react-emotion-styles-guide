import { __assign } from "tslib";
// SI
import React, { useMemo, useState } from 'react';
// utils
import * as R from 'ramda';
// styles
import facepaint from 'facepaint';
// local utils
import newContext from './helpers/context';
import baseExtended from './helpers/extended';
import { ForceIRR, ForceCSR } from './helpers/componets';
import { addTag } from './helpers/utils';
import { Actions, } from './model';
var 
// empty,
toString = R.toString, equals = R.equals, map = R.map, forEach = R.forEach, whereEq = R.whereEq, keys = R.keys, values = R.values, reduce = R.reduce, mergeDeepRight = R.mergeDeepRight, includes = R.includes, all = R.all, type = R.type, is = R.is, intersection = R.intersection, find = R.find, findIndex = R.findIndex, last = R.last, curry = R.curry, or = R.or, __ = R.__;
var IS_SSR = typeof document === 'undefined';
if (IS_SSR) {
    React.useLayoutEffect = React.useEffect;
}
var useIsomorphicLayoutEffect = React.useLayoutEffect;
var PRINT_TYPE;
(function (PRINT_TYPE) {
    PRINT_TYPE[PRINT_TYPE["ERROR"] = 0] = "ERROR";
    PRINT_TYPE[PRINT_TYPE["ALERT"] = 1] = "ALERT";
    PRINT_TYPE[PRINT_TYPE["LOG"] = 2] = "LOG";
})(PRINT_TYPE || (PRINT_TYPE = {}));
var VERIFY;
(function (VERIFY) {
    VERIFY[VERIFY["TY"] = 0] = "TY";
    VERIFY[VERIFY["TY_IN"] = 1] = "TY_IN";
    VERIFY[VERIFY["VALUES_TY_IN_ARR"] = 2] = "VALUES_TY_IN_ARR";
    VERIFY[VERIFY["KEYS_TY_IN_ARR"] = 3] = "KEYS_TY_IN_ARR";
    VERIFY[VERIFY["EQ"] = 4] = "EQ";
    VERIFY[VERIFY["KEYS_EQ_KEYS"] = 5] = "KEYS_EQ_KEYS";
    VERIFY[VERIFY["OBJ_IN_OBJ"] = 6] = "OBJ_IN_OBJ";
    VERIFY[VERIFY["WHERE_IN_ARR"] = 7] = "WHERE_IN_ARR";
    VERIFY[VERIFY["ARR_IN_ARR"] = 8] = "ARR_IN_ARR";
    VERIFY[VERIFY["KEYS_IN_KEYS"] = 9] = "KEYS_IN_KEYS";
    VERIFY[VERIFY["KEY_IN_ARR"] = 10] = "KEY_IN_ARR";
})(VERIFY || (VERIFY = {}));
// VRIFY SCHEME AND FORM
var printVerifyMesage = function (printType, v, expected, received) {
    // create message by v:
    var mesage = 'Ups missing error rule.';
    if (v === VERIFY.TY)
        mesage = "This element: ".concat(toString(received), " does not instead of ").concat(toString(type(expected())), ".");
    if (v === VERIFY.TY_IN || v === VERIFY.VALUES_TY_IN_ARR || v === VERIFY.KEYS_TY_IN_ARR)
        mesage = "This element: ".concat(toString(received), " does not contain only ").concat(toString(type(expected())), "'.");
    if (v === VERIFY.EQ || v === VERIFY.KEYS_EQ_KEYS)
        mesage = "This element: ".concat(toString(received), " does not match to schema: ").concat(toString(expected), ".");
    if (v === VERIFY.OBJ_IN_OBJ || v === VERIFY.KEYS_IN_KEYS || v === VERIFY.KEY_IN_ARR || v === VERIFY.ARR_IN_ARR)
        mesage = "This element: ".concat(toString(received), " is not included in the scheme: ").concat(toString(expected), ".");
    // print rules:
    if (printType === PRINT_TYPE.ERROR)
        throw new Error(mesage);
    if (printType === PRINT_TYPE.ALERT)
        return console.error(mesage);
    return console.log(mesage);
};
var verifyScheme = function (received, expected, v, emptyMode, printType) {
    if (emptyMode === void 0) { emptyMode = false; }
    if (printType === void 0) { printType = PRINT_TYPE.ALERT; }
    if (emptyMode && (!received || !expected))
        return true;
    // console.log({ received, expected, v });
    var pass = true;
    if (v === VERIFY.TY)
        pass = is(expected, received);
    if (v === VERIFY.TY_IN)
        pass = all(is(expected))(received);
    if (v === VERIFY.VALUES_TY_IN_ARR)
        pass = all(is(expected))(values(received));
    if (v === VERIFY.KEYS_TY_IN_ARR)
        pass = all(is(expected))(keys(received));
    if (v === VERIFY.EQ)
        pass = equals(expected, received);
    if (v === VERIFY.OBJ_IN_OBJ)
        pass = whereEq(expected)(received);
    if (v === VERIFY.WHERE_IN_ARR)
        pass = all(expected)(received);
    if (v === VERIFY.KEYS_EQ_KEYS)
        pass = equals(expected, keys(received));
    if (v === VERIFY.KEYS_IN_KEYS)
        pass = equals(intersection(keys(expected), keys(received)), keys(received));
    if (v === VERIFY.ARR_IN_ARR)
        pass = equals(intersection(expected, received), received);
    if (v === VERIFY.KEY_IN_ARR)
        pass = includes(received)(expected);
    if (!pass)
        printVerifyMesage(printType, v, expected, received);
    // console.log(pass);
    return pass;
};
// SUPPORT FNS
var getLayout = function () { return (IS_SSR ? { width: 0, height: 0 } : { width: window.innerWidth, height: window.innerHeight }); };
// export useRefreshLayot posible include in next versions.
// const useRefreshLayot = () => {
//   const [layout, setLayout] = useState(getLayout());
//   const updateLayout = () => setLayout(getLayout());
//   useIsomorphicLayoutEffect(() => {
//     updateLayout();
//     window.addEventListener('resize', updateLayout);
//     return () => window.removeEventListener('resize', updateLayout);
//   }, []);
//   return layout;
// };
var createMediaFlafs = function (bp, width) {
    return reduce(function (pre, key) {
        var _a;
        return mergeDeepRight(pre, (_a = {}, _a[key] = bp[key] <= width, _a));
    }, {})(keys(bp));
};
var useMediaFlags = function (bp, enable) {
    var bpValeus = values(bp);
    var initLimitMax = (function () {
        var borderMax = or(last(bpValeus), 0);
        var width = getLayout().width;
        if (width >= borderMax)
            return borderMax;
        var limitMaxOn = find(function (v) { return width <= v; })(bpValeus);
        return or(limitMaxOn, 0);
    })();
    var _a = useState(initLimitMax), limitMax = _a[0], setLimitMax = _a[1];
    var limitMaxIndex = findIndex(equals(limitMax))(bpValeus);
    useIsomorphicLayoutEffect(function () {
        if (enable) {
            var updateLayout_1 = function () {
                var borderMax = or(last(bpValeus), 0);
                var width = getLayout().width;
                if (width >= borderMax)
                    return;
                var limitMin = bpValeus[limitMaxIndex - 1];
                if (width >= limitMax)
                    setLimitMax(bpValeus[limitMaxIndex + 1]);
                if (width < limitMin)
                    setLimitMax(bpValeus[limitMaxIndex - 1]);
            };
            updateLayout_1();
            window.addEventListener('resize', updateLayout_1);
            return function () { return window.removeEventListener('resize', updateLayout_1); };
        }
        return function () { };
    }, [limitMax, limitMaxIndex, bpValeus]);
    var mediaFlags = createMediaFlafs(bp, limitMax);
    return mediaFlags;
};
var createMediaQueries = function (brakePoints) {
    return reduce(function (pre, key) {
        var _a;
        return mergeDeepRight(pre, (_a = {},
            _a[key] = "@media (min-width: ".concat(brakePoints[key], "px)"),
            _a));
    }, {})(keys(brakePoints));
};
// INI CONFIG
export var getInitConfig = function (init) {
    var _a, _b, _c;
    // EMPTY INIT
    var empty = {
        breakPoints: {},
        options: {
            initTheme: '',
            forceIrr: false,
            overlap: true,
            literal: false,
            styleSheets: 'simple',
            baseExtendedOn: false,
        },
        root: {},
        base: {
            colors: {},
            fontFamily: {},
        },
        theme: {
            name: '',
            tags: [],
            colors: {},
            fontFamily: {},
        },
        themes: [],
        scheme: {},
    };
    // SCHEME
    var emptyScheme = {
        name: null,
        tags: null,
        colors: null,
        fontFamily: null,
    };
    var baseScheme = init.scheme || empty.scheme;
    verifyScheme(baseScheme, Object, VERIFY.TY, true);
    var scheme = mergeDeepRight(emptyScheme, baseScheme);
    verifyScheme(scheme, emptyScheme, VERIFY.KEYS_IN_KEYS);
    // OPTIONS
    var options = mergeDeepRight(empty.options, init.options || {});
    // BREAKEPOINTS
    var breakPoints = (init.breakPoints || empty.breakPoints);
    verifyScheme(breakPoints, Object, VERIFY.TY);
    verifyScheme(breakPoints, Number, VERIFY.VALUES_TY_IN_ARR);
    // DERIVED BREAKEPOINTS =>
    var stMode = options.styleSheets;
    var stOptions = { overlap: options.overlap, literal: options.literal };
    // media quieris map
    var mq = createMediaQueries(breakPoints);
    // media quieris with facepaint and css function helper
    var facepaintCss = function (rule, options) {
        if (options === void 0) { options = stOptions; }
        var format = map(function (point) { return point; })(values(mq));
        var build = facepaint(format, options);
        return build(rule);
    }; // => todo add type.
    // simlple css
    var siCss = function (rule) {
        return rule;
    }; // => todo add type.
    // styles builder
    var styleSheets = function (rules, mode, options) {
        if (mode === void 0) { mode = stMode; }
        if (options === void 0) { options = stOptions; }
        var process = (function () {
            if (mode === 'facepaint') {
                var mqCssReady = curry(facepaintCss)(__, options);
                return mqCssReady;
            }
            return siCss;
        })();
        var result = reduce(function (pre, key) {
            var _a;
            return mergeDeepRight(pre, (_a = {}, _a[key] = process(rules[key]), _a));
        }, {})(keys(rules));
        return result;
    }; // => todo add type.
    // ROOT
    var root = mergeDeepRight(empty.root, init.root || {});
    // BASE
    var base = mergeDeepRight(empty.base, init.base || {});
    verifyScheme(base, Object, VERIFY.TY);
    verifyScheme(empty.base, base, VERIFY.KEYS_IN_KEYS, true);
    verifyScheme(base.colors, String, VERIFY.VALUES_TY_IN_ARR, true);
    verifyScheme(base.fontFamily, String, VERIFY.VALUES_TY_IN_ARR, true);
    // THEMES
    var initThemes = init.themes || empty.themes;
    var themes = map(function (x) {
        // scheme verifications
        forEach(function (rKey) {
            var v = (function () {
                if (equals(rKey, 'name'))
                    return VERIFY.KEY_IN_ARR;
                if (equals(rKey, 'tags'))
                    return VERIFY.ARR_IN_ARR;
                return VERIFY.KEYS_EQ_KEYS;
            })();
            verifyScheme(x[rKey], scheme[rKey], v, true);
        })(keys(scheme));
        // others verifications
        verifyScheme(x.name, String, VERIFY.TY);
        verifyScheme(x.tags, String, VERIFY.VALUES_TY_IN_ARR, true);
        verifyScheme(x.colors, String, VERIFY.VALUES_TY_IN_ARR, true);
        verifyScheme(x.fontFamily, String, VERIFY.VALUES_TY_IN_ARR, true);
        return mergeDeepRight(base, x);
    })(initThemes);
    // DERIVED THEMES =>
    // init themeName
    var initThemeName = ((_a = init === null || init === void 0 ? void 0 : init.options) === null || _a === void 0 ? void 0 : _a.initTheme) || ((_b = init === null || init === void 0 ? void 0 : init.themes) === null || _b === void 0 ? void 0 : _b[0].name) || ((_c = empty === null || empty === void 0 ? void 0 : empty.options) === null || _c === void 0 ? void 0 : _c.initTheme);
    // list of themes
    var themesNames = map(function (_a) {
        var name = _a.name;
        return name;
    })(themes);
    verifyScheme(initThemeName, themesNames, VERIFY.KEY_IN_ARR);
    verifyScheme(themesNames, scheme.name, VERIFY.EQ, true);
    // active theme
    var theme = (find(function (_a) {
        var name = _a.name;
        return name === initThemeName;
    })(themes) ||
        empty.theme);
    return {
        breakPoints: breakPoints,
        root: root,
        theme: theme,
        themes: themes,
        options: options,
        helpers: {
            mq: mq,
            styleSheets: styleSheets,
        },
    };
};
// EXTENDS
var processExtends = function (guide, extended) {
    var ready = reduce(function (pre, key) {
        var _a, _b;
        var rule = extended[key];
        if (typeof rule === 'function') {
            return __assign(__assign({}, pre), (_a = {}, _a[key] = rule(guide), _a));
        }
        else {
            return __assign(__assign({}, pre), (_b = {}, _b[key] = rule, _b));
        }
    }, {})(keys(extended));
    return ready;
};
var getExtended = function (
// baseExtendedOn = false, todo add support
// baseExtended = {} as B, todo add support
customExtended) {
    if (customExtended === void 0) { customExtended = {}; }
    // if (baseExtendedOn) return mergeDeepRight(baseExtended, customExtended) as InitExtend<E>;
    return customExtended;
};
// REDUCER
var reducer = function (data, _a) {
    var action = _a[0], payload = _a[1];
    if (action === Actions.GUIDE)
        return payload;
    if (action === Actions.THEME)
        return __assign(__assign({}, data), { theme: find(function (_a) {
                var name = _a.name;
                return equals(name, payload);
            })(data.themes) });
    return data;
};
// PROVIDER
var getProvider = function (forceIrr, BaseProvider) {
    if (forceIrr === void 0) { forceIrr = false; }
    var StyleGuideProvider = forceIrr
        ? function (_a) {
            var children = _a.children;
            return (React.createElement(ForceIRR, null,
                React.createElement(BaseProvider, null, children)));
        }
        : BaseProvider;
    return StyleGuideProvider;
};
// OPTIONS
var getOptions = function (baseOptions, newOptions) {
    return mergeDeepRight(baseOptions, newOptions || {});
};
// MAIN
var createStyleGuide = function (config, customExtended) {
    if (customExtended === void 0) { customExtended = {}; }
    var initGuide = getInitConfig(config);
    var _a = newContext({
        name: 'StyleGuide',
        initState: initGuide,
        reducer: reducer,
    }), BaseProvider = _a.StyleGuideProvider, useStyleGuideState = _a.useStyleGuideState, useStyleGuideUpdater = _a.useStyleGuideUpdater;
    var StyleGuideProvider = getProvider(initGuide.options.forceIrr, BaseProvider);
    var extended = getExtended(customExtended);
    // USE STG
    var useStyleGuide = function (newOptions) {
        if (newOptions === void 0) { newOptions = {}; }
        var initGuide = useStyleGuideState();
        var set = useStyleGuideUpdater();
        var options = getOptions(initGuide.options, newOptions);
        var mediaFlags = useMediaFlags(initGuide.breakPoints, options.mediaQrr);
        // not use merge but take full control join.
        var fullGuide = useMemo(function () {
            // themes flags
            var themeFlags = reduce(function (pre, _a) {
                var _b;
                var name = _a.name;
                return mergeDeepRight(pre, (_b = {}, _b[name] = name === initGuide.theme.name, _b));
            }, {})(initGuide.themes);
            // tags flags
            var tagsFlags = reduce(function (pre, _a) {
                var tags = _a.tags;
                var inners = reduce(function (pre, tag) {
                    var _a;
                    return mergeDeepRight(pre, (_a = {}, _a[tag] = includes(tag)(initGuide.theme.tags || []), _a));
                }, {})(tags || []);
                return mergeDeepRight(pre, inners);
            }, {})(initGuide.themes);
            // set theme
            var setTheme = function (themeName) {
                set([Actions.THEME, themeName]);
            };
            // base
            var base = mergeDeepRight(initGuide, {
                helpers: {
                    setTheme: setTheme,
                },
                state: {
                    themeFlags: themeFlags,
                    tagsFlags: tagsFlags,
                    mediaFlags: mediaFlags,
                },
            });
            // extended
            var full = __assign(__assign({}, base), { extended: processExtends(base, extended) });
            return full;
        }, [initGuide, mediaFlags, set]);
        return fullGuide;
    };
    return {
        StyleGuideProvider: StyleGuideProvider,
        useStyleGuide: useStyleGuide,
        initGuide: initGuide,
    };
};
export { 
// main
addTag, ForceIRR, ForceCSR, baseExtended, createStyleGuide, createStyleGuide as default, };
//# sourceMappingURL=index.js.map