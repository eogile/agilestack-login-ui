import {
  CURRENT_USER_LOADED,
  LOGOUT,
  CURRENT_USER,
  TOKEN_INFO
} from '../constants/AppConstants';

function loadInitialStateFromLocalStorage() {

  const lsUser = localStorage && localStorage.getItem(CURRENT_USER);
  const user = lsUser ? JSON.parse(lsUser) : null;

  const lsToken = localStorage && localStorage.getItem(TOKEN_INFO);
  const token = lsToken ? JSON.parse(lsToken) : null;

  return {
    loggedIn: !!user,
    user,
    token,
  }
}

const initialState = loadInitialStateFromLocalStorage();

export default function currentUserReducer(state = initialState, action = null) {
  Object.freeze(state);
  switch (action.type) {
    case CURRENT_USER_LOADED:
      localStorage.setItem(CURRENT_USER, JSON.stringify(action.user));
      localStorage.setItem(TOKEN_INFO, JSON.stringify(action.token));
      return {
        ...state,
        loggedIn: true,
        user: action.user,
        token: action.token
      };
    case LOGOUT:
      localStorage.removeItem(TOKEN_INFO);
      localStorage.removeItem(CURRENT_USER);
      return {
        ...state,
        loggedIn: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
}
