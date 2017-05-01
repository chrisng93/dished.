import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as actions from '../actions';
import { isSubmittingSearchSelector, searchProcessErrorSelector } from '../selectors/searchProcessSelectors';
import FoodType from '../components/FoodType';

const propTypes = {
  error: T.object,
  isSubmittingSearch: T.bool,

  submitFoodType: T.func,
  routeToChoices: T.func,
};

class FoodTypeContainer extends Component {
  render() {
    return (
      <FoodType {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    error: searchProcessErrorSelector(state),
    isSubmittingSearch: isSubmittingSearchSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitFoodType: bindActionCreators(actions.submitFoodType, dispatch),
    routeToChoices: () => dispatch(push('/search/choices')),
  };
}

FoodTypeContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(FoodTypeContainer);
