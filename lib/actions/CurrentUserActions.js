'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.loadUserStart = loadUserStart;
exports.loadUserSuccess = loadUserSuccess;
exports.loadUserError = loadUserError;
exports.logout = logout;
exports.asyncLoadUser = asyncLoadUser;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _AppConstants = require('../constants/AppConstants');

var _ApiConfig = require('../config/ApiConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultHeaders = {
  "Content-Type": "application/x-www-form-urlencoded"
};

function loadUserStart(tokenInfo) {
  localStorage.setItem(_AppConstants.TOKEN_INFO, tokenInfo);
  return {
    type: _AppConstants.CURRENT_USER_LOADING,
    data: tokenInfo
  };
}

function loadUserSuccess(json) {
  return {
    type: _AppConstants.CURRENT_USER_LOADED,
    data: json
  };
}

function loadUserError(error) {
  return {
    type: _AppConstants.CURRENT_USER_ERROR,
    error: error
  };
}

function logout() {
  localStorage.removeItem(_AppConstants.TOKEN_INFO);
  localStorage.removeItem(_AppConstants.CURRENT_USER);
  return {
    type: _AppConstants.LOGOUT
  };
}

function asyncLoadUser(tokenInfo) {
  console.log('Loading user details', _ApiConfig.API_AUTH_URL, _ApiConfig.API_USER_URL, tokenInfo);
  return function (dispatch) {
    dispatch(loadUserStart(tokenInfo));

    var headers = _extends({}, defaultHeaders);
    headers[_AppConstants.TOKEN_INFO] = tokenInfo;

    (0, _isomorphicFetch2.default)(_ApiConfig.API_USER_URL, {
      method: 'GET',
      headers: headers
    }).then(function (response) {
      if (!response.ok) {
        return response.json().then(function (err) {
          throw err;
        });
      }
      return response.json();
    }).then(function (json) {
      localStorage.setItem(_AppConstants.CURRENT_USER, JSON.stringify(json));
      dispatch(loadUserSuccess(json));
    }).catch(function (err) {
      dispatch(loadUserError(err));
    });
  };
}