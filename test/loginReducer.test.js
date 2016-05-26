import expect from 'expect';
import loginReducer from '../js/reducers/loginReducer';
import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
} from '../js/constants/AppConstants';


const expectedInitialState = {
  loading: false,
  error: null,
};

const expectedStateAfterSucess = {
  loading: false,
  error: null,
};

const errorReceived = {
  code: "access_denied",
  defautMessage: "The resource owner or authorization server denied the request",
};
const expectedStateAfterFirstError = {
  loading: false,
  error: errorReceived,
};

// Test Reducer
describe('loginReducer', () => {
  // Test that the initial state is returning correctly
  it('should return the initial state', () => {
    expect(loginReducer(undefined, {})).toEqual(expectedInitialState);
  });

  // Test that it handles login success correctly
  it('should handle the LOGIN_SUCCESS action from initialState', () => {

    expect(
      loginReducer({}, {
        type: LOGIN_SUCCESS,
      })
    ).toEqual(expectedStateAfterSucess);
  });

  // Test that it handles login error correctly from initialState
  it('should handle the LOGIN_ERROR action from initialState', () => {
    expect(
      loginReducer({}, {
        type: LOGIN_ERROR,
        error: errorReceived
      })
    ).toEqual(expectedStateAfterFirstError);
  });

  // Test that it handles login success correctly after an error
  it('should handle login success correctly after an error', () => {
    expect(
      loginReducer(expectedStateAfterFirstError, {
        type: LOGIN_SUCCESS,
      })
    ).toEqual(expectedStateAfterSucess);
  });

});
