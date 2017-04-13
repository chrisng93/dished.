/**
 * Stateful container for login
 */
import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import Login from '../components/Login';

const propTypes = {
};

class LoginContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Login {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(actions.login, dispatch),
  };
}

LoginContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
