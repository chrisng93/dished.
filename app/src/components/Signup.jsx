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
      error: '',
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
      this.onSignUp();
    }
  }

  onSignUp() {
    // TODO: handle api errors
    const { email, password } = this.state;
    const { signUp, changeModal } = this.props;
    if (email && password) {
      signUp({ email, password });
      changeModal({ currentModal: '' });
      return;
    }
    this.setState({ error: 'Please fill in all of the fields' });
  }

  render() {
    const { error } = this.state;
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
        <div className={`error ${error ? '' : 'hidden'}`}>
          {error}
        </div>
        <div className="signup-route-signin">
          <a onClick={() => changeModal({ currentModal: 'signIn' })}>Already have an account?</a>
        </div>
      </section>
    );
  }
}

SignUp.propTypes = propTypes;
