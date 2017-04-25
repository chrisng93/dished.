/**
 * Stateless component for ___
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
};

export default class Choice extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { choice, token, onMouseEnterChoice, onMouseLeaveChoice, selectChoice } = this.props;
    return (
      <section
        onMouseEnter={() => onMouseEnterChoice(choice.get('id'))}
        onMouseLeave={() => onMouseLeaveChoice(choice.get('id'))}
        onClick={() => selectChoice({ token, choice: JSON.parse(JSON.stringify(choice)) })}
      >
        <img src={choice.get('image_url')} />
        {choice.get('name')}
        {choice.get('rating')}
        {choice.get('review_count')} Reviews
        {choice.get('price')}
        {choice.get('categories').map(category => category.get('title'))}
        {choice.get('location').get('display_address').join(', ')}
      </section>
    );
  }
}

Choice.propTypes = propTypes;
