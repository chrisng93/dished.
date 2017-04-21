import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import Location from '../components/Location';

const propTypes = {
  submitLocation: T.func,
  confirmLocation: T.func,
  startSearch: T.func,
};

function LocationContainer(props) {
  return (
    <Location {...props} />
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    submitLocation: bindActionCreators(actions.submitLocation, dispatch),
    confirmLocation: bindActionCreators(actions.confirmLocation, dispatch),
    startSearch: bindActionCreators(actions.startSearchProcess, dispatch),
  };
}

LocationContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(LocationContainer);
