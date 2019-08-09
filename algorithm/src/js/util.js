const defaultEquals = function (a ,b) {
    return a === b;
}
/**
 * 如果item是对象的话，它需要实现 toString 方法，否则会导致出现异常的
 * 输出结果，如 [object object]。
 * @param {*} item 
 */
const defaultToString = function (item) {
    if (item === null) {
        return 'NULL';
    }
    else if (item === undefined) {
        return 'UNDEFINED';
    }
    else if (typeof item === 'string' || item instanceof  String) {
        return `${item}`;
    }
    return item.toString();
}

module.exports = {
    defaultEquals,
    defaultToString
}