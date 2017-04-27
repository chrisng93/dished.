/**
 * Stateless component for signin
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  isAuthenticated: T.bool,

  changeModal: T.func,
  signIn: T.func,
};

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
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

  onSignIn() {
    const { email, password } = this.state;
    const { signIn } = this.props;
    signIn({ email, password })
  }

  render() {
    const { changeModal } = this.props;
    return (
      <section className="signin">
        <form className="signin-form">
          <input
            className="signin-form-email input"
            type="text"
            name="email"
            placeholder="email"
            onChange={e => this.onChangeInput(e, 'email')}
            onKeyDown={e => this.onKeyDown(e)}
          />
          <input
            className="signin-form-password input"
            type="password"
            name="password"
            placeholder="password"
            onChange={e => this.onChangeInput(e, 'password')}
            onKeyDown={e => this.onKeyDown(e)}
          />
        </form>
        <button className="signin-submit button" onClick={this.onSignIn}>
          Sign In
        </button>
        <section className="signin-route-signup">
          <a onClick={() => changeModal({ currentModal: 'signUp' })}>Don't have an account?</a>
        </section>
      </section>
    );
  }
}

SignIn.propTypes = propTypes;
