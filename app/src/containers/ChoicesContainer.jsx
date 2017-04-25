import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { choicesSelector, searchIdSelector } from '../selectors/searchProcessSelectors';
import { tokenSelector } from '../selectors/userSelectors';
import Choice from '../components/Choice';

const propTypes = {
  choices: T.array,
  token: T.string,
  searchId: T.string,

  onMouseEnterChoice: T.func,
  onMouseLeaveChoice: T.func,
  selectChoice: T.func,
};

class ChoicesContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { choices, token, onMouseEnterChoice, onMouseLeaveChoice, selectChoice } = this.props;
    const choiceProps = { token, onMouseEnterChoice, onMouseLeaveChoice, selectChoice };
    return (
      <section>
        {choices.map(choice =>
          <Choice
            key={choice.get('id')}
            choice={choice}
            {...choiceProps}
          />
        )}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    choices: choicesSelector(state),
    token: tokenSelector(state),
    searchId: searchIdSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMouseEnterChoice: bindActionCreators(actions.onMouseEnterChoice, dispatch),
    onMouseLeaveChoice: bindActionCreators(actions.onMouseLeaveChoice, dispatch),
    selectChoice: bindActionCreators(actions.selectChoice, dispatch),
  };
}

ChoicesContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ChoicesContainer);
