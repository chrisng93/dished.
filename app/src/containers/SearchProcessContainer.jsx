import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { currentStepSelector, locationSelector, radiusSelector } from '../selectors/searchProcessSelectors';
import ProgressIndicator from '../components/ProgressIndicator';
import Map from '../components/Map';

const propTypes = {
  currentStep: T.string,
  location: T.string,
  radius: T.number,
};

function SearchProcessContainer(props) {
  // TODO: have progress indicator above children showing where the user is in the process
  // TODO: map that shows updates (pin after location, radius after transit, restaurant pins after food)
  const { children, currentStep, location, radius } = props;
  return (
    <section className="search-process">
      <section className="search-process-info">
        <ProgressIndicator currentStep={currentStep} />
        {children}
      </section>
      <section className="search-process-map">
        <Map address={location || 'oracle arena'} width={'400px'} height={'400px'} radius={radius} />
      </section>
    </section>
  );
}

function mapStateToProps(state) {
  return {
    currentStep: currentStepSelector(state),
    location: locationSelector(state),
    radius: radiusSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

SearchProcessContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SearchProcessContainer);
