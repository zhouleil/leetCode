/**
 * babel 命令行输出文件(babel-cli)
 * npx babel ./index.js -o ./dist.js
 */

"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

require("./kk");

var _context;

var ary = [1, 2, 3];
var ary1 = (0, _concat.default)(_context = []).call(_context, ary);

var isInAry = function isInAry(num, ary) {
  return (0, _includes.default)(ary).call(ary, num);
};

var isIn = isInAry(1, ary1);
console.log(isIn);

_promise.default.resolve(1).then(function (res) {
  console.log(res);
});

console.log(_promise.default);
