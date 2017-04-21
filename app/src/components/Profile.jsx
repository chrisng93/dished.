/**
 * Stateless component for ___
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  user: T.object,
  token: T.string,
  editUser: T.func,
};

export default class Profile extends Component {
  constructor(props) {
    super(props);
    const { user } = props;
    this.state = {
      email: user.get('email') || '',
      password: '',
      name: user.get('name') || '',
      location: user.get('location') || '',
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeInput(e, field) {
    const newState = this.state;
    newState[field] = e.target.value;
    this.setState(newState);
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, password, name, location } = this.state;
    const { user, token, editUser } = this.props;
    const body = { email, name, location, token, id: user.get('id') };
    if (password !== '') {
      body.password = password;
    }
    editUser(body);
  }

  render() {
    const { email, password, name, location } = this.state;
    return (
      <form className="profile">
        <label className="profile-email">
          Email:
          <input
            className="profile-email-input"
            placeholder={email}
            value={email}
            onChange={(e) => this.onChangeInput(e, 'email')}
          />
        </label>
        <label className="profile-password">
          Password:
          <input
            className="profile-password-input"
            type="password"
            placeholder="*********"
            value={password}
            onChange={(e) => this.onChangeInput(e, 'password')}
          />
        </label>
        <label className="profile-name">
          Name:
          <input
            className="profile-name-input"
            placeholder={name}
            value={name}
            onChange={(e) => this.onChangeInput(e, 'name')}
          />
        </label>
        <label className="profile-location">
          Location:
          <input
            className="profile-location-input"
            placeholder={location}
            value={location}
            onChange={(e) => this.onChangeInput(e, 'location')}
          />
        </label>
        <button className="profile-submit" onClick={(e) => this.onSubmit(e)}>
          Submit
        </button>
      </form>
    );
  }
}

Profile.propTypes = propTypes;
