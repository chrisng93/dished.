/**
 * Stateless component for ___
 */
import React, { Component, PropTypes as T } from 'react';
import ReactStars from 'react-stars';

const propTypes = {
  choice: T.object,
  token: T.string,
  searchId: T.number,
  rank: T.number,

  onMouseEnterChoice: T.func,
  onMouseLeaveChoice: T.func,
  selectChoice: T.func,
};

export default class Choice extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { choice, token, searchId, rank, onMouseEnterChoice, onMouseLeaveChoice, selectChoice } = this.props;
    return (
      <section
        className="choice"
        onMouseEnter={() => onMouseEnterChoice(choice.get('id'))}
        onMouseLeave={() => onMouseLeaveChoice(choice.get('id'))}
        onClick={() => selectChoice({ token, choice: JSON.parse(JSON.stringify(choice)), id: searchId })}
      >
        <section className="choice-rank">
          {rank}.
        </section>
        <section className="choice-thumbnail">
          <img src={choice.get('image_url')} />
        </section>
        <section className="choice-info">
          <h1>
            <section className="choice-info-name">
              <a href={choice.get('url')} target="_blank">{choice.get('name')}</a>
            </section>
            <section className="choice-info-rating">
              <ReactStars count={5} value={choice.get('rating')} />
            </section>
            <section className="choice-info-review-count">
              {choice.get('review_count')} reviews
            </section>
            <section className="choice-info-price">
              {choice.get('price')}
            </section>
          </h1>
          <h3>
            <section className="choice-info-phone">
              {choice.get('display_phone')}
            </section>
            <section className="choice-info-categories">
              {choice.get('categories').map((category, index) => {
                if (index !== choice.get('categories').size - 1) {
                  return category.get('title') + ', ';
                }
                return category.get('title');
              })}
            </section>
            <section className="choice-info-location">
              {choice.get('location').get('display_address').join(', ')}
            </section>
          </h3>
        </section>
      </section>
    );
  }
}

Choice.propTypes = propTypes;
