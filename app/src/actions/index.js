/**
 * All action names should be defined here
 */
import { combineEpics } from 'redux-observable';
import { signIn, signInEpic, signUp, signUpEpic, signOut, signOutEpic, editUser, editUserEpic } from './userActions';
import { changeStep, submitLocation, confirmLocation, confirmLocationEpic, submitTransit,
  submitTransitEpic, submitFoodType, submitFoodTypeEpic, submitSearchEpic, onMouseEnterChoice,
  onMouseLeaveChoice, selectChoice, selectChoiceEpic } from './searchProcessActions';
import { changeModal } from './modalActions';

const rootEpic = combineEpics(
  // user
  signInEpic,
  signUpEpic,
  signOutEpic,
  editUserEpic,

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

  // search process
  changeStep,
  submitLocation,
  confirmLocation,
  submitTransit,
  submitFoodType,
  onMouseEnterChoice,
  onMouseLeaveChoice,

  // modal
  changeModal,

  // epics
  rootEpic,
};
