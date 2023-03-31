import React, { createContext, useReducer, useContext, useCallback } from 'react';
var capitalized = function (s) { return (s ? s[0].toUpperCase() + s.slice(1) : s); };
var newContext = function (_a) {
    var _b;
    var _c = _a.name, name = _c === void 0 ? '' : _c, initState = _a.initState, _d = _a.reducer, reducer = _d === void 0 ? function (_, d) { return d; } : _d;
    name = capitalized(name);
    var StateContext = createContext(initState);
    var UpdaterContext = createContext(function (s) { return s; });
    var Provider = function (_a) {
        var _b = _a.children, children = _b === void 0 ? null : _b;
        var _c = useReducer(reducer, initState), store = _c[0], setStore = _c[1];
        return (React.createElement(StateContext.Provider, { value: store },
            React.createElement(UpdaterContext.Provider, { value: setStore }, children)));
    };
    var useState = function () {
        var storeState = useContext(StateContext);
        if (typeof StateContext === 'undefined') {
            throw new Error("".concat(name, ".useState must be used within a StoreProvider"));
        }
        return storeState;
    };
    var useUpdater = function () {
        var setStore = useContext(UpdaterContext);
        if (typeof setStore === 'undefined') {
            throw new Error("".concat(name, ".useUpdater must be used within a StoreProvider"));
        }
        var updater = useCallback(setStore, [setStore]);
        return updater;
    };
    var context = (_b = {},
        _b["".concat(name, "Provider")] = Provider,
        _b["use".concat(name, "State")] = useState,
        _b["use".concat(name, "Updater")] = useUpdater,
        _b);
    return context;
};
export default newContext;
//# sourceMappingURL=context.js.map