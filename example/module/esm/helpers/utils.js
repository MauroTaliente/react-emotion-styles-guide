import { __assign } from "tslib";
import * as R from 'ramda';
// UTILS
var capitalized = function (word) { return "".concat(word.charAt(0).toUpperCase()).concat(word.slice(1)); };
export var addTag = function (props, tag) {
    var joinTag = function (pre, key) {
        var _a;
        return (__assign(__assign({}, pre), (_a = {}, _a["".concat(tag).concat(capitalized(key))] = props[key], _a)));
    };
    var build = R.reduce(joinTag, {})(R.keys(props));
    return build;
};
//# sourceMappingURL=utils.js.map