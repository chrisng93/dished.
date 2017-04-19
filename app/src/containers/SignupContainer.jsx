import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import Signup from '../components/Signup';

const propTypes = {
  signup: T.func,
};

function SignupContainer(props) {
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
    signup: bindActionCreators(actions.signup, dispatch),
  };
}

SignupContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
