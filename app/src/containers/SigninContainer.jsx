/**
 * Stateful container for sign in
 */
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { isAuthenticatedSelector, isSigningInSelector, userErrorSelector } from '../selectors/userSelectors';
import SignIn from '../components/SignIn';

const propTypes = {
  isAuthenticated: T.bool,
  isSigningIn: T.bool,
  error: T.object,

  changeModal: T.func,
  signIn: T.func,
};

function SignInContainer(props) {
  return (
    <SignIn {...props} />
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticatedSelector(state),
    isSigningIn: isSigningInSelector(state),
    error: userErrorSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeModal: bindActionCreators(actions.changeModal, dispatch),
    signIn: bindActionCreators(actions.signIn, dispatch),
  };
}

SignInContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);
