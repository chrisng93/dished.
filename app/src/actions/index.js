/**
 * All actions and epics should be defined here
 */
import { combineEpics } from 'redux-observable';
import { signIn, signInEpic, signUp, signUpEpic, signOut, signOutEpic, editUser, editUserEpic,
  getUserSearches, getUserSearchesEpic } from './userActions';
import { changeStep, submitLocation, confirmLocation, confirmLocationEpic, submitTransit,
  submitTransitEpic, submitFoodType, submitFoodTypeEpic, submitSearchEpic, onMouseEnterChoice,
  onMouseLeaveChoice, selectChoice, selectChoiceEpic, clearChoices, clearSearchInfo } from './searchProcessActions';
import { changeModal } from './modalActions';

const rootEpic = combineEpics(
  // user
  signInEpic,
  signUpEpic,
  signOutEpic,
  editUserEpic,
  getUserSearchesEpic,

  // search process
  confirmLocationEpic,
  submitTransitEpic,
  submitFoodTypeEpic,
  submitSearchEpic,
  selectChoiceEpic,
);

module.exports = {
  // user
  signIn,
  signUp,
  signOut,
  editUser,
  selectChoice,
  getUserSearches,

  // search process
  changeStep,
  submitLocation,
  confirmLocation,
  submitTransit,
  submitFoodType,
  onMouseEnterChoice,
  onMouseLeaveChoice,
  clearChoices,
  clearSearchInfo,

  // modal
  changeModal,

  // epics
  rootEpic,
};
