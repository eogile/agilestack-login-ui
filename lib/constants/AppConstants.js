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
var LOGIN_SUCCESS = exports.LOGIN_SUCCESS = 'LOGIN_SUCCESS';
var LOGIN_ERROR = exports.LOGIN_ERROR = 'LOGIN_ERROR';

var DIALOG_CLOSE = exports.DIALOG_CLOSE = 'DIALOG_CLOSE';
var SNACKBAR_CLOSE = exports.SNACKBAR_CLOSE = 'SNACKBAR_CLOSE';

// export const API_BASE_URL = 'http://localhost:8080'; // local api instead of hydra http://localhost:8080/auth
// export const API_AUTH_URL = API_BASE_URL + '/login'; //local api instead of hydra API_BASE_URL + '/oauth2/token'

var TOKEN_INFO = exports.TOKEN_INFO = 'tokenInfo';