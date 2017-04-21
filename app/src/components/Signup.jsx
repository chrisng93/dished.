/**
 * Stateless component for signup
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
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
    this.onSignUp = this.onSignUp.bind(this);
  }

  onChangeInput(e, field) {
    const newState = this.state;
    newState[field] = e.target.value;
    this.setState(newState);
  }

  onSignUp() {
    // TODO: validate that both fields are filled
    // TODO: error handling (from server)
    const { email, password } = this.state;
    const { signUp } = this.props;
    signUp({ email, password });
  }

  render() {
    return (
      <section className="signup">
        <form className="signup-form">
          <input
            className="signup-form-email"
            type="text"
            name="email"
            placeholder="email"
            onChange={(e) => this.onChangeInput(e, 'email')}
          />
          <input
            className="signup-form-password"
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => this.onChangeInput(e, 'password')}
          />
        </form>
        <button className="signup-submit" onClick={this.onSignUp}>
          Sign Up
        </button>
      </section>
    );
  }
}

SignUp.propTypes = propTypes;
