import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import NotFoundModal from '../components/NotFoundModal';

const propTypes = {
  routeToHome: T.func,
};

function NotFoundContainer(props) {
  return (
    <NotFoundModal />
  );
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    routeToHome: () => dispatch(push('/')),
  };
}

NotFoundContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(NotFoundContainer);
