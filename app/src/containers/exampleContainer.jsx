import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

const propTypes = {

};

class ExampleContainer extends Component {
  render() {
    return ();
  }
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

ExampleContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ExampleContainer);
