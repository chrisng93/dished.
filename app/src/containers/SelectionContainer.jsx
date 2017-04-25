import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { selectedChoiceSelector } from '../selectors/searchProcessSelectors';
import Selection from '../components/Selection';

const propTypes = {
  selectedChoice: T.object,
};

function SelectionContainer(props) {
  return (
    <Selection {...props} />
  );
}

function mapStateToProps(state) {
  return {
    selectedChoice: selectedChoiceSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

SelectionContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SelectionContainer);
