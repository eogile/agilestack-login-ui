'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

var _materialUi = require('material-ui');

var _formsyReact = require('formsy-react');

var _formsyMaterialUi = require('formsy-material-ui');

var _LoginActions = require('../../actions/LoginActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * HomePage
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This is the first thing users see of our App
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

function buildState(props) {
  var callback = props.params.callback;

  return {
    login: '',
    canLogin: false,
    open: false,
    hasError: false,
    callback: callback
  };
}

var _ref = _jsx('br', {});

var _ref2 = _jsx('br', {});

var _ref3 = _jsx(_materialUi.FlatButton, {
  label: 'Cancel'
});

var LoginPage = function (_Component) {
  _inherits(LoginPage, _Component);

  function LoginPage(props) {
    _classCallCheck(this, LoginPage);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LoginPage).call(this, props));

    _this.emailErrorMessages = {
      isEmail: 'Please only use email',
      minLength: 'Please fill at least 6 characters in email',
      passwordRequiredMessage: 'please give a password'
    };
    _this.passwordErrorMessages = {
      minLength: 'Please fill at least 3 characters in a password',
      passwordRequiredMessage: 'please give a password'
    };

    _this.enableLogin = _this.enableLogin.bind(_this);
    _this.disableLogin = _this.disableLogin.bind(_this);
    _this.login = _this.login.bind(_this);
    _this.onSnackbarClose = _this.onSnackbarClose.bind(_this);
    _this.state = buildState(props);
    return _this;
  }

  _createClass(LoginPage, [{
    key: 'enableLogin',
    value: function enableLogin() {
      console.log('enableLogin');
      var canLogin = true;
      this.setState({ canLogin: canLogin });
    }
  }, {
    key: 'disableLogin',
    value: function disableLogin() {
      console.log('disableLogin');
      this.setState({ canLogin: false });
    }
  }, {
    key: 'onChangeLogin',
    value: function onChangeLogin(e) {
      var login = e.target.value;
      console.log('onChangeLogin', login);
      this.setState({ login: login });
    }
  }, {
    key: 'onChangePassword',
    value: function onChangePassword(e) {
      var password = e.target.value;
      console.log('onChangePassword');
      this.setState({ password: password });
    }
  }, {
    key: 'login',
    value: function login() {
      var dispatch = this.props.dispatch;

      console.log('login ici');
      dispatch((0, _LoginActions.asyncLogin)(this.state.login, this.state.password));
    }
  }, {
    key: 'onSnackbarClose',
    value: function onSnackbarClose() {
      var _props = this.props;
      var dispatch = _props.dispatch;
      var location = _props.location;
      var callback = location.query.callback;

      console.log('in handleRequestClose - callback', callback);
      dispatch((0, _LoginActions.snackBarClose)());
      dispatch((0, _reactRouterRedux.push)(callback || '/'));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$login = this.props.login;
      var hasError = _props$login.hasError;
      var snackbarDisplayed = _props$login.snackbarDisplayed;
      var _state = this.state;
      var login = _state.login;
      var password = _state.password;
      var canLogin = _state.canLogin;

      var styles = {
        fieldset: {
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap'
        },
        field: {
          minWidth: 15,
          flex: 1
        },
        bigField: {
          width: '100%',
          marginLeft: 10,
          marginRight: 10
        },
        selectContainer: {
          marginTop: 14
        },
        selectLabel: {
          fontSize: 12,
          opacity: 0.5
        },
        actionBar: {
          width: '100%',
          marginTop: 32,
          display: 'flex',
          justifyContent: 'space-around'
        },
        box: {
          minWidth: 250,
          width: '40%',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
        errorMessages: {
          textAlign: 'center',
          marginLeft: 10,
          marginRight: 10,
          color: 'red'
        }
      };
      return _jsx('div', {}, void 0, _ref, _ref2, hasError && _jsx(_materialUi.Toolbar, {
        style: styles.box
      }, void 0, _jsx('span', {
        style: styles.errorMessages
      }, void 0, ' You provided the wrong username and password, please try again')), _jsx(_materialUi.Paper, {
        style: styles.box
      }, void 0, _jsx(_formsyReact.Form, {
        onValid: this.enableLogin,
        onInvalid: this.disableLogin,
        onValidSubmit: this.login
      }, void 0, _jsx('div', {
        style: styles.fieldset
      }, void 0, _jsx(_formsyMaterialUi.FormsyText, {
        style: styles.bigField,
        name: 'login',
        required: true,
        formNoValidate: true,
        floatingLabelText: 'Email',
        validations: 'isEmail,minLength:6',
        validationErrors: this.emailErrorMessages,
        value: login,
        onChange: this.onChangeLogin.bind(this)
      }, 'login'), _jsx(_formsyMaterialUi.FormsyText, {
        name: 'password',
        style: styles.bigField,
        required: true,
        floatingLabelText: 'Password',
        type: 'password',
        validations: 'minLength:3',
        validationErrors: this.passwordErrorMessages,
        value: password,
        onChange: this.onChangePassword.bind(this)
      }, 'password')), _jsx('div', {
        style: styles.actionBar
      }, void 0, _ref3, _jsx(_materialUi.FlatButton, {
        label: 'Login',
        type: 'submit',
        primary: true,
        disabled: !canLogin
      }))), _jsx(_materialUi.Snackbar, {
        open: snackbarDisplayed,
        message: 'Login successful',
        autoHideDuration: 1000,
        onRequestClose: this.onSnackbarClose
      })));
    }
  }]);

  return LoginPage;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (state) {
  return { login: state.login };
})(LoginPage);