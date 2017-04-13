/**
 * All action names should be defined here
 */
import { combineEpics } from 'redux-observable';
import { login, loginEpic } from './userActions';

const rootEpic = combineEpics(
  loginEpic,
);

module.exports = {
  login,
  rootEpic,
};
