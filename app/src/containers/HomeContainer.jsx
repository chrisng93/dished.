import React, { PropTypes as T } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as actions from '../actions';
import Home from '../components/Home';

const propTypes = {
  routeToLocation: T.func,
};

function HomeContainer(props) {
  return (
    <Home {...props} />
  );
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    routeToLocation: () => dispatch(push('/search/location')),
  };
}

HomeContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
