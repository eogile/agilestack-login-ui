/*
 * HomePage
 * This is the first thing users see of our App
 */

import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import {
    Paper,
    Snackbar,
    FlatButton,
    TextField,
    Card,
    CardActions,
    CardTitle,
    Toolbar,
    ToolbarGroup,
    ToolbarTitle,
    Dialog  } from 'material-ui';
// import { ToolbarGroup, ToolbarTitle} from 'material-ui/lib/toolbar';
// import Toolbar from 'material-ui/lib/toolbar/toolbar';
// import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
// import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import { Form } from 'formsy-react'
import FormsyText from 'formsy-material-ui/lib/FormsyText'

import {asyncLogin, dialogClose, snackBarClose} from '../../actions/LoginActions';

function buildState(props) {
    var login, canLogin, open, hasError;
    login="",
    canLogin = false;
    open = false;
    hasError = false;
    const { callback } = props.params
    return {login, canLogin, open, hasError, callback};
}

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = buildState(props);
        this.emailErrorMessages = {
          isEmail: "Please only use email",
          minLength: "Please fill at least 6 characters in email",
          passwordRequiredMessage: "please give a password"
        }
        this.passwordErrorMessages = {
          minLength: "Please fill at least 3 characters in a password",
          passwordRequiredMessage: "please give a password"
        }
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

    login(e) {
        const { dispatch } = this.props;
        console.log('login ici');
        dispatch(asyncLogin(this.state.login, this.state.password));
    }

    handleRequestClose() {
      const { dispatch } = this.props;
      const {callback} = this.props.location.query;
      console.log('in handleRequestClose - callback', callback);
      if (typeof callback == 'undefined') {
        dispatch(snackBarClose());
      } else {
        dispatch(push(callback));
      }
    }

    render() {
      const { token, error, hasError, loggedin, dispatch } = this.props;
      console.log("in render, token = ", token);
      console.log("in render, hasError = ", hasError);
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
      var { login, password, canLogin} = this.state;
      var toolbar;
      if (hasError){
        toolbar = (<Toolbar style={styles.box}>
          <span style={styles.errorMessages}> You provided the wrong username and password, please try again</span>
        </Toolbar>);
      }
      return (
        <div>
          <br/>
          <br/>
          {toolbar}
          <Paper style={styles.box}>

            <Form
              onValid={this.enableLogin.bind(this)}
              onInvalid={this.disableLogin.bind(this)}
              onValidSubmit={this.login.bind(this)}>
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
                    <FlatButton label="Cancel" />
                    <FlatButton
                      label="Login"
                      type="submit"
                      primary={true}
                      disabled={!canLogin}
                      />
                  </div>
            </Form>
            <Snackbar
              open={this.props.snackbarDisplayed}
              message="Login successful"
              autoHideDuration={1000}
              onRequestClose={this.handleRequestClose.bind(this)}/>
          </Paper>
        </div>
      );
    }
}

var connectRedefined = function (state) {
  console.log("state=");
  console.dir(state);
  return state.login;
}
export default connect(connectRedefined)(LoginPage);
