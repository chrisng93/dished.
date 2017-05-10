/**
 * Dumb component for search progress indicator
 */
import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  currentStep: T.string,

  routeToLocation: T.func,
  routeToTransit: T.func,
  routeToFood: T.func,
  routeToChoices: T.func,
};

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export default class ProgressIndicator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepOrder: ['location', 'transit', 'food', 'choices', 'selection'],
    };
    this.renderStep = this.renderStep.bind(this);
  }

  renderStep(step) {
    const { stepOrder } = this.state;
    const { currentStep, routeToLocation, routeToTransit, routeToFood, routeToChoices } = this.props;
    const currentStepOrder = stepOrder.indexOf(currentStep);
    let routeFunc = null;
    if (stepOrder.indexOf(step) <= currentStepOrder) {
      if (step === 'location') {
        routeFunc = routeToLocation;
      } else if (step === 'transit') {
        routeFunc = routeToTransit;
      } else if (step === 'food') {
        routeFunc = routeToFood;
      } else if (step === 'choices') {
        routeFunc = routeToChoices;
      }
    }
    return (
      <li
        className={`progress-indicator-${step}`}
        key={step}
        onClick={currentStep !== 'selection' ? routeFunc : null}
      >
        <span className="step">{capitalizeFirstLetter(step)}</span>
        <span className={`dot ${stepOrder.indexOf(step) <= currentStepOrder ? 'active' : ''}`} />
      </li>
    );
  }

  render() {
    const { stepOrder } = this.state;
    return (
      <ol className="progress-indicator">
        {stepOrder.map(step => this.renderStep(step))}
      </ol>
    );
  }
}

ProgressIndicator.propTypes = propTypes;
