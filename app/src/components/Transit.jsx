/**
 * Stateless component for ___
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  submitTransit: T.func,
};

export default class Transit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transitMethod: '',
      transitTime: 0,
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmitTransit = this.onSubmitTransit.bind(this);
  }

  onChangeInput(e, field) {
    const newState = this.state;
    newState[field] = e.target.value;
    this.setState(newState);
  }

  onSubmitTransit() {
    // TODO: error checking to make sure fields are filled out and that transitTime is an int
    const { submitTransit, location } = this.props;
    let { transitMethod, transitTime } = this.state;
    transitMethod = transitMethod.toUpperCase();
    transitTime = parseInt(transitTime);
    submitTransit({ location, transitMethod, transitTime });
  }

  render() {
    // TODO: make transitMethod a dropdown with valid options
    // TODO: add waiting indicator after submit
    return (
      <section className="transit">
        <form className="transit-form">
          <input
            className="transit-form-method"
            type="text"
            name="transit-method"
            placeholder="How are you trying to get there?"
            onChange={(e) => this.onChangeInput(e, 'transitMethod')}
          />
          <input
            className="transit-form-time"
            type="text"
            name="transit-time"
            placeholder="How far do you want to go? (minutes)"
            onChange={(e) => this.onChangeInput(e, 'transitTime')}
          />
        </form>
        <button className="transit-button" onClick={this.onSubmitTransit}>
          Send transit info
        </button>
      </section>
    );
  }
}

Transit.propTypes = propTypes;
