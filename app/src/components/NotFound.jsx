/**
 * Stateless component for ___
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  routeToHome: T.func,
};

export default function NotFound({ routeToHome }) {
  return (
    <a className="not-found" onClick={routeToHome}>
      Please go back to home page.
    </a>
  );
}

NotFound.propTypes = propTypes;
