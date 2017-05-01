/**
 * Stateless component for signin
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  isAuthenticated: T.bool,
  isSigningIn: T.bool,
  error: T.object,

  changeModal: T.func,
  signIn: T.func,
};

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isSigningIn && !nextProps.isSigningIn) {
      if (nextProps.error.get('status') === false) {
        nextProps.changeModal({currentModal: ''});
        return;
      }
      if (nextProps.error.get('message') === 'ajax error 401') {
        this.setState({ error: 'Incorrect email or password' });
      }
      this.setState({ error: 'Error. Please try again' });
    }
  }

  onChangeInput(e, field) {
    const newState = this.state;
    newState[field] = e.target.value;
    this.setState(newState);
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.onSignIn();
    }
  }

  onSignIn() {
    const { email, password } = this.state;
    const { signIn } = this.props;
    if (email && password) {
      signIn({email, password});
      return;
    }
    this.setState({ error: 'Please fill in all of the fields' });
  }

  render() {
    const { error } = this.state;
    const { changeModal } = this.props;
    return (
      <section className="signin">
        <form className="signin-form">
          <input
            className="signin-form-email input"
            type="text"
            name="email"
            placeholder="email"
            autoComplete="off"
            onChange={e => this.onChangeInput(e, 'email')}
            onKeyDown={e => this.onKeyDown(e)}
          />
          <input
            className="signin-form-password input"
            type="password"
            name="password"
            placeholder="password"
            autoComplete="off"
            onChange={e => this.onChangeInput(e, 'password')}
            onKeyDown={e => this.onKeyDown(e)}
          />
        </form>
        <button className="signin-submit button" onClick={this.onSignIn}>
          Sign In
        </button>
        <div className={`error ${error ? '' : 'hidden'}`}>
          {error}
        </div>
        <div className="signin-route-signup">
          <a onClick={() => changeModal({ currentModal: 'signUp' })}>Don't have an account?</a>
        </div>
      </section>
    );
  }
}

SignIn.propTypes = propTypes;
