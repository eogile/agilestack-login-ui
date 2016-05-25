'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Component that encapsulates a page. It checks that a user is connected, and if not redirects to the login page.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


exports.default = function (ComposedComponent) {
  var SecuredPage = function (_Component) {
    _inherits(SecuredPage, _Component);

    function SecuredPage() {
      _classCallCheck(this, SecuredPage);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(SecuredPage).apply(this, arguments));
    }

    _createClass(SecuredPage, [{
      key: 'checkLogin',
      value: function checkLogin(props) {
        var currentUser = props.currentUser;
        var location = props.location;
        var router = this.context.router;

        if (!currentUser.loggedIn) {
          console.log('SecuredPage - redirecting to login page');
          router.push({
            pathname: '/login',
            query: {
              callback: location.pathname + location.search
            }
          });
        }
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        console.log('SecuredPage.componentWillMount');
        this.checkLogin(this.props);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(newProps) {
        console.log('SecuredPage.componentWillMount');
        this.checkLogin(newProps);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(ComposedComponent, this.props);
      }
    }]);

    return SecuredPage;
  }(_react.Component);

  SecuredPage.contextTypes = {
    router: _reactRouter.routerShape
  };

  return (0, _reactRedux.connect)(function (state) {
    return { currentUser: state.currentUser };
  })(SecuredPage);
};