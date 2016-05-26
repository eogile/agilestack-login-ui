'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

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

    _this.enableLogin = function () {
      console.log('enableLogin');
      _this.setState({ canSubmit: true });
    };

    _this.disableLogin = function () {
      console.log('disableLogin');
      _this.setState({ canSubmit: false });
    };

    _this.onChangeUsername = function (e) {
      var username = e.target.value;
      console.log('onChangeUsername', username);
      _this.setState({ username: username });
    };

    _this.onChangePassword = function (e) {
      var password = e.target.value;
      console.log('onChangePassword');
      _this.setState({ password: password });
    };

    _this.login = function () {
      var _this$props = _this.props;
      var dispatch = _this$props.dispatch;
      var params = _this$props.params;
      var _this$state = _this.state;
      var username = _this$state.username;
      var password = _this$state.password;

      console.log('login ici');
      dispatch((0, _LoginActions.asyncLogin)(username, password, params.callback));
    };

    var callback = props.params.callback;

    _this.state = {
      username: '',
      password: '',
      canSubmit: false,
      callback: callback
    };
    return _this;
  }

  _createClass(LoginPage, [{
    key: 'render',
    value: function render() {
      var error = this.props.login.error;
      var _state = this.state;
      var username = _state.username;
      var password = _state.password;
      var canSubmit = _state.canSubmit;

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
      return _jsx('div', {}, void 0, _ref, _ref2, !!error && _jsx(_materialUi.Toolbar, {
        style: styles.box
      }, void 0, _jsx('span', {
        style: styles.errorMessages
      }, void 0, error.defaultMessage)), _jsx(_materialUi.Paper, {
        style: styles.box
      }, void 0, _jsx(_formsyReact.Form, {
        onValid: this.enableLogin,
        onInvalid: this.disableLogin,
        onValidSubmit: this.login
      }, void 0, _jsx('div', {
        style: styles.fieldset
      }, void 0, _jsx(_formsyMaterialUi.FormsyText, {
        style: styles.bigField,
        name: 'username',
        required: true,
        formNoValidate: true,
        floatingLabelText: 'Email',
        validations: 'isEmail,minLength:6',
        validationErrors: this.emailErrorMessages,
        value: username,
        onChange: this.onChangeUsername
      }, 'username'), _jsx(_formsyMaterialUi.FormsyText, {
        name: 'password',
        style: styles.bigField,
        required: true,
        floatingLabelText: 'Password',
        type: 'password',
        validations: 'minLength:3',
        validationErrors: this.passwordErrorMessages,
        value: password,
        onChange: this.onChangePassword
      }, 'password')), _jsx('div', {
        style: styles.actionBar
      }, void 0, _ref3, _jsx(_materialUi.FlatButton, {
        label: 'Login',
        type: 'submit',
        primary: true,
        disabled: !canSubmit
      })))));
    }
  }]);

  return LoginPage;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    login: state.login
  };
})(LoginPage);