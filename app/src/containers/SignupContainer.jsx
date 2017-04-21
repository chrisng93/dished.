import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import Signup from '../components/SignUp';

const propTypes = {
  signUp: T.func,
};

function SignUpContainer(props) {
  return(
    <Signup {...props} />
  )
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    signUp: bindActionCreators(actions.signUp, dispatch),
  };
}

SignUpContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
