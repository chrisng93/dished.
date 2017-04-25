/**
 * Stateless component for ___
 */
import React, { Component, PropTypes as T } from 'react';
import ReactStars from 'react-stars';

const propTypes = {
  choices: T.array,
  token: T.string,
  searchId: T.string,

  onMouseEnterChoice: T.func,
  onMouseLeaveChoice: T.func,
  selectChoice: T.func,
};

export default class Choice extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { choice, token, searchId, onMouseEnterChoice, onMouseLeaveChoice, selectChoice } = this.props;
    return (
      <section
        onMouseEnter={() => onMouseEnterChoice(choice.get('id'))}
        onMouseLeave={() => onMouseLeaveChoice(choice.get('id'))}
        onClick={() => selectChoice({ token, choice: JSON.parse(JSON.stringify(choice)), id: searchId })}
      >
        <img src={choice.get('image_url')} />
        {choice.get('name')}
        <ReactStars count={5} value={choice.get('rating')} />
        {choice.get('review_count')} Reviews
        {choice.get('price')}
        {choice.get('categories').map(category => category.get('title'))}
        {choice.get('location').get('display_address').join(', ')}
      </section>
    );
  }
}

Choice.propTypes = propTypes;
