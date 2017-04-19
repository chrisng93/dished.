import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Home from '../components/Home';

const propTypes = {
  routeToSearchProcess: T.func,
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
    routeToSearchProcess: () => dispatch(push('/search/location')),
  };
}

HomeContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
