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
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSubmitLocation = this.onSubmitLocation.bind(this);
    this.onConfirmLocation = this.onConfirmLocation.bind(this);
    this.onUnconfirmLocation = this.onUnconfirmLocation.bind(this);
  }

  onChangeLocation(e) {
    this.setState({ location: e.target.value });
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (!this.state.hasSetLocation) {
        this.onSubmitLocation();
      } else {
        this.onConfirmLocation();
      }
    }
  }

  onSubmitLocation() {
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
      <section className="location container">
        <form className="location-form">
          <input
            className="location-form-address"
            name="location-address"
            placeholder="Where are you?"
            value={location}
            onChange={e => this.onChangeLocation(e)}
            onKeyDown={e => this.onKeyDown(e)}
          />
        </form>
        <button className="location-submit button" onClick={this.onSubmitLocation}>
          Send location
        </button>
        <section className={`location-confirm ${hasSetLocation ? '' : 'hidden'}`}>
          <button className={"location-confirm-continue button"} onClick={this.onConfirmLocation}>
            Continue
          </button>
          <button className={"location-confirm-cancel button"} onClick={this.onUnconfirmLocation}>
            Cancel
          </button>
        </section>
      </section>
    );
  }
}

Location.propTypes = propTypes;
