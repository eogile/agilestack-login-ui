'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = loginReducer;

var _AppConstants = require('../constants/AppConstants');

var initialState = {
  loading: false,
  error: null
};

function loginReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  Object.freeze(state);
  switch (action.type) {
    case _AppConstants.LOGIN_LOADING:
      return {
        loading: true
      };
    case _AppConstants.LOGIN_SUCCESS:
      return _extends({}, state, {
        loading: false,
        error: null
      });
    case _AppConstants.LOGIN_ERROR:
      return _extends({}, state, {
        loading: false,
        error: action.error
      });
    default:
      return state;
  }
}