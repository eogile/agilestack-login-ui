import {
  CURRENT_USER_LOADING,
  CURRENT_USER_LOADED,
  CURRENT_USER_ERROR,
  LOGOUT,
  CURRENT_USER,
  TOKEN_INFO
} from '../constants/AppConstants';

function loadInitialStateFromLocalStorage() {

  const lsTokenInfo = localStorage && localStorage.getItem(TOKEN_INFO);
  const tokenInfo = lsTokenInfo ? JSON.parse(lsTokenInfo) : null;

  const lsUser = localStorage && localStorage.getItem(CURRENT_USER);
  const user = lsUser ? JSON.parse(lsUser) : null;

  return {
    loading: false,
    error: null,
    hasError: false,
    loggedIn: !!user,
    user,
    tokenInfo,
  }
}

const initialState = loadInitialStateFromLocalStorage();

export default function currentUserReducer(state = initialState, action = null) {
  Object.freeze(state);
  switch (action.type) {
    case CURRENT_USER_LOADING:
      return {
        ...state,
        loading: true,
        tokenInfo: action.data,
      };
    case CURRENT_USER_LOADED:
      return {
        ...state,
        loading: false,
        error: null,
        hasError: false,
        loggedIn: true,
        user: action.data,
      };
    case CURRENT_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        hasError: true,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        error: false,
        hasError: false,
        loggedIn: false,
        user: null,
        tokenInfo: null,
      };
    default:
      return state;
  }
}
