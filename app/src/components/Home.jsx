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
        <h1 className="home-start-title">
          dished.
        </h1>
        <h3 className="home-start-blurb">
          Find out what to eat near you
        </h3>
        <button className="home-start-search button" onClick={routeToLocation}>
          Start your search
        </button>
      </section>
    </section>
  );
}

Home.propTypes = propTypes;
