/**
 * Stateful container for sign up
 */
import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { isSigningUpSelector, userErrorSelector } from '../selectors/userSelectors';
import SignUp from '../components/SignUp';

const propTypes = {
  isSigningUp: T.bool,
  error: T.object,

  changeModal: T.func,
  signUp: T.func,
};

function SignUpContainer(props) {
  return(
    <SignUp {...props} />
  )
}

function mapStateToProps(state) {
  return {
    isSigningUp: isSigningUpSelector(state),
    error: userErrorSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeModal: bindActionCreators(actions.changeModal, dispatch),
    signUp: bindActionCreators(actions.signUp, dispatch),
  };
}

SignUpContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
