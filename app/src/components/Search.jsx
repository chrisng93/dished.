/**
 * Stateless component for ___
 */
import React, { PropTypes as T } from 'react';

const propTypes = {
  search: T.object,
};

const formatTransitMethod = (str) => {
  str = str.toLowerCase();
  str = str.split('');
  str[0] = str[0].toUpperCase();
  return str.join('');
};

const formatCreatedAt = str => str.split(' ').slice(0, 4).join(' ');

export default function Search({ search }) {
  return (
    <section className="search">
      <div className="section-1">
        <h1>
          {search.get('selection')}
        </h1>
      </div>
      <div className="section-2">
        <div className="section-2-1">
          <div className="search-location">
            <b>Location:</b> {search.get('user_location')}
          </div>
          <div className="search-food">
            <b>Food Type:</b> {search.get('food_type')}
          </div>
        </div>
        <div className="section-2-2">
          <div className="search-transit-method">
            <b>Transit Method:</b> {formatTransitMethod(search.get('transit_method'))}
          </div>
          <div className="search-date">
            <b>Date:</b> {formatCreatedAt(search.get('created_at'))}
          </div>
        </div>
      </div>
    </section>
  );
}

Search.propTypes = propTypes;
