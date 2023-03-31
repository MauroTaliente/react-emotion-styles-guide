"use strict";
exports.__esModule = true;
exports.ForceIRR = exports.ForceCSR = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var IS_SSR = typeof document === 'undefined';
if (IS_SSR) {
    react_1["default"].useLayoutEffect = react_1["default"].useEffect;
}
var useIsomorphicLayoutEffect = react_1["default"].useLayoutEffect;
var ForceCSR = function (_a) {
    var children = _a.children, _b = _a.defer, defer = _b === void 0 ? false : _b, _c = _a.loading, loading = _c === void 0 ? null : _c;
    var _d = (0, react_1.useState)(false), isMounted = _d[0], setMountedState = _d[1];
    useIsomorphicLayoutEffect(function () {
        if (!defer)
            setMountedState(function (pre) { return !pre; });
    }, [defer]);
    return react_1["default"].createElement(react_1["default"].Fragment, null,
        isMounted ? children : loading,
        " ");
};
exports.ForceCSR = ForceCSR;
var ForceIRR = function (_a) {
    var children = _a.children, _b = _a.defer, defer = _b === void 0 ? false : _b;
    var _c = (0, react_1.useState)(false), isMounted = _c[0], setMountedState = _c[1];
    useIsomorphicLayoutEffect(function () {
        if (!defer)
            setMountedState(function (pre) { return !pre; });
    }, [defer]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        isMounted && children,
        !isMounted && children));
};
exports.ForceIRR = ForceIRR;
//# sourceMappingURL=componets.js.map