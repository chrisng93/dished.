/**
 * Stateless component for ___
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  submitLocation: T.func,
  confirmLocation: T.func,
};

export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      hasSetLocation: false,
    };
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onSubmitLocation = this.onSubmitLocation.bind(this);
    this.onConfirmLocation = this.onConfirmLocation.bind(this);
    this.onUnconfirmLocation = this.onUnconfirmLocation.bind(this);
  }

  onChangeLocation(e) {
    this.setState({ location: e.target.value });
  }

  onSubmitLocation() {
    // TODO: error checking to make sure location is valid (API call to gmaps?)
    // TODO: add confirmation that this is where the user is
    const { submitLocation } = this.props;
    const { location } = this.state;
    submitLocation({ location });
    this.setState({ hasSetLocation: true });
  }

  onConfirmLocation() {
    this.props.confirmLocation();
    this.setState({ hasSetLocation: false });
  }

  onUnconfirmLocation() {
    this.props.submitLocation({ location: '' });
    this.setState({ hasSetLocation: false, location: '' });
  }

  render() {
    const { location, hasSetLocation } = this.state;
    return (
      <section className="location">
        <form className="location-form">
          <input
            className="location-form-address"
            name="location-address"
            placeholder="Where are you?"
            value={location}
            onChange={(e) => this.onChangeLocation(e)}
          />
        </form>
        <button className="location-submit" onClick={this.onSubmitLocation}>
          Send location
        </button>
        <section className="location-confirm">
          <title>Is this where you're at?</title>
          <button className={`location-confirm-yes ${hasSetLocation ? '' : 'hidden'}`} onClick={this.onConfirmLocation}>
            Yes
          </button>
          <button className={`location-confirm-no ${hasSetLocation ? '' : 'hidden'}`} onClick={this.onUnconfirmLocation}>
            No
          </button>
        </section>
      </section>
    );
  }
}

Location.propTypes = propTypes;
