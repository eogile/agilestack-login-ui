'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginSuccess = loginSuccess;
exports.errorLogin = errorLogin;
exports.dialogClose = dialogClose;
exports.snackBarClose = snackBarClose;
exports.makeLoginBody = makeLoginBody;
exports.asyncLogin = asyncLogin;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _AppConstants = require('../constants/AppConstants');

var _CurrentUserActions = require('./CurrentUserActions');

var _ApiConfig = require('../config/ApiConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var headers = {
  "Content-Type": "application/x-www-form-urlencoded"
};

function loginSuccess(json) {
  console.log('in loginSuccess');
  console.dir(json);
  return {
    type: _AppConstants.LOGIN_SUCCESS,
    data: json
  };
}

function errorLogin(error) {
  return {
    type: _AppConstants.LOGIN_ERROR,
    error: error
  };
}

function dialogClose() {
  return {
    type: _AppConstants.DIALOG_CLOSE
  };
}

function snackBarClose() {
  return {
    type: _AppConstants.SNACKBAR_CLOSE
  };
}

function makeLoginBody(username, password) {
  return "grant_type=password&username=" + username + "&password=" + password;
}

function asyncLogin(username, password) {
  return function (dispatch) {
    console.log('API_AUTH_URL:', _ApiConfig.API_AUTH_URL);
    (0, _isomorphicFetch2.default)(_ApiConfig.API_AUTH_URL, {
      method: 'POST',
      headers: headers,
      body: makeLoginBody(username, password)
    }).then(function (response) {
      if (!response.ok) {
        return response.json().then(function (err) {
          throw err;
        });
      }
      return response.json();
    }).then(function (json) {
      var tokenInfo = JSON.stringify(json);
      dispatch(loginSuccess(json));
      dispatch((0, _CurrentUserActions.asyncLoadUser)(tokenInfo));
    }).catch(function (err) {
      dispatch(errorLogin(err));
    });
  };
}