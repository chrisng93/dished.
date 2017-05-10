/**
 * Dumb component for sign up modal
 */
import React, { Component, PropTypes as T } from 'react';
import Modal from 'react-modal';
import modalStyle from '../utils/modalStyle';
import SignUpContainer from '../containers/SignUpContainer';

const propTypes = {
  changeModal: T.func,
};

export default class SignUpModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
    this.onClose = this.onClose.bind(this);
  }

  componentWillMount() {
    this.setState({ modalIsOpen: true });
  }

  onClose() {
    this.props.changeModal({ currentModal: '' });
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { modalIsOpen } = this.state;
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={this.onClose}
        shouldCloseOnOverlayClick={true}
        style={modalStyle}
        contentLabel="Modal"
      >
        <SignUpContainer />
      </Modal>
    );
  }
}

SignUpModal.propTypes = propTypes;
