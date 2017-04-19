/**
 * Stateless component for ___
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  submitLocation: T.func,
};

export default class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
    };
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onSubmitLocation = this.onSubmitLocation.bind(this);
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
  }

  render() {
    return (
      <section className="location">
        <form className="location-form">
          <input
            className="location-form-address"
            name="location-address"
            placeholder="Where are you?"
            onChange={(e) => this.onChangeLocation(e)}
          />
        </form>
        <button className="location-submit" onClick={this.onSubmitLocation}>
          Send location
        </button>
      </section>
    );
  }
}

Location.propTypes = propTypes;
