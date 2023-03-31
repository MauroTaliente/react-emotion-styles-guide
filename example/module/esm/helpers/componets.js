import React, { useState } from 'react';
var IS_SSR = typeof document === 'undefined';
if (IS_SSR) {
    React.useLayoutEffect = React.useEffect;
}
var useIsomorphicLayoutEffect = React.useLayoutEffect;
var ForceCSR = function (_a) {
    var children = _a.children, _b = _a.defer, defer = _b === void 0 ? false : _b, _c = _a.loading, loading = _c === void 0 ? null : _c;
    var _d = useState(false), isMounted = _d[0], setMountedState = _d[1];
    useIsomorphicLayoutEffect(function () {
        if (!defer)
            setMountedState(function (pre) { return !pre; });
    }, [defer]);
    return React.createElement(React.Fragment, null,
        isMounted ? children : loading,
        " ");
};
var ForceIRR = function (_a) {
    var children = _a.children, _b = _a.defer, defer = _b === void 0 ? false : _b;
    var _c = useState(false), isMounted = _c[0], setMountedState = _c[1];
    useIsomorphicLayoutEffect(function () {
        if (!defer)
            setMountedState(function (pre) { return !pre; });
    }, [defer]);
    return (React.createElement(React.Fragment, null,
        isMounted && children,
        !isMounted && children));
};
export { ForceCSR, ForceIRR };
//# sourceMappingURL=componets.js.map