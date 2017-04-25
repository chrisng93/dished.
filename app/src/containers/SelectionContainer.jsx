import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

const propTypes = {

};

class SelectionContainer extends Component {
  render() {
    return (
      <section>Selection</section>
    );
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

SelectionContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SelectionContainer);
