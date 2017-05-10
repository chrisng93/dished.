/**
 * Dumb component for rendering choice
 */
import React, { PropTypes as T } from 'react';
import ReactStars from 'react-stars';

const propTypes = {
  choice: T.object,
  searchId: T.string,
  rank: T.number,

  onMouseEnterChoice: T.func,
  onMouseLeaveChoice: T.func,
  selectChoice: T.func,
};

export default function Choice(props) {
  const { choice, searchId, rank, onMouseEnterChoice, onMouseLeaveChoice, selectChoice } = props;
  return (
    <section
      className="choice"
      onMouseEnter={() => onMouseEnterChoice(choice.get('id'))}
      onMouseLeave={() => onMouseLeaveChoice(choice.get('id'))}
      onClick={() => selectChoice({ choice: JSON.parse(JSON.stringify(choice)), id: searchId })}
    >
      <div className="choice-rank">
        {rank}.
      </div>
      <div className="choice-thumbnail">
        <img src={choice.get('image_url')} />
      </div>
      <div className="choice-info">
        <h1>
          <div className="choice-info-name">
            <a href={choice.get('url')} target="_blank">{choice.get('name')}</a>
          </div>
          <div className="choice-info-rating">
            <ReactStars count={5} value={choice.get('rating')} edit={false} />
          </div>
          <div className="choice-info-review-count">
            {choice.get('review_count')} reviews
          </div>
          <div className="choice-info-price">
            {choice.get('price')}
          </div>
        </h1>
        <h3>
          <div className="choice-info-phone">
            {choice.get('display_phone')}
          </div>
          <div className="choice-info-categories">
            {choice.get('categories').map((category, index) => {
              if (index !== choice.get('categories').size - 1) {
                return category.get('title') + ', ';
              }
              return category.get('title');
            })}
          </div>
          <div className="choice-info-location">
            {choice.get('location').get('display_address').join(', ')}
          </div>
        </h3>
      </div>
    </section>
  );
}

Choice.propTypes = propTypes;
