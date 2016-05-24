import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SNACKBAR_CLOSE,
} from '../constants/AppConstants';

const initialState = {
  error: null,
  hasError: false,
  loading: false,
  loggedin: false,
  snackbarDisplayed: false,
  tokenInfo: null,
};

export default function loginReducer(state = initialState, action = null) {
  Object.freeze(state);
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        hasError: false,
        loading: false,
        loggedin: true,
        snackbarDisplayed: true,
        tokenInfo: action.data
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
        hasError: true,
        loading: false,
        loggedin: false,
        snackbarDisplayed: false,
        tokenInfo: null,
      };
    case SNACKBAR_CLOSE:
      return {
        ...state,
        snackbarDisplayed: false,
      };
    default:
      return state;
  }
}
