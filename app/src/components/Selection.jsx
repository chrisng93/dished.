/**
 * Stateless component for ___
 */
import React, { Component, PropTypes as T } from 'react';
import ReactStars from 'react-stars';

const propTypes = {
  selectedChoice: T.object,
  fromUserSearches: T.bool,
};

export default class Selection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { selectedChoice, fromUserSearches } = this.props;
    return (
      <section className={`selection ${selectedChoice.get('id') ? '' : 'hidden'}`}>
        <section className="left">
          <section className="section-1">
            <section className="selection-image-container">
              <img src={selectedChoice.get('image_url')} />
            </section>
            <section className="selection-info">
              <section className="selection-info-name">
                <a href={selectedChoice.get('url')} target="_blank">{selectedChoice.get('name')}</a>
              </section>
              <section className="section-1-1">
                <section className="selection-info-rating">
                  <ReactStars count={5} value={selectedChoice.get('rating')} edit={false} />
                </section>
                <section className="selection-info-review-count">
                  {selectedChoice.get('review_count')} Reviews
                </section>
                <section className="selection-info-price">
                  {selectedChoice.get('price')}
                </section>
              </section>
              <section className="section-1-2">
                <section className="selection-info-phone">
                  {selectedChoice.get('display_phone')}
                </section>
                <section className="selection-info-categories">
                  {selectedChoice.get('categories')
                    ? selectedChoice.get('categories').map((category, index) => {
                      if (index !== selectedChoice.get('categories').size - 1) {
                        return category.get('title') + ', ';
                      }
                      return category.get('title');
                    })
                    : null
                  }
                </section>
                <section className="selection-info-location">
                  {selectedChoice.get('location') && selectedChoice.get('location').get('display_address')
                    ? selectedChoice.get('location').get('display_address').join(', ')
                    : null
                  }
                </section>
              </section>
            </section>
          </section>
          <section className="section-2">
            <section id="directions" />
          </section>
        </section>
        <section className={`right ${fromUserSearches ? '' : 'hidden'}`}>
          <section id="map-user-search" />
        </section>
      </section>
    );
  }
}

Selection.propTypes = propTypes;
