/**
 * Stateful container for entire app
 */
import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'react-spinner';
import * as actions from '../actions';
import { isAuthenticatedSelector, tokenSelector } from '../selectors/userSelectors';
import { isSubmittingTransitSelector, isSubmittingSearchSelector } from '../selectors/searchProcessSelectors';
import Nav from '../components/Nav';
import ModalCheckContainer from './ModalCheckContainer';

const propTypes = {
  children: T.node,

  isAuthenticated: T.bool,
  token: T.string,
  isSubmittingTransit: T.bool,
  isSubmittingSearch: T.bool,

  routeToHome: T.func,
  routeToProfile: T.func,
  routeToSearches: T.func,
  changeModal: T.func,
  signOut: T.func,
};

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.renderSpinner = this.renderSpinner.bind(this);
  }

  renderSpinner() {
    const { isSubmittingTransit, isSubmittingSearch } = this.props;
    if (isSubmittingTransit || isSubmittingSearch) {
      return (
        <section className="spinner">
          <Spinner />
        </section>
      );
    }
  }

  render() {
    return (
      <section id="app">
        <Nav {...this.props} />
        <ModalCheckContainer />
        <section className="children">
          {this.props.children}
        </section>
        {this.renderSpinner()}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: isAuthenticatedSelector(state),
    token: tokenSelector(state),
    isSubmittingTransit: isSubmittingTransitSelector(state),
    isSubmittingSearch: isSubmittingSearchSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    routeToHome: () => dispatch(push('/')),
    routeToProfile: () => dispatch(push('/profile')),
    routeToSearches: () => dispatch(push('/searches')),
    signOut: bindActionCreators(actions.signOut, dispatch),
    changeModal: bindActionCreators(actions.changeModal, dispatch),
  };
}

AppContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
