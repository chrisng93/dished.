/**
 * Stateless component for ___
 */
import React, { PropTypes as T } from 'react';

const propTypes = {
  routeToSearchProcess: T.func,
};

export default function Home({ routeToSearchProcess }) {
  return (
    <section className="home">
      <button className="home-route" onClick={routeToSearchProcess}>
        Start your search
      </button>
    </section>
  );
}

Home.propTypes = propTypes;
