import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import FoodType from '../components/FoodType';

const propTypes = {
  submitFoodType: T.func,
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

  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitFoodType: bindActionCreators(actions.submitFoodType, dispatch),
  };
}

FoodTypeContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(FoodTypeContainer);
