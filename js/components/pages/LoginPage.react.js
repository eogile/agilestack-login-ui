/*
 * HomePage
 * This is the first thing users see of our App
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Paper, Snackbar, FlatButton, Toolbar} from 'material-ui';
import {Form} from 'formsy-react'
import {FormsyText} from 'formsy-material-ui';
import {asyncLogin, snackBarClose} from '../../actions/LoginActions';

function buildState(props) {
  const {callback} = props.params;
  return {
    login: '',
    canLogin: false,
    open: false,
    hasError: false,
    callback
  };
}

class LoginPage extends Component {

  emailErrorMessages = {
    isEmail: 'Please only use email',
    minLength: 'Please fill at least 6 characters in email',
    passwordRequiredMessage: 'please give a password'
  };

  passwordErrorMessages = {
    minLength: 'Please fill at least 3 characters in a password',
    passwordRequiredMessage: 'please give a password'
  };

  constructor(props) {
    super(props);
    this.enableLogin = this.enableLogin.bind(this);
    this.disableLogin = this.disableLogin.bind(this);
    this.login = this.login.bind(this);
    this.onSnackbarClose = this.onSnackbarClose.bind(this);
    this.state = buildState(props);
  }

  enableLogin() {
    console.log('enableLogin');
    const canLogin = true;
    this.setState({canLogin})
  }

  disableLogin() {
    console.log('disableLogin');
    this.setState({canLogin: false})
  }

  onChangeLogin(e) {
    const login = e.target.value;
    console.log('onChangeLogin', login);
    this.setState({login})
  }

  onChangePassword(e) {
    const password = e.target.value;
    console.log('onChangePassword');
    this.setState({password})
  }

  login() {
    const {dispatch} = this.props;
    console.log('login ici');
    dispatch(asyncLogin(this.state.login, this.state.password));
  }

  onSnackbarClose() {
    const {dispatch, location} = this.props;
    const {callback} = location.query;
    console.log('in handleRequestClose - callback', callback);
    dispatch(snackBarClose());
    dispatch(push(callback || '/'));
  }

  render() {
    const {hasError, snackbarDisplayed} = this.props.login;
    const {login, password, canLogin} = this.state;
    const styles = {
      fieldset: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      field: {
        minWidth: 15,
        flex: 1,
      },
      bigField: {
        width: '100%',
        marginLeft: 10,
        marginRight: 10,
      },
      selectContainer: {
        marginTop: 14,
      },
      selectLabel: {
        fontSize: 12,
        opacity: 0.5,
      },
      actionBar: {
        width: '100%',
        marginTop: 32,
        display: 'flex',
        justifyContent: 'space-around',
      },
      box: {
        minWidth: 250,
        width: '40%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      errorMessages: {
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10,
        color: 'red',
      }
    };
    return (
      <div>
        <br/>
        <br/>
        {hasError && (
          <Toolbar style={styles.box}>
            <span style={styles.errorMessages}> You provided the wrong username and password, please try again</span>
          </Toolbar>
        )}
        <Paper style={styles.box}>

          <Form
            onValid={this.enableLogin}
            onInvalid={this.disableLogin}
            onValidSubmit={this.login}>
            <div style={styles.fieldset}>
              <FormsyText
                key="login"
                style={styles.bigField}
                name="login"
                required
                formNoValidate
                floatingLabelText="Email"
                validations="isEmail,minLength:6"
                validationErrors={this.emailErrorMessages}
                value={login}
                onChange={this.onChangeLogin.bind(this)}/>
              <FormsyText
                key="password"
                name="password"
                style={styles.bigField}
                required
                floatingLabelText="Password"
                type="password"
                validations="minLength:3"
                validationErrors={this.passwordErrorMessages}
                value={password}
                onChange={this.onChangePassword.bind(this)}/>
            </div>
            <div style={styles.actionBar}>
              <FlatButton label="Cancel"/>
              <FlatButton
                label="Login"
                type="submit"
                primary={true}
                disabled={!canLogin}
              />
            </div>
          </Form>
          <Snackbar
            open={snackbarDisplayed}
            message="Login successful"
            autoHideDuration={1000}
            onRequestClose={this.onSnackbarClose}/>
        </Paper>
      </div>
    );
  }
}

export default connect(state => ({login: state.login}))(LoginPage);
