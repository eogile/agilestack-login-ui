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

var _ApiConfig = require('../config/ApiConfig');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var headerForm = new Headers({
    "Content-Type": "application/x-www-form-urlencoded"
});

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
        //TODO dispatch to loading when loading done
        //dispatch(loading());

        //body should be : grant_type=password&username=superadmin@eogile.com&password=supersecret
        console.log('API_AUTH_URL:', _ApiConfig.API_AUTH_URL);
        (0, _isomorphicFetch2.default)(_ApiConfig.API_AUTH_URL, {
            method: 'POST',
            headers: headerForm,
            body: makeLoginBody(username, password)
        }). // mode: 'no-cors',
        then(function (response) {
            console.log(response.status);
            if (!response.ok) {
                return response.json().then(function (err) {
                    throw err;
                });
            }
            return response.json();
        }).then(function (json) {
            console.log("LOGIN------------ BEFORE SET localsotrage in ", _AppConstants.TOKEN_INFO);
            localStorage.setItem(_AppConstants.TOKEN_INFO, JSON.stringify(json));

            dispatch(loginSuccess(json));
        }).catch(function (err) {
            return dispatch(errorLogin(err));
        });
    };
}