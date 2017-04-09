/**
 * Containers should hold logic for state management/interaction with Redux store
 */
import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { push } from 'react-router-redux';
import * as actions from '../actions';
import Example from '../components/Example';

const propTypes = {
};

class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div id="app">
        <Example />
      </div>
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

AppContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
