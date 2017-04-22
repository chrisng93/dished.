import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { locationSelector } from '../selectors/searchProcessSelectors';
import Transit from '../components/Transit';

const propTypes = {
  location: T.string,

  submitTransit: T.func,
};

class TransitContainer extends Component {
  render() {
    return (
      <Transit {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    location: locationSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitTransit: bindActionCreators(actions.submitTransit, dispatch),
  };
}

TransitContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(TransitContainer);
