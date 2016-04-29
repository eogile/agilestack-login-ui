import fetch from 'isomorphic-fetch';

import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    DIALOG_CLOSE,
    SNACKBAR_CLOSE,
    TOKEN_INFO,
} from '../constants/AppConstants';

import {API_AUTH_URL} from '../config/ApiConfig';

var headerForm = new Headers({
  "Content-Type": "application/x-www-form-urlencoded",
});

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
  return "grant_type=password&username="+username+"&password="+password
}

export function asyncLogin(username, password) {
    return dispatch => {
        //TODO dispatch to loading when loading done
        //dispatch(loading());

        //body should be : grant_type=password&username=superadmin@eogile.com&password=supersecret
        console.log('API_AUTH_URL:', API_AUTH_URL);
        fetch(API_AUTH_URL, {
            method: 'POST',
            headers: headerForm,
            body: makeLoginBody(username, password),
            // mode: 'no-cors',
        })
            .then(response => {
                console.log(response.status);
                if (!response.ok) {
                    return response.json().then(err => {throw err});
                }
                return response.json();
            })
            .then(json => {
              console.log("LOGIN------------ BEFORE SET localsotrage in ", TOKEN_INFO);
              localStorage.setItem(TOKEN_INFO, JSON.stringify(json));

              dispatch(loginSuccess(json));
            })
            .catch(err => dispatch(errorLogin(err)));
    };
}
