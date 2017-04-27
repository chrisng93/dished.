/**
 * Stateful container for entire app
 */
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { isAuthenticatedSelector, tokenSelector } from '../selectors/userSelectors';
import Nav from '../components/Nav';

const propTypes = {
  children: T.node,

  isAuthenticated: T.bool,
  token: T.string,

  routeToHome: T.func,
  routeToSignIn: T.func,
  routeToSignUp: T.func,
  routeToProfile: T.func,
  routeToSearches: T.func,
  signOut: T.func,
};

function AppContainer(props) {
  return (
    <section id="app">
      <Nav {...props} />
      <section className="children">
        {props.children}
      </section>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticatedSelector(state),
    token: tokenSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    routeToHome: () => dispatch(push('/')),
    routeToSignIn: () => dispatch(push('/signin')),
    routeToSignUp: () => dispatch(push('/signup')),
    routeToProfile: () => dispatch(push('/profile')),
    routeToSearches: () => dispatch(push('/searches')),
    signOut: bindActionCreators(actions.signOut, dispatch),
  };
}

AppContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
