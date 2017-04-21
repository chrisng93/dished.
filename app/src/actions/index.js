/**
 * All action names should be defined here
 */
import { combineEpics } from 'redux-observable';
import { signin, signinEpic, signup, signupEpic } from './userActions';
import { startSearchProcess, submitLocation, confirmLocation, confirmLocationEpic, submitTransit, submitTransitEpic, submitFoodType, submitFoodTypeEpic, submitSearchEpic } from './searchProcessActions';

const rootEpic = combineEpics(
  // user
  signinEpic,
  signupEpic,

  // search process
  confirmLocationEpic,
  submitTransitEpic,
  submitFoodTypeEpic,
  submitSearchEpic,
);

module.exports = {
  // user
  signin,
  signup,

  // search process
  startSearchProcess,
  submitLocation,
  confirmLocation,
  submitTransit,
  submitFoodType,

  // epics
  rootEpic,
};
