/**
 * Dumb component for selected restaurant
 */
import React, { Component, PropTypes as T } from 'react';
import ReactStars from 'react-stars';

const propTypes = {
  selectedChoice: T.object,
};

export default function Selection({ selectedChoice }) {
  return (
    <section className={`selection ${selectedChoice.get('id') ? '' : 'hidden'}`}>
      <div className="left">
        <div className="section-1">
          <div className="selection-image-container">
            <img src={selectedChoice.get('image_url')} />
          </div>
          <div className="selection-info">
            <div className="selection-info-name">
              <a href={selectedChoice.get('url')} target="_blank">{selectedChoice.get('name')}</a>
            </div>
            <div className="section-1-1">
              <div className="selection-info-rating">
                <ReactStars count={5} value={selectedChoice.get('rating')} edit={false} />
              </div>
              <div className="selection-info-review-count">
                {selectedChoice.get('review_count')} Reviews
              </div>
              <div className="selection-info-price">
                {selectedChoice.get('price')}
              </div>
            </div>
            <div className="section-1-2">
              <div className="selection-info-phone">
                {selectedChoice.get('display_phone')}
              </div>
              <div className="selection-info-categories">
                {selectedChoice.get('categories')
                  ? selectedChoice.get('categories').map((category, index) => {
                    if (index !== selectedChoice.get('categories').size - 1) {
                      return category.get('title') + ', ';
                    }
                    return category.get('title');
                  })
                  : null
                }
              </div>
              <div className="selection-info-location">
                {selectedChoice.get('location') && selectedChoice.get('location').get('display_address')
                  ? selectedChoice.get('location').get('display_address').join(', ')
                  : null
                }
              </div>
            </div>
          </div>
        </div>
        <div className="section-2">
          <div id="directions" />
        </div>
      </div>
    </section>
  );
}

Selection.propTypes = propTypes;
