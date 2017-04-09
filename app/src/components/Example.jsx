/**
 * Components should deal with rendering and logic associated with rendering
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
};

export default class Example extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Hello World!
      </div>
    );
  }
}

Example.propTypes = propTypes;
