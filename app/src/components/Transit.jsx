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
      transitMethodOptions: ['Driving', 'Walking', 'Bicycling', 'Transit'],
      transitTime: 0,
      dropdownActive: false,
      error: '',
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmitTransit = this.onSubmitTransit.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onClickDropdown = this.onClickDropdown.bind(this);
  }

  onChangeInput(e, field) {
    const newState = this.state;
    newState[field] = e.target.value;
    this.setState(newState);
  }

  onSubmitTransit() {
    // TODO: handle api errors
    const { submitTransit, location } = this.props;
    let { transitMethod, transitTime } = this.state;
    if (transitMethod && transitTime && parseInt(transitTime)) {
      transitMethod = transitMethod.toUpperCase();
      transitTime = parseInt(transitTime);
      submitTransit({ location, transitMethod: transitMethod.toUpperCase(), transitTime });
      return;
    }
    if (!transitMethod || !transitTime) {
      this.setState({ error: 'Please fill in all fields' });
      return;
    }
    if (!parseInt(transitTime)) {
      this.setState({ error: 'Please set transit time to a number' });
    }
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.onSubmitTransit();
    }
  }

  onClickDropdown(e) {
    this.setState({ transitMethod: e.target.value });
  }

  render() {
    const { transitMethod, transitMethodOptions, error } = this.state;
    return (
      <section className="transit container">
        <form className="transit-form">
          <div className="dropdown">
            <button
              className="transit-form-method dropdown-button input"
              type="text"
              name="transit-method"
            >{transitMethod || 'How are you trying to get there?'}</button>
            <div className="dropdown-content">
              {transitMethodOptions.map(method => <option value={method} onClick={e => this.onClickDropdown(e)}>{method}</option>)}
            </div>
          </div>
          <input
            className="transit-form-time input"
            type="text"
            name="transit-time"
            placeholder="How far do you want to go? (minutes)"
            onChange={e => this.onChangeInput(e, 'transitTime')}
            onKeyDown={e => this.onKeyDown(e)}
          />
        </form>
        <div className={`error ${error ? '' : 'hidden'}`}>
          {error}
        </div>
        <button className="transit-button button" onClick={this.onSubmitTransit}>
          Send transit info
        </button>
      </section>
    );
  }
}

Transit.propTypes = propTypes;
