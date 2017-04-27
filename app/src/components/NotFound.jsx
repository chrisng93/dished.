/**
 * Stateless component for ___
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  routeToHome: T.func,
};

export default function NotFound({ routeToHome }) {
  return (
    <section className="not-found">
      <h1>
        Page not found.
      </h1>
      <a onClick={routeToHome}>
        Please go back to the home page.
      </a>
    </section>
  );
}

NotFound.propTypes = propTypes;
