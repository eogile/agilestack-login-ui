import {
  CURRENT_USER_LOADED,
  LOGOUT,
  TOKEN_INFO,
  CURRENT_USER,
} from '../constants/AppConstants';

export function loadUser(user, token) {
  localStorage.setItem(CURRENT_USER, JSON.stringify(user));
  localStorage.setItem(TOKEN_INFO, JSON.stringify(token));
  return {
    type: CURRENT_USER_LOADED,
    user,
    token,
  }
}

export function logout() {
  localStorage.removeItem(TOKEN_INFO);
  localStorage.removeItem(CURRENT_USER);
  return {
    type: LOGOUT,
  }
}
