/**
 * Stateless component for ___
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  submitFoodType: T.func,
};

export default class FoodType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foodType: '',
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeInput(e) {
    this.setState({ foodType: e.target.value });
  }

  onSubmit() {
    // TODO: make sure food type selected
    // TODO: handle errors from server
    const { submitFoodType } = this.props;
    const { foodType } = this.state;
    submitFoodType({ foodType });
  }

  render() {
    // TODO: dropdown w/ food type options
    // TODO: suggestions/popular
    return (
      <section className="food-type">
        <form className="food-type-form">
          <input
            className="food-type-form-input"
            name="food-type"
            placeholder="What are you feeling?"
            onChange={(e) => this.onChangeInput(e)}
          />
        </form>
        <button className="food-type-submit" onSubmit={this.onSubmit}>
          Submit food type
        </button>
      </section>
    );
  }
}

FoodType.propTypes = propTypes;
