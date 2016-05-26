'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * AppConstants
 * These are the variables that determine what our central data store (reducer.js)
 * changes in our state. When you add a new action, you have to add a new constant here
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'YOUR_ACTION_CONSTANT';
 */
var LOGIN_LOADING = exports.LOGIN_LOADING = 'LOGIN_LOADING';
var LOGIN_SUCCESS = exports.LOGIN_SUCCESS = 'LOGIN_SUCCESS';
var LOGIN_ERROR = exports.LOGIN_ERROR = 'LOGIN_ERROR';

var CURRENT_USER_LOADED = exports.CURRENT_USER_LOADED = 'CURRENT_USER_LOADED';
var LOGOUT = exports.LOGOUT = 'LOGOUT';

var TOKEN_INFO = exports.TOKEN_INFO = 'tokenInfo';
var CURRENT_USER = exports.CURRENT_USER = 'currentUser';