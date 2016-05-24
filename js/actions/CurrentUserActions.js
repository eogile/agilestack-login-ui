import fetch from 'isomorphic-fetch';

import {
  CURRENT_USER_LOADING,
  CURRENT_USER_LOADED,
  CURRENT_USER_ERROR,
  LOGOUT,
  TOKEN_INFO,
  CURRENT_USER,
} from '../constants/AppConstants';

import {API_AUTH_URL, API_USER_URL} from '../config/ApiConfig';

const defaultHeaders = {
  "Content-Type": "application/x-www-form-urlencoded",
};

export function loadUserStart(tokenInfo) {
  localStorage.setItem(TOKEN_INFO, tokenInfo);
  return {
    type: CURRENT_USER_LOADING,
    data: tokenInfo,
  }
}

export function loadUserSuccess(json) {
  return {
    type: CURRENT_USER_LOADED,
    data: json,
  }
}

export function loadUserError(error) {
  return {
    type: CURRENT_USER_ERROR,
    error: error,
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_INFO);
  localStorage.removeItem(CURRENT_USER);
  return {
    type: LOGOUT,
  }
}

export function asyncLoadUser(tokenInfo) {
  console.log('Loading user details', API_AUTH_URL, API_USER_URL, tokenInfo);
  return dispatch => {
    dispatch(loadUserStart(tokenInfo));

    const headers = {...defaultHeaders};
    headers[TOKEN_INFO] = tokenInfo;

    fetch(API_USER_URL, {
      method: 'GET',
      headers,
    }).then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          throw err
        });
      }
      return response.json();
    }).then(json => {
      localStorage.setItem(CURRENT_USER, JSON.stringify(json));
      dispatch(loadUserSuccess(json));
    }).catch(err => {
      dispatch(loadUserError(err));
    });
  };
}
