import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { currentStepSelector, locationSelector, transitMethodSelector, radiusSelector,
  searchIdSelector, choicesSelector, hoveredChoiceSelector, selectedChoiceSelector } from '../selectors/searchProcessSelectors';
import ProgressIndicator from '../components/ProgressIndicator';
import Map from '../components/Map';

const propTypes = {
  currentStep: T.string,
  location: T.string,
  transitMethod: T.string,
  radius: T.number,
  searchId: T.string,
  choices: T.object,
  hoveredChoice: T.string,
  selectedChoice: T.object,

  changeStep: T.func,
};

class SearchProcessContainer extends Component {
  constructor(props) {
    super(props);
    this.updateStep = this.updateStep.bind(this);
  }

  componentDidMount() {
    this.updateStep(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.updateStep(nextProps);
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

  render() {
    // TODO: have progress indicator above children showing where the user is in the process
    // TODO: map that shows updates (pin after location, radius after transit, restaurant pins after food)
    const { children, currentStep, location, transitMethod, radius, choices, hoveredChoice, selectedChoice } = this.props;
    const mapProps = { transitMethod, radius, choices, hoveredChoice, selectedChoice, address: location, width: '400px', height: '400px' };
    return (
      <section className="search-process">
        <section className="search-process-info">
          <ProgressIndicator currentStep={currentStep} />
          {children}
        </section>
        <section className={`search-process-map ${selectedChoice.get('id') ? 'hidden' : ''}`}>
          <Map {...mapProps} />
        </section>
        <section id="map-search-process" className={selectedChoice.get('id') ? '' : 'hidden'} />
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
    searchId: searchIdSelector(state),
    choices: choicesSelector(state),
    hoveredChoice: hoveredChoiceSelector(state),
    selectedChoice: selectedChoiceSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeStep: bindActionCreators(actions.changeStep, dispatch),
  };
}

SearchProcessContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SearchProcessContainer);
