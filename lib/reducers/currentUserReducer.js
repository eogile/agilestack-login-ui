'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = currentUserReducer;

var _AppConstants = require('../constants/AppConstants');

function loadInitialStateFromLocalStorage() {

  var lsTokenInfo = localStorage && localStorage.getItem(_AppConstants.TOKEN_INFO);
  var tokenInfo = lsTokenInfo ? JSON.parse(lsTokenInfo) : null;

  var lsUser = localStorage && localStorage.getItem(_AppConstants.CURRENT_USER);
  var user = lsUser ? JSON.parse(lsUser) : null;

  return {
    loading: false,
    error: null,
    hasError: false,
    loggedIn: !!user,
    user: user,
    tokenInfo: tokenInfo
  };
}

var initialState = loadInitialStateFromLocalStorage();

function currentUserReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  Object.freeze(state);
  switch (action.type) {
    case _AppConstants.CURRENT_USER_LOADING:
      return _extends({}, state, {
        loading: true,
        tokenInfo: action.data
      });
    case _AppConstants.CURRENT_USER_LOADED:
      return _extends({}, state, {
        loading: false,
        error: null,
        hasError: false,
        loggedIn: true,
        user: action.data
      });
    case _AppConstants.CURRENT_USER_ERROR:
      return _extends({}, state, {
        loading: false,
        error: action.error,
        hasError: true,
        user: null
      });
    case _AppConstants.LOGOUT:
      return _extends({}, state, {
        loading: false,
        error: false,
        hasError: false,
        loggedIn: false,
        user: null,
        tokenInfo: null
      });
    default:
      return state;
  }
}