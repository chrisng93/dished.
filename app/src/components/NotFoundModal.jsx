/**
 * Dumb component for not found modal
 */
import React, { Component, PropTypes as T } from 'react';
import Modal from 'react-modal';
import modalStyle from '../utils/modalStyle';;
import NotFound from './NotFound';

const propTypes = {
  changeModal: T.func,
  routeToHome: T.func,
};

export default class NotFoundModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
    this.onClose = this.onClose.bind(this);
  }

  componentWillMount() {
    this.props.changeModal({ currentModal: 'notFound' });
    this.setState({ modalIsOpen: true });
  }

  onClose() {
    const { changeModal, routeToHome } = this.props;
    changeModal({ currentModal: '' });
    routeToHome();
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { modalIsOpen } = this.state;
    const { routeToHome } = this.props;
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={this.onClose}
        shouldCloseOnOverlayClick={true}
        style={modalStyle}
        contentLabel="Modal"
      >
        <NotFound routeToHome={routeToHome} />
      </Modal>
    );
  }
}

NotFoundModal.propTypes = propTypes;
