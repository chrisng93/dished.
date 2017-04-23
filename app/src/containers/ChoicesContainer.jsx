import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { choicesSelector } from '../selectors/searchProcessSelectors';

const propTypes = {

};

class ChoicesContainer extends Component {
  render() {
    return (
      <section>
        {this.props.choices.map(choice => <div>{choice.get('name')}</div>)}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    choices: choicesSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

ChoicesContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ChoicesContainer);
