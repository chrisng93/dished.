import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { isAuthenticatedSelector } from '../selectors/userSelectors';

const propTypes = {
  children: T.node,
};

class EnsureAuthenticationContainer extends Component {
  componentWillMount() {
    const { isAuthenticated, routeToHome } = this.props;
    if (!isAuthenticated) {
      routeToHome();
    }
  }

  render() {
    return (
      <section>
        {this.props.children}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticatedSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    routeToHome: () => dispatch(push('/')),
  };
}

EnsureAuthenticationContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(EnsureAuthenticationContainer);
