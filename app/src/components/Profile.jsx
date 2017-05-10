/**
 * Dumb component for user profile
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  user: T.object,
  token: T.string,
  isEditingUser: T.bool,
  error: T.object,

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
      message: '',
      isError: false,
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isEditingUser && !nextProps.isEditingUser) {
      this.setState({ message: 'Profile successfully updated', isError: false });
    }
    if (nextProps.error.get('status') === true) {
      this.setState({ message: 'Error updating profile', isError: true });
    }
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
    const { email, password, name, location, message, isError } = this.state;
    return (
      <section className="profile">
        <form>
          <label className="profile-email">
            <input
              className="profile-email-input input"
              placeholder={email || 'Email'}
              value={email}
              autoComplete="off"
              onChange={e => this.onChangeInput(e, 'email')}
            />
          </label>
          <label className="profile-password">
            <input
              className="profile-password-input input"
              type="password"
              placeholder="*********"
              value={password}
              autoComplete="off"
              onChange={e => this.onChangeInput(e, 'password')}
            />
          </label>
          <label className="profile-name">
            <input
              className="profile-name-input input"
              placeholder={name || 'Name'}
              value={name}
              autoComplete="off"
              onChange={e => this.onChangeInput(e, 'name')}
            />
          </label>
          <label className="profile-location">
            <input
              className="profile-location-input input"
              placeholder={location || 'Location'}
              value={location}
              autoComplete="off"
              onChange={e => this.onChangeInput(e, 'location')}
            />
          </label>
          <button className="profile-submit button" onClick={(e) => this.onSubmit(e)}>
            Submit
          </button>
          <div className={`message ${isError ? 'error': ''}`}>
            {message}
          </div>
        </form>
        <img src="https://s3-us-west-1.amazonaws.com/dishassist/profile.jpg" />
      </section>
    );
  }
}

Profile.propTypes = propTypes;
