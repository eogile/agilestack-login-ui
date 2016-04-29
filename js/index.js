import LoginPage from './components/pages/LoginPage.react';
import loginReducer from './reducers/loginReducer';
import {loginSuccess} from './actions/LoginActions';

export {LoginPage};
export {loginReducer};
export {loginSuccess};

export default {
  LoginPage,
  loginReducer,
  loginSuccess,
};
