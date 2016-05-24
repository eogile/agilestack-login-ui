'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = logout;

var _AppConstants = require('../constants/AppConstants');

function logout() {
  localStorage.removeItem(_AppConstants.TOKEN_INFO);
  localStorage.removeItem(_AppConstants.CURRENT_USER);
  return {
    type: _AppConstants.LOGOUT
  };
}