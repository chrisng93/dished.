import React, { Component, PropTypes as T } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as actions from '../actions';
import NotFoundModal from '../components/NotFoundModal';

const propTypes = {
  changeModal: T.func,
};

class NotFoundContainer extends Component {
  componentDidMount() {
    this.props.changeModal({ currentModal: 'notFound' });
  }

  render() {
    return (
      <section />
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeModal: bindActionCreators(actions.changeModal, dispatch),
  };
}

NotFoundContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(NotFoundContainer);
