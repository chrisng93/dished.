/**
 * Stateful container for entire app
 */
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { isAuthenticatedSelector } from '../selectors/userSelectors';
import Nav from '../components/Nav';

const propTypes = {
  children: T.node,
  isAuthenticated: T.boolean,
  routeToHome: T.func,
  routeToSignin: T.func,
  routeToSignup: T.func,
  routeToProfile: T.func,
  routeToSearches: T.func,
};

function AppContainer(props) {
  return (
    <section id="app">
      <Nav {...props} />
      {props.children}
    </section>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticatedSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    routeToHome: () => dispatch(push('/')),
    routeToSignin: () => dispatch(push('/signin')),
    routeToSignup: () => dispatch(push('/signup')),
    routeToProfile: () => dispatch(push('/profile')),
    routeToSearches: () => dispatch(push('/searches')),
  };
}

AppContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
