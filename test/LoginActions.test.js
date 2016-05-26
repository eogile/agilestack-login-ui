import expect from 'expect';
import { loginSuccess, loginError, makeLoginBody } from '../js/actions/LoginActions';
import { LOGIN_SUCCESS, LOGIN_ERROR } from '../js/constants/AppConstants';

// Test actions from AppActions.js
describe('AppActions', () => {
  // Test login action
  describe('loginSuccess', () => {
    it('should login', () => {
      const expectedResult = {
        type: LOGIN_SUCCESS,
      };

      expect(loginSuccess()).toEqual(expectedResult);
    });
  });

  // Test errorLogin action
  describe('loginError', () => {
    it('should return correct action', () => {
      const error = 'the error';
      const expectedResult = {
        type: LOGIN_ERROR,
        error,
      };

      expect(loginError(error)).toEqual(expectedResult);
    });
  });

  // Test makeLoginBody action
  describe('makeLoginBody', () => {
    it('should make correct Body for POST login', () => {
      const username = 'test@test.fr';
      const password = 'testpass';
      const expectedResult = "grant_type=password&username=test@test.fr&password=testpass"

      expect(makeLoginBody(username, password)).toEqual(expectedResult);
    });
  });

});
