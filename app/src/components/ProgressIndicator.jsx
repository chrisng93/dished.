/**
 * Stateless component for ___
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  currentStep: T.string,
};

export default function ProgressIndicator({ currentStep }) {
  const stepOrder = ['location', 'transit', 'food', 'choices', 'selection'];
  const currentStepOrder = stepOrder.indexOf(currentStep);
  console.log(currentStepOrder, stepOrder.indexOf('location'))
  return (
    <ol className="progress-indicator">
      <li className="progress-indicator-location">
        <span className="step">Location</span>
        <span className={`dot ${stepOrder.indexOf('location') <= currentStepOrder ? 'active' : ''}`} />
      </li>
      <li className="progress-indicator-transit">
        <span className="step">Transit</span>
        <span className={`dot ${stepOrder.indexOf('transit') <= currentStepOrder ? 'active' : ''}`} />
      </li>
      <li className="progress-indicator-food">
        <span className="step">Food</span>
        <span className={`dot ${stepOrder.indexOf('food') <= currentStepOrder ? 'active' : ''}`} />
      </li>
      <li className="progress-indicator-choices">
        <span className="step">Choices</span>
        <span className={`dot ${stepOrder.indexOf('choices') <= currentStepOrder ? 'active' : ''}`} />
      </li>
      <li className="progress-indicator-selection">
        <span className="step">Selection</span>
        <span className={`dot ${stepOrder.indexOf('selection') <= currentStepOrder ? 'active' : ''}`} />
      </li>
    </ol>
  );
}

ProgressIndicator.propTypes = propTypes;
