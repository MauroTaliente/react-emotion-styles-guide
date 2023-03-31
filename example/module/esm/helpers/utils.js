import { __assign } from "tslib";
import * as R from 'ramda';
// UTILS
export var addTag = function (props, tag) {
    var joinTag = function (pre, key) {
        var _a;
        return (__assign(__assign({}, pre), (_a = {}, _a["".concat(tag).concat(key)] = props[key], _a)));
    };
    var build = R.reduce(joinTag, {})(R.keys(props));
    return build;
};
//# sourceMappingURL=utils.js.map