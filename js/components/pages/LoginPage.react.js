/*
 * HomePage
 * This is the first thing users see of our App
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Paper, FlatButton, Toolbar} from 'material-ui';
import {Form} from 'formsy-react'
import {FormsyText} from 'formsy-material-ui';
import {asyncLogin} from '../../actions/LoginActions';

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
    const {callback} = props.params;
    this.state = {
      username: '',
      password: '',
      canSubmit: false,
      callback
    };
  }

  enableLogin = () => {
    console.log('enableLogin');
    this.setState({canSubmit: true})
  };

  disableLogin = () => {
    console.log('disableLogin');
    this.setState({canSubmit: false})
  };

  onChangeUsername = (e) => {
    const username = e.target.value;
    console.log('onChangeUsername', username);
    this.setState({username})
  };

  onChangePassword = (e) => {
    const password = e.target.value;
    console.log('onChangePassword');
    this.setState({password})
  };

  login = () => {
    const {dispatch, location} = this.props;
    const {username, password} = this.state;
    const {callback} = location.query;
    console.log('login', callback, location);
    dispatch(asyncLogin(username, password, callback));
  };

  render() {
    const {error} = this.props.login;
    const {username, password, canSubmit} = this.state;
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
        {!!error && (
          <Toolbar style={styles.box}>
            <span style={styles.errorMessages}>{error.defaultMessage}</span>
          </Toolbar>
        )}
        <Paper style={styles.box}>

          <Form
            onValid={this.enableLogin}
            onInvalid={this.disableLogin}
            onValidSubmit={this.login}>
            <div style={styles.fieldset}>
              <FormsyText
                key="username"
                style={styles.bigField}
                name="username"
                required
                formNoValidate
                floatingLabelText="Email"
                validations="isEmail,minLength:6"
                validationErrors={this.emailErrorMessages}
                value={username}
                onChange={this.onChangeUsername}/>
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
                onChange={this.onChangePassword}/>
            </div>
            <div style={styles.actionBar}>
              <FlatButton label="Cancel"/>
              <FlatButton
                label="Login"
                type="submit"
                primary={true}
                disabled={!canSubmit}
              />
            </div>
          </Form>
        </Paper>
      </div>
    );
  }
}

export default connect(state => ({
  login: state.login,
}))(LoginPage);
