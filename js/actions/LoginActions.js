import fetch from 'isomorphic-fetch';
import {push} from 'react-router-redux';

import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_LOADING,
} from '../constants/AppConstants';
import {loadUser, logout} from './CurrentUserActions';

import {API_AUTH_URL} from '../config/ApiConfig';

const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
};

export function loginLoad() {
  return {
    type: LOGIN_LOADING,
  }
}

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  }
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error: error,
  }
}

export function makeLoginBody(username, password) {
  return "grant_type=password&username=" + username + "&password=" + password
}

export function asyncLogin(username, password, callback) {
  console.log('API_AUTH_URL:', API_AUTH_URL);
  return dispatch => {
    dispatch(loginLoad());
    fetch(API_AUTH_URL, {
      method: 'POST',
      headers: headers,
      body: makeLoginBody(username, password),
    }).then(response => {
      if (!response.ok) {
        return response.json().then(json => {
          throw json.error || json;
        });
      }
      return response.json();
    }).then(json => {
      dispatch(loginSuccess());
      dispatch(loadUser(json.user, json.token));
      dispatch(push(callback || '/'));
    }).catch(err => {
      dispatch(loginError(err));
      dispatch(logout()); // just to be safe
    });
  };
}
