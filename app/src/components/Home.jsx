/**
 * Stateless component for ___
 */
import React, { PropTypes as T } from 'react';

const propTypes = {
  routeToLocation: T.func,
};

export default function Home({ routeToLocation }) {
  return (
    <section className="home">
      <section className="bg" />
      <section className="home-start-container">
        <button className="home-start-search" onClick={routeToLocation}>
          Start your search
        </button>
      </section>
    </section>
  );
}

Home.propTypes = propTypes;
