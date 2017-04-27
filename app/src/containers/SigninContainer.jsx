/**
 * Stateful container for signin
 */
import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { isAuthenticatedSelector } from '../selectors/userSelectors';
import SignIn from '../components/SignIn';

const propTypes = {
  isAuthenticated: T.bool,

  signIn: T.func,
};

class SignInContainer extends Component {
  componentWillMount() {
    this.props.changeModal({ currentModal: 'signIn' });
  }

  render() {
    return (
      <SignIn {...this.props} />
    );
  };
}

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticatedSelector(state),
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
