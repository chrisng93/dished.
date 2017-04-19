/**
 * Reducers should change state based on action type/payload
 */
import { Map, fromJS } from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialError = fromJS({
  status: false,
  message: '',
});

const initialState = fromJS({
  user: Map(),
  token: '',
  isAuthenticated: false,

  isSigningIn: false,
  isSigningUp: false,

  error: initialError,
});

function authSuccess(state, payload) {
  return state
    .set('user', Map(payload.user))
    .set('token', payload.token)
    .set('isAuthenticated', true)
    .set('error', initialError);
}

function authFailure(state, payload) {
  return state
    .set('user', Map())
    .set('token', '')
    .set('isAuthenticated', false)
    .set('error', fromJS({ status: true, message: payload.error }));
}

export default function user(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SIGNIN_PENDING:
      return state
        .set('isSigningIn', true);
    case actionTypes.SIGNIN_SUCCESS:
      return authSuccess(state, payload)
        .set('isSigningIn', false);
    case actionTypes.SIGNIN_FAILURE:
      return authFailure(state, payload)
        .set('isSigningIn', false);

    case actionTypes.SIGNUP_PENDING:
      return state
        .set('isSigningUp', true);
    case actionTypes.SIGNUP_SUCCESS:
      return authSuccess(state, payload)
        .set('isSigningUp', false);
    case actionTypes.SIGNUP_FAILURE:
      return authFailure(state, payload)
        .set('isSigningUp', false);
    default:
      return state;
  }
}
