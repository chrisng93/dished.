import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as actions from '../actions';
import { locationSelector, isSubmittingTransitSelector, searchProcessErrorSelector } from '../selectors/searchProcessSelectors';
import Transit from '../components/Transit';

const propTypes = {
  location: T.string,
  isSubmittingTransit: T.bool,
  error: T.object,

  submitTransit: T.func,
  routeToFood: T.func,
};

function TransitContainer(props) {
  return (
    <Transit {...props} />
  );
}

function mapStateToProps(state) {
  return {
    location: locationSelector(state),
    isSubmittingTransit: isSubmittingTransitSelector(state),
    error: searchProcessErrorSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitTransit: bindActionCreators(actions.submitTransit, dispatch),
    routeToFood: () => dispatch(push('/search/food')),
  };
}

TransitContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(TransitContainer);
