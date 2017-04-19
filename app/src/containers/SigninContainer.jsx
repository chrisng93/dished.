/**
 * Stateful container for signin
 */
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { isAuthenticatedSelector } from '../selectors/userSelectors';
import Signin from '../components/Signin';

const propTypes = {
  isAuthenticated: T.bool,
  signin: T.func,
};

function SigninContainer(props) {
  return (
    <Signin {...props} />
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticatedSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signin: bindActionCreators(actions.signin, dispatch),
  };
}

SigninContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SigninContainer);
