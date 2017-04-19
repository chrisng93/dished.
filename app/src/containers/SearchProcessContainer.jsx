import React, { PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

const propTypes = {

};

function SearchProcessContainer(props) {
  // TODO: have progress indicator above children showing where the user is in the process
  // TODO: map that shows updates (pin after location, radius after transit, restaurant pins after food)
  return (
    <section className="search-process">
      {props.children}
    </section>
  );
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

SearchProcessContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SearchProcessContainer);
