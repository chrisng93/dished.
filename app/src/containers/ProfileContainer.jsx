import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

const propTypes = {

};

class ProfileContainer extends Component {
  render() {
    return (
      <section>
        Hi
      </section>
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

ProfileContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
