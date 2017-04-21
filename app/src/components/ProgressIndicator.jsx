/**
 * Stateless component for ___
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  currentStep: T.string,
};

export default function ProgressIndicator({ currentStep }) {
  return (
    <section className="progress-indicator">
      {currentStep}
    </section>
  );
}

ProgressIndicator.propTypes = propTypes;
