"use strict";
exports.__esModule = true;
exports.emptyConfig = exports.emptyTheme = exports.Actions = void 0;
// types
var Actions;
(function (Actions) {
    Actions[Actions["THEME"] = 0] = "THEME";
    Actions[Actions["GUIDE"] = 1] = "GUIDE";
})(Actions = exports.Actions || (exports.Actions = {}));
// DEFAULT SETTINGS //
exports.emptyTheme = {
    name: '',
    tags: [],
    colors: {},
    fontFamily: {}
};
exports.emptyConfig = {
    breakPoints: {},
    initThemeName: '',
    base: {},
    themes: [],
    scheme: {},
    theme: exports.emptyTheme
};
//# sourceMappingURL=model.js.map