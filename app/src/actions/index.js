/**
 * All action names should be defined here
 */
import { combineEpics } from 'redux-observable';
import { signin, signinEpic, signup, signupEpic } from './userActions';
import { submitLocation, submitLocationEpic, submitTransit, submitTransitEpic, submitFoodType, submitFoodTypeEpic, submitSearchEpic } from './searchProcessActions';

const rootEpic = combineEpics(
  // user
  signinEpic,
  signupEpic,

  // search process
  submitLocationEpic,
  submitTransitEpic,
  submitFoodTypeEpic,
  submitSearchEpic,
);

module.exports = {
  // user
  signin,
  signup,

  // search process
  submitLocation,
  submitTransit,
  submitFoodType,

  // epics
  rootEpic,
};
