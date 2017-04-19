/**
 * Stateless component for signin
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  isAuthenticated: T.bool,
  signin: T.func,
};

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSignin = this.onSignin.bind(this);
  }

  onChangeInput(e, field) {
    const newState = this.state;
    newState[field] = e.target.value;
    this.setState(newState);
  }

  onSignin() {
    const { email, password } = this.state;
    const { signin } = this.props;
    signin({ email, password })
  }

  render() {
    return (
      <section className="signin">
        <form className="signin-form">
          <input
            className="signin-form-email"
            type="text"
            name="email"
            placeholder="email"
            onChange={(e) => this.onChangeInput(e, 'email')}
          />
          <input
            className="signin-form-password"
            type="password"
            name="password"
            placeholder="password"
            onChange={(e) => this.onChangeInput(e, 'password')}
          />
        </form>
        <button className="signin-submit" onClick={this.onSignin}>
          Sign In
        </button>
      </section>
    );
  }
}

Signin.propTypes = propTypes;
