/**
 * Stateful container for search process
 */
import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import * as actions from '../actions';
import { currentStepSelector, locationSelector, transitMethodSelector, radiusSelector,
  foodTypeSelector, choicesSelector, hoveredChoiceSelector, selectedChoiceSelector } from '../selectors/searchProcessSelectors';
import ProgressIndicator from '../components/ProgressIndicator';
import Map from '../components/Map';

const propTypes = {
  children: T.node,

  currentStep: T.string,
  location: T.string,
  transitMethod: T.string,
  radius: T.number,
  foodType: T.string,
  choices: T.object,
  hoveredChoice: T.string,
  selectedChoice: T.object,

  changeStep: T.func,
  clearChoices: T.func,
  routeToLocation: T.func,
  routeToTransit: T.func,
  routeToFood: T.func,
  routeToChoices: T.func,
  clearSearchInfo: T.func,
};

class SearchProcessContainer extends Component {
  constructor(props) {
    super(props);
    this.updateStep = this.updateStep.bind(this);
    this.checkRouteStatus = this.checkRouteStatus.bind(this);
  }

  componentDidMount() {
    this.updateStep(this.props);
    this.checkRouteStatus(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateStep(nextProps);
    this.checkRouteStatus(nextProps);
  }

  componentWillUnmount() {
    this.props.clearSearchInfo();
  }

  updateStep(props) {
    const { router, changeStep } = props;
    const path = router.location.pathname;
    let currentStep;
    if (path.indexOf('transit') > -1) {
      currentStep = 'transit';
    } else if (path.indexOf('food') > -1) {
      currentStep = 'food';
    } else if (path.indexOf('choices') > -1) {
      currentStep = 'choices';
    } else if (path.indexOf('selection') > -1) {
      currentStep = 'selection';
    } else {
      currentStep = 'location';
    }
    if (currentStep !== props.currentStep) {
      changeStep({ currentStep });
    }
  }

  checkRouteStatus(props) {
    const { currentStep, location, transitMethod, radius, foodType, selectedChoice, clearChoices,
      routeToLocation, routeToTransit, routeToFood, routeToChoices } = props;
    if (currentStep === 'transit' && !location) {
      routeToLocation();
    } else if (currentStep === 'food' && (!transitMethod || !radius)) {
      routeToTransit();
    } else if (currentStep === 'choices' && !foodType) {
      clearChoices();
      routeToFood();
    } else if (currentStep === 'selection' && !selectedChoice.get('id')) {
      routeToChoices();
    }
  }

  render() {
    const { children, currentStep, location, transitMethod, radius, choices, hoveredChoice, selectedChoice,
      routeToLocation, routeToTransit, routeToFood, routeToChoices } = this.props;
    const progressIndicatorProps = { currentStep, routeToLocation, routeToTransit, routeToFood, routeToChoices };
    const mapProps = { transitMethod, radius, choices, hoveredChoice, selectedChoice, address: location, width: '400px', height: '400px' };
    return (
      <section className="search-process">
        <div className="search-process-info">
          <ProgressIndicator {...progressIndicatorProps} />
          {children}
        </div>
        <div className={`search-process-map ${selectedChoice.get('id') ? 'hidden' : ''}`}>
          <Map {...mapProps} />
        </div>
        <div id="map-search-process" className={selectedChoice.get('id') ? '' : 'hidden'} />
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentStep: currentStepSelector(state),
    location: locationSelector(state),
    transitMethod: transitMethodSelector(state),
    radius: radiusSelector(state),
    foodType: foodTypeSelector(state),
    choices: choicesSelector(state),
    hoveredChoice: hoveredChoiceSelector(state),
    selectedChoice: selectedChoiceSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeStep: bindActionCreators(actions.changeStep, dispatch),
    clearChoices: bindActionCreators(actions.clearChoices, dispatch),
    routeToLocation: () => dispatch(push('/search/location')),
    routeToTransit: () => dispatch(push('/search/transit')),
    routeToFood: () => dispatch(push('/search/food')),
    routeToChoices: () => dispatch(push('/search/choices')),
    clearSearchInfo: bindActionCreators(actions.clearSearchInfo, dispatch),
  };
}

SearchProcessContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SearchProcessContainer);
