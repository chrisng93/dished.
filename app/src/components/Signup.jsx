/**
 * Stateless component for signup
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  changeModal: T.func,
  signUp: T.func,
};

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  onChangeInput(e, field) {
    const newState = this.state;
    newState[field] = e.target.value;
    this.setState(newState);
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.onSubmit();
    }
  }

  onSignUp() {
    // TODO: validate that both fields are filled
    // TODO: error handling (from server)
    const { email, password } = this.state;
    const { signUp } = this.props;
    signUp({ email, password });
  }

  render() {
    const { changeModal } = this.props;
    return (
      <section className="signup">
        <form className="signup-form">
          <input
            className="signup-form-email input"
            type="text"
            name="email"
            placeholder="email"
            onChange={e => this.onChangeInput(e, 'email')}
            onKeyDown={e => this.onKeyDown(e)}
          />
          <input
            className="signup-form-password input"
            type="password"
            name="password"
            placeholder="password"
            onChange={e => this.onChangeInput(e, 'password')}
            onKeyDown={e => this.onKeyDown(e)}
          />
        </form>
        <button className="signup-submit button" onClick={this.onSignUp}>
          Sign Up
        </button>
        <section className="signup-route-signin">
          <a onClick={() => changeModal({ currentModal: 'signIn' })}>Already have an account?</a>
        </section>
      </section>
    );
  }
}

SignUp.propTypes = propTypes;
