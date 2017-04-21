/**
 * Stateful container for signin
 */
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { isAuthenticatedSelector } from '../selectors/userSelectors';
import SignInModal from '../components/SignInModal';

const propTypes = {
  isAuthenticated: T.bool,
  signIn: T.func,
};

function SignInContainer(props) {
  return (
    <SignInModal {...props} />
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticatedSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: bindActionCreators(actions.signIn, dispatch),
  };
}

SignInContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer);
