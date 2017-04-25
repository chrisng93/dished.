/**
 * Stateless component for ___
 */
import React, { Component, PropTypes as T } from 'react';
import ReactStars from 'react-stars';

const propTypes = {
};

export default class Selection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { selectedChoice } = this.props;
    return (
      <section>
        <img src={selectedChoice.get('image_url')} />
        {selectedChoice.get('name')}
        <ReactStars count={5} value={selectedChoice.get('rating')} />
        {selectedChoice.get('review_count')} Reviews
        {selectedChoice.get('price')}
        {selectedChoice.get('categories') ? selectedChoice.get('categories').map(category => category.get('title')) : null}
        {selectedChoice.get('location') && selectedChoice.get('location').get('display_address') ? selectedChoice.get('location').get('display_address').join(', ') : null}
      </section>
    );
  }
}

Selection.propTypes = propTypes;
