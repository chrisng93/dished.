/**
 * Stateless component for ___
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  error: T.object,
  isSubmittingSearch: T.bool,

  submitFoodType: T.func,
  routeToChoices: T.func,
};

export default class FoodType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodType: '',
      error: '',
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isSubmittingSearch && !nextProps.isSubmittingSearch) {
      if (nextProps.error.get('status') === false) {
        nextProps.routeToChoices();
        return;
      }
      this.setState({ error: 'Error. Please try again' });
    }
  }

  onChangeInput(e) {
    this.setState({ foodType: e.target.value });
  }

  onSubmit() {
    const { submitFoodType } = this.props;
    const { foodType } = this.state;
    if (foodType) {
      submitFoodType({ foodType });
      return;
    }
    this.setState({ error: 'Please enter food type' });
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.onSubmit();
    }
  }

  render() {
    // TODO: suggestions/popular
    const { error } = this.state;
    return (
      <section className="food-type container">
        <form className="food-type-form">
          <input
            className="food-type-form-input input"
            name="food-type"
            placeholder="What are you feeling?"
            autoComplete="off"
            onChange={e => this.onChangeInput(e)}
            onKeyDown={e => this.onKeyDown(e)}
          />
        </form>
        <div className={`error ${error ? '' : 'hidden'}`}>
          {error}
        </div>
        <button className="food-type-submit button" onClick={this.onSubmit}>
          Submit food type
        </button>
      </section>
    );
  }
}

FoodType.propTypes = propTypes;
