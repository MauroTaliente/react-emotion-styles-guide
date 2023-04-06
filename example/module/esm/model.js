// types
export var Actions;
(function (Actions) {
    Actions[Actions["THEME"] = 0] = "THEME";
    Actions[Actions["GUIDE"] = 1] = "GUIDE";
})(Actions || (Actions = {}));
// DEFAULT SETTINGS //
export var emptyTheme = {
    name: '',
    tags: [],
    colors: {},
    fontFamily: {},
};
export var emptyConfig = {
    breakPoints: {},
    initThemeName: '',
    base: {},
    themes: [],
    scheme: {},
    theme: emptyTheme,
};
//# sourceMappingURL=model.js.map