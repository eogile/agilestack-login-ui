import expect from 'expect';
import loginReducer from '../js/reducers/loginReducer';
import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
} from '../js/constants/AppConstants';

// Test Reducer
describe('loginReducer', () => {
  // Test that the initial state is returning correctly
  it('should return the initial state', () => {
    expect(loginReducer(undefined, {})).toEqual({
      error: null,
      hasError: false,
      loading: false,
      loggedin: false,
      snackbarDisplayed: false,
      tokenInfo: null,
    });
  });

  const token = 'hardToRememberTokenMuchLongerThanThat';
  const token_type = 'Bearer';
  const expiry = '2016-03-24T16:46:00.321227272Z';
  const refresh_token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIiLCJpZCI6IjBmMzNmMmExLThhMGMtNDc4ZC1hMWZiLWM2ODg1NGMxNjU3OSJ9.e16KcPt4UtiLD3ClJJkAYwwrVzf6-rcjKgtew41uDSibsS0BI1fSvDKXdrK7FntG92dtgJ4-rvuHcLVxDmCsVv0DG7YRSm_yVCeSA4-kBihquTJOFFysMtbb5yyQiKvPJg0mSNzeKjUwc31R5aICvxMAt7WL4lktyvwhVFtV-1E2OUk-YxizsBr654hdZe-vSWLzXPtl7WrPO6SwWox24U3eryEim1XKm3dqjeAEMlz8C-uz3xDc88rehMzqSiyX5AJKftvt_tffN8NaCO0skM9p1Ae5FEg_p6uzZJbtNsEZ17v9KAJ2ospJi9JRZT_rXUb5ovC4fl27grM5lgR6ag';
  const tokenInfoReceived = {
    access_token: token,
    expiry: expiry,
    refresh_token: refresh_token,
    token_type: token_type,
  }
  const expectedStateAfterSucess = {
    error: null,
    hasError: false,
    loading: false,
    loggedin: true,
    snackbarDisplayed: true,
    tokenInfo: tokenInfoReceived,
  };

  // Test that it handles login success correctly
  it('should handle the LOGIN_SUCCESS action from initialState', () => {

    expect(
      loginReducer({}, {
        type: LOGIN_SUCCESS,
        data: tokenInfoReceived,
      })
    ).toEqual(expectedStateAfterSucess);
  });

  const errorReceived = {
    error: "access_denied",
    error_description: "The resource owner or authorization server denied the request."
  };
  const expectedStateAfterFirstError = {
    error: errorReceived,
    hasError: true,
    loading: false,
    loggedin: false,
    snackbarDisplayed: false,
    tokenInfo: null,
  };

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
        data: tokenInfoReceived
      })
    ).toEqual(expectedStateAfterSucess);
  });

});
