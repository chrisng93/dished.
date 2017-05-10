/**
 * Stateful container for user profile
 */
import React, { Component, PropTypes as T } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { userSelector, tokenSelector, isEditingUserSelector, userErrorSelector } from '../selectors/userSelectors';
import Profile from '../components/Profile';

const propTypes = {
  user: T.object,
  token: T.string,
  isEditingUser: T.bool,
  error: T.object,

  editUser: T.func,
};

function ProfileContainer(props) {
  return (
    <Profile {...props} />
  );
}

function mapStateToProps(state) {
  return {
    user: userSelector(state),
    token: tokenSelector(state),
    isEditingUser: isEditingUserSelector(state),
    error: userErrorSelector(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editUser: bindActionCreators(actions.editUser, dispatch),
  };
}

ProfileContainer.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
