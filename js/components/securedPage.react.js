/**
 * Component that encapsulates a page. It checks that a user is connected, and if not redirects to the login page.
 */
import React, {Component} from "react";
import {connect} from 'react-redux';
import {routerShape} from 'react-router';

export default (ComposedComponent) => {
  class SecuredPage extends Component {

    static contextTypes = {
      router: routerShape
    };

    checkLogin(props) {
      const {currentUser, location} = props;
      const {router} = this.context;
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

    componentWillMount() {
      console.log('SecuredPage.componentWillMount');
      this.checkLogin(this.props);
    }

    componentWillReceiveProps(newProps) {
      console.log('SecuredPage.componentWillMount');
      this.checkLogin(newProps);
    }

    render() {
      return <ComposedComponent {...this.props}/>;
    }
  }
  return connect(state => ({currentUser: state.currentUser}))(SecuredPage);
};
