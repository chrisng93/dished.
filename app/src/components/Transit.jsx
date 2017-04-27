/**
 * Stateless component for ___
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  location: T.string,

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
    this.onKeyDown = this.onKeyDown.bind(this);
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

  onKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.onSubmitTransit();
    }
  }

  render() {
    // TODO: make transitMethod a dropdown with valid options
    // TODO: add waiting indicator after submit
    return (
      <section className="transit container">
        <form className="transit-form">
          <input
            className="transit-form-method"
            type="text"
            name="transit-method"
            placeholder="How are you trying to get there?"
            onChange={e => this.onChangeInput(e, 'transitMethod')}
            onKeyDown={e => this.onKeyDown(e)}
          />
          <input
            className="transit-form-time"
            type="text"
            name="transit-time"
            placeholder="How far do you want to go? (minutes)"
            onChange={e => this.onChangeInput(e, 'transitTime')}
            onKeyDown={e => this.onKeyDown(e)}
          />
        </form>
        <button className="transit-button button" onClick={this.onSubmitTransit}>
          Send transit info
        </button>
      </section>
    );
  }
}

Transit.propTypes = propTypes;
