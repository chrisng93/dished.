/**
 * All action names should be defined here
 */
import { combineEpics } from 'redux-observable';
import { signIn, signInEpic, signUp, signUpEpic, signOut, signOutEpic, editUser, editUserEpic } from './userActions';
import { startSearchProcess, submitLocation, confirmLocation, confirmLocationEpic, submitTransit, submitTransitEpic, submitFoodType, submitFoodTypeEpic, submitSearchEpic } from './searchProcessActions';

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
);

module.exports = {
  // user
  signIn,
  signUp,
  signOut,
  editUser,

  // search process
  startSearchProcess,
  submitLocation,
  confirmLocation,
  submitTransit,
  submitFoodType,

  // epics
  rootEpic,
};
