'use strict';

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * app.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * This is the entry file for the application, mostly just setup and boilerplate
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * code. Routes are configured at the end of this file!
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

// Load the ServiceWorker, the Cache polyfill, the manifest.json file and the .htaccess file


//// Check for ServiceWorker support before trying to install it
//if ('serviceWorker' in navigator) {
//  navigator.serviceWorker.register('/serviceworker.js').then(() => {
//    console.log("service worker registered");// Registration was successful
//  }).catch((err) => {
//    // Registration failed
//    console.log("service worker registration failed.", err);
//  });
//} else {
//  // No ServiceWorker Support
//}

// Import all the third party stuff

//import createHistory from 'history/lib/createBrowserHistory';


require('file?name=[name].[ext]!../serviceworker.js');

require('file?name=[name].[ext]!../manifest.json');

require('file?name=[name].[ext]!../.htaccess');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _fontfaceobserver = require('fontfaceobserver');

var _fontfaceobserver2 = _interopRequireDefault(_fontfaceobserver);

var _history = require('history');

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

var _LoginPage = require('./components/pages/LoginPage.react');

var _LoginPage2 = _interopRequireDefault(_LoginPage);

var _NotFound = require('./components/pages/NotFound.react');

var _NotFound2 = _interopRequireDefault(_NotFound);

var _App = require('./components/App.react');

var _App2 = _interopRequireDefault(_App);

require('../css/main.css');

var _rootReducer = require('./reducers/rootReducer');

var _rootReducer2 = _interopRequireDefault(_rootReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Observer loading of Open Sans (to remove open sans, remove the <link> tag in the index.html file and this observer)
var openSansObserver = new _fontfaceobserver2.default('Open Sans', {});

// When Open Sans is loaded, add the js-open-sans-loaded class to the body
openSansObserver.check().then(function () {
  document.body.classList.add('js-open-sans-loaded');
}, function () {
  document.body.classList.remove('js-open-sans-loaded');
});

// Needed for onTouchTap

(0, _reactTapEventPlugin2.default)();

// Import the pages


// Import the CSS file, which HtmlWebpackPlugin transfers to the build folder


var history = (0, _history.useBasename)(_history.createHistory)({
  basename: window.baseUrl
});

// Create the store with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions

var middlewareHistory = (0, _reactRouterRedux.routerMiddleware)(history);
var createStoreWithMiddleware = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default), (0, _redux.applyMiddleware)(middlewareHistory), window.devToolsExtension ? window.devToolsExtension() : function (f) {
  return f;
})(_redux.createStore);
// const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
var store = createStoreWithMiddleware(_rootReducer2.default);

// Make reducers hot reloadable, see http://stackoverflow.com/questions/34243684/make-redux-reducers-and-other-non-components-hot-loadable
if (module.hot) {
  console.log('hot');
  module.hot.accept('./reducers/rootReducer', function () {
    var nextRootReducer = require('./reducers/rootReducer').default;
    store.replaceReducer(nextRootReducer);
  });
}

// Mostly boilerplate, except for the Routes. These are the pages you can go to,
// which are all wrapped in the App component, which contains the navigation etc
_reactDom2.default.render(_jsx(_reactRedux.Provider, {
  store: store
}, void 0, _jsx(_reactRouter.Router, {
  history: history
}, void 0, _jsx(_reactRouter.Route, {
  path: '/',
  component: _App2.default
}, void 0, _jsx(_reactRouter.IndexRoute, {
  component: _LoginPage2.default
}), _jsx(_reactRouter.Route, {
  path: '*',
  component: _NotFound2.default
})))), document.getElementById('app'));