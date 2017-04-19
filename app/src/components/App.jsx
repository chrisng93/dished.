/**
 * Stateful container for entire app
 */
import React, { PropTypes as T } from 'react';

const propTypes = {
  children: T.node,
};

export default function App(props) {
  return (
    <section id="app">
      {props.children}
    </section>
  );
}

App.propTypes = propTypes;
