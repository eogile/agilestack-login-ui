import fetch from 'isomorphic-fetch';

import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  DIALOG_CLOSE,
  SNACKBAR_CLOSE,
} from '../constants/AppConstants';
import {asyncLoadUser} from './CurrentUserActions';

import {API_AUTH_URL} from '../config/ApiConfig';

const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
};

export function loginSuccess(json) {
  console.log('in loginSuccess');
  console.dir(json);
  return {
    type: LOGIN_SUCCESS,
    data: json,
  }
}

export function errorLogin(error) {
  return {
    type: LOGIN_ERROR,
    error: error,
  }
}

export function dialogClose() {
  return {
    type: DIALOG_CLOSE,
  }
}

export function snackBarClose() {
  return {
    type: SNACKBAR_CLOSE,
  }
}

export function makeLoginBody(username, password) {
  return "grant_type=password&username=" + username + "&password=" + password
}

export function asyncLogin(username, password) {
  return dispatch => {
    console.log('API_AUTH_URL:', API_AUTH_URL);
    fetch(API_AUTH_URL, {
      method: 'POST',
      headers: headers,
      body: makeLoginBody(username, password),
    }).then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          throw err
        });
      }
      return response.json();
    }).then(json => {
      const tokenInfo = JSON.stringify(json);
      dispatch(loginSuccess(json));
      dispatch(asyncLoadUser(tokenInfo));
    }).catch(err => {
      dispatch(errorLogin(err));
    });
  };
}
