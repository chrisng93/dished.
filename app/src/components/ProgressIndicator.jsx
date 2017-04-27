/**
 * Stateless component for ___
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  currentStep: T.string,
};

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default function ProgressIndicator({ currentStep }) {
  const stepOrder = ['location', 'transit', 'food', 'choices', 'selection'];
  const currentStepOrder = stepOrder.indexOf(currentStep);
  return (
    <ol className="progress-indicator">
      {stepOrder.map(step =>
        <li className={`progress-indicator-${step}`} key={step}>
          <span className="step">{capitalizeFirstLetter(step)}</span>
          <span className={`dot ${stepOrder.indexOf(step) <= currentStepOrder ? 'active' : ''}`} />
        </li>
      )}
    </ol>
  );
}

ProgressIndicator.propTypes = propTypes;
