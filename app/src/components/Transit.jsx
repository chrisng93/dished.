/**
 * Stateless component for ___
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  location: T.string,
  isSubmittingTransit: T.bool,
  error: T.object,

  submitTransit: T.func,
  routeToFood: T.func,
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
    this.onClickDropdownButton = this.onClickDropdownButton.bind(this);
    this.onClickDropdownOption = this.onClickDropdownOption.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isSubmittingTransit && !nextProps.isSubmittingTransit) {
      if (nextProps.error.get('status') === false) {
        nextProps.routeToFood();
        return;
      }
      this.setState({ error: 'Error. Please try again' });
    }
  }

  onChangeInput(e, field) {
    const newState = this.state;
    newState[field] = e.target.value;
    this.setState(newState);
  }

  onSubmitTransit() {
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

  onClickDropdownButton(e) {
    e.preventDefault();
    this.setState({ dropdownActive: !this.state.dropdownActive });
  }

  onClickDropdownOption(e) {
    this.setState({
      transitMethod: e.target.value,
      dropdownActive: false,
    });
  }

  render() {
    const { transitMethod, transitMethodOptions, dropdownActive, error } = this.state;
    return (
      <section className="transit container">
        <form className="transit-form">
          <div className={`dropdown ${dropdownActive ? 'active' : ''}`}>
            <button
              className="transit-form-method dropdown-button input"
              type="text"
              name="transit-method"
              onClick={e => this.onClickDropdownButton(e)}
            >
              {transitMethod || 'How are you trying to get there?'}
            </button>
            <div className="dropdown-content">
              {transitMethodOptions.map(method =>
                <option
                  key={method}
                  value={method}
                  onClick={e => this.onClickDropdownOption(e)}
                >
                  {method}
                </option>
              )}
            </div>
          </div>
          <input
            className="transit-form-time input"
            type="text"
            name="transit-time"
            placeholder="How many minutes do you want to travel?"
            autoComplete="off"
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
