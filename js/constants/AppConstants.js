/*
 * AppConstants
 * These are the variables that determine what our central data store (reducer.js)
 * changes in our state. When you add a new action, you have to add a new constant here
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'YOUR_ACTION_CONSTANT';
 */
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const CURRENT_USER_LOADING = 'CURRENT_USER_LOADING';
export const CURRENT_USER_LOADED = 'CURRENT_USER_LOADED';
export const CURRENT_USER_ERROR = 'CURRENT_USER_ERROR';

export const LOGOUT = 'LOGOUT';

export const DIALOG_CLOSE = 'DIALOG_CLOSE';
export const SNACKBAR_CLOSE = 'SNACKBAR_CLOSE';


// export const API_BASE_URL = 'http://localhost:8080'; // local api instead of hydra http://localhost:8080/auth
// export const API_AUTH_URL = API_BASE_URL + '/login'; //local api instead of hydra API_BASE_URL + '/oauth2/token'

export const TOKEN_INFO = 'tokenInfo';
export const CURRENT_USER = 'currentUser';
