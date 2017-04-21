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
      <button className="home-route" onClick={routeToLocation}>
        Start your search
      </button>
    </section>
  );
}

Home.propTypes = propTypes;
