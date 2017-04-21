import React, { Component, PropTypes as T } from 'react';
import Modal from 'react-modal';
import Signin from './SignIn';

const propTypes = {};

export default class SigninModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    this.openModal();
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  render() {
    const { isOpen } = this.state;
    return (
      <Modal
        className="modal"
        isOpen={isOpen}
        onRequestClose={this.closeModal}
        contentLabel="signin-modal"
      >
        <Signin {...this.props} />
      </Modal>
    );
  }
}

SigninModal.propTypes = propTypes;
