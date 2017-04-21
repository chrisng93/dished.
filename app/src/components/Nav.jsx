/**
 * Stateless component for ___
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  isAuthenticated: T.boolean,
  routeToHome: T.func,
  routeToSignin: T.func,
  routeToSignup: T.func,
  routeToProfile: T.func,
  routeToSearches: T.func,
};

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.renderSignin = this.renderSignin.bind(this);
    this.renderSignup = this.renderSignup.bind(this);
    this.renderProfile = this.renderProfile.bind(this);
    this.renderSearches = this.renderSearches.bind(this);
  }

  renderSignin() {
    return (
      <li className="nav-signin" onClick={this.props.routeToSignin}>Sign in</li>
    );
  }

  renderSignup() {
    return (
      <li className="nav-signup" onClick={this.props.routeToSignup}>Sign up</li>
    );
  }

  renderProfile() {
    return (
      <li className="nav-profile" onClick={this.props.routeToProfile}>Profile</li>
    );
  }

  renderSearches() {
    return (
      <li className="nav-searches" onClick={this.props.routeToSearches}>Searches</li>
    );
  }

  render() {
    const { isAuthenticated, routeToHome } = this.props;
    return (
      <ul className="nav">
        <li className="nav-home" onClick={routeToHome}>Home</li>
        {isAuthenticated ? null : this.renderSignin()}
        {isAuthenticated ? null : this.renderSignup()}
        {isAuthenticated ? this.renderProfile() : null}
        {isAuthenticated ? this.renderSearches() : null}
      </ul>
    );
  }
}

Nav.propTypes = propTypes;
