'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var assign = Object.assign || require('object.assign'); // Polyfill maybe needed for browser support

var assignToEmpty = function assignToEmpty(oldObject, newObject) {
  return assign({}, oldObject, newObject);
};

exports.default = assignToEmpty;