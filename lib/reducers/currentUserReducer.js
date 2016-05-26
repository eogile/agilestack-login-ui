'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = currentUserReducer;

var _AppConstants = require('../constants/AppConstants');

function loadInitialStateFromLocalStorage() {

  var lsUser = localStorage && localStorage.getItem(_AppConstants.CURRENT_USER);
  var user = lsUser ? JSON.parse(lsUser) : null;

  var lsToken = localStorage && localStorage.getItem(_AppConstants.TOKEN_INFO);
  var token = lsToken ? JSON.parse(lsToken) : null;

  return {
    loggedIn: !!user,
    user: user,
    token: token
  };
}

var initialState = loadInitialStateFromLocalStorage();

function currentUserReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  Object.freeze(state);
  switch (action.type) {
    case _AppConstants.CURRENT_USER_LOADED:
      localStorage.setItem(_AppConstants.CURRENT_USER, JSON.stringify(action.user));
      localStorage.setItem(_AppConstants.TOKEN_INFO, JSON.stringify(action.token));
      return _extends({}, state, {
        loggedIn: true,
        user: action.user,
        token: action.token
      });
    case _AppConstants.LOGOUT:
      localStorage.removeItem(_AppConstants.TOKEN_INFO);
      localStorage.removeItem(_AppConstants.CURRENT_USER);
      return _extends({}, state, {
        loggedIn: false,
        user: null,
        token: null
      });
    default:
      return state;
  }
}