import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_LOADING,
} from '../constants/AppConstants';

const initialState = {
  loading: false,
  error: null,
};

export default function loginReducer(state = initialState, action = null) {
  Object.freeze(state);
  switch (action.type) {
    case LOGIN_LOADING:
      return {
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
