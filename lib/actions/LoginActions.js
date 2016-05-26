'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loginLoad = loginLoad;
exports.loginSuccess = loginSuccess;
exports.loginError = loginError;
exports.makeLoginBody = makeLoginBody;
exports.asyncLogin = asyncLogin;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _reactRouterRedux = require('react-router-redux');

var _AppConstants = require('../constants/AppConstants');

var _CurrentUserActions = require('./CurrentUserActions');

var _ApiConfig = require('../config/ApiConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var headers = {
  "Content-Type": "application/x-www-form-urlencoded"
};

function loginLoad() {
  return {
    type: _AppConstants.LOGIN_LOADING
  };
}

function loginSuccess() {
  return {
    type: _AppConstants.LOGIN_SUCCESS
  };
}

function loginError(error) {
  return {
    type: _AppConstants.LOGIN_ERROR,
    error: error
  };
}

function makeLoginBody(username, password) {
  return "grant_type=password&username=" + username + "&password=" + password;
}

function asyncLogin(username, password, callback) {
  console.log('API_AUTH_URL:', _ApiConfig.API_AUTH_URL);
  return function (dispatch) {
    dispatch(loginLoad());
    (0, _isomorphicFetch2.default)(_ApiConfig.API_AUTH_URL, {
      method: 'POST',
      headers: headers,
      body: makeLoginBody(username, password)
    }).then(function (response) {
      if (!response.ok) {
        return response.json().then(function (json) {
          throw json.error || json;
        });
      }
      return response.json();
    }).then(function (json) {
      dispatch(loginSuccess());
      dispatch((0, _CurrentUserActions.loadUser)(json.user, json.token));
      dispatch((0, _reactRouterRedux.push)(callback || '/'));
    }).catch(function (err) {
      dispatch(loginError(err));
      dispatch((0, _CurrentUserActions.logout)()); // just to be safe
    });
  };
}