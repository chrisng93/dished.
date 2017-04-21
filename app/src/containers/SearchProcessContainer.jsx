import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { currentStepSelector, locationSelector } from '../selectors/searchProcessSelectors';
import ProgressIndicator from '../components/ProgressIndicator';
import Map from '../components/Map';

const propTypes = {
  currentStep: T.string,
  location: T.string,
};

function SearchProcessContainer(props) {
  // TODO: have progress indicator above children showing where the user is in the process
  // TODO: map that shows updates (pin after location, radius after transit, restaurant pins after food)
  const { children, currentStep, location } = props;
  return (
    <section className="search-process">
      <ProgressIndicator currentStep={currentStep} />
      {children}
      <section className="search-process-map" style={{width: '400px', height: '400px'}}>
        <Map address={location} width={'400px'} height={'400px'} />
      </section>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    currentStep: currentStepSelector(state),
    location: locationSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

SearchProcessContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SearchProcessContainer);
