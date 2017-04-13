/**
 * Stateless component for login
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
};

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div onClick={() => this.props.login({ email: 'test2@test.com', password: '1' })}>
        Hello World!
      </div>
    );
  }
}

Login.propTypes = propTypes;
