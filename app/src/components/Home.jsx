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
      <img className="bg" src="https://s3-us-west-1.amazonaws.com/dishassist/landing.jpg" />
      <section className="home-start-container">
        <button className="home-start-search" onClick={routeToLocation}>
          Start your search
        </button>
      </section>
    </section>
  );
}

Home.propTypes = propTypes;
