'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadUser = loadUser;
exports.logout = logout;

var _AppConstants = require('../constants/AppConstants');

function loadUser(user, token) {
  localStorage.setItem(_AppConstants.CURRENT_USER, JSON.stringify(user));
  localStorage.setItem(_AppConstants.TOKEN_INFO, JSON.stringify(token));
  return {
    type: _AppConstants.CURRENT_USER_LOADED,
    user: user,
    token: token
  };
}

function logout() {
  localStorage.removeItem(_AppConstants.TOKEN_INFO);
  localStorage.removeItem(_AppConstants.CURRENT_USER);
  return {
    type: _AppConstants.LOGOUT
  };
}