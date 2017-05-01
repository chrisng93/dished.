/**
 * Stateless component for ___
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  isAuthenticated: T.bool,
  token: T.string,

  routeToHome: T.func,
  routeToProfile: T.func,
  routeToSearches: T.func,
  changeModal: T.func,
  signOut: T.func,
};

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.renderAuthed = this.renderAuthed.bind(this);
    this.renderUnauthed = this.renderUnauthed.bind(this);
  }

  renderUnauthed() {
    const { changeModal } = this.props;
    return (
      <div className="nav-cluster">
        <li className="nav-cluster-signin" onClick={() => changeModal({ currentModal: 'signIn' })}>Sign in</li>
        <li className="nav-cluster-signup" onClick={() => changeModal({ currentModal: 'signUp' })}>Sign up</li>
      </div>
    );
  }

  renderAuthed() {
    const { token, routeToProfile, routeToSearches, signOut } = this.props;
    return (
      <div className="nav-cluster">
        <li className="nav-cluster-profile" onClick={routeToProfile}>Profile</li>
        <li className="nav-cluster-searches" onClick={routeToSearches}>Searches</li>
        <li className="nav-cluster-signout" onClick={() => signOut({ token })}>Sign out</li>
      </div>
    );
  }

  render() {
    const { isAuthenticated, routeToHome } = this.props;
    return (
      <ul className="nav">
        <li className="nav-home" onClick={routeToHome}>Home</li>
        {isAuthenticated ? this.renderAuthed() : this.renderUnauthed()}
      </ul>
    );
  }
}

Nav.propTypes = propTypes;
