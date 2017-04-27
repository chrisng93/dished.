import React, { Component, PropTypes as T } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { currentModalSelector } from '../selectors/modalSelectors';
import * as actions from '../actions';
import SignInModal from '../components/SignInModal';
import SignUpModal from '../components/SignUpModal';
import NotFoundModal from '../components/NotFoundModal';

const propTypes = {
  currentModal: T.string,

  changeModal: T.func,
  routeToHome: T.func,
};

class ModalCheckContainer extends Component {
  constructor(props) {
    super(props);
    this.renderModal = this.renderModal.bind(this);
  }

  renderModal() {
    const { currentModal } = this.props;
    switch (currentModal) {
      case 'signIn':
        return <SignInModal {...this.props} />;
      case 'signUp':
        return <SignUpModal {...this.props} />;
      case 'notFound':
        return <NotFoundModal {...this.props} />;
      default:
        return null;
    }
  }

  render() {
    return (
      <section>
        {this.renderModal()}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentModal: currentModalSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeModal: bindActionCreators(actions.changeModal, dispatch),
    routeToHome: () => dispatch(push('/')),
  };
}

ModalCheckContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ModalCheckContainer);
