'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _loginReducer = require('./loginReducer');

var _loginReducer2 = _interopRequireDefault(_loginReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

var rootReducer = (0, _redux.combineReducers)({
  login: _loginReducer2.default
});

exports.default = rootReducer;