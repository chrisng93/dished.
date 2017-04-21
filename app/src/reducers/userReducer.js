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
  isEditingUser: false,

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
    .set('error', Map({ status: true, message: payload.error }));
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

    case actionTypes.EDIT_USER_PENDING:
      return state
        .set('isEditingUser', true);
    case actionTypes.EDIT_USER_SUCCESS:
      return state
        .set('user', Map(payload.user))
        .set('isEditingUser', false)
        .set('error', initialError);
    case actionTypes.EDIT_USER_FAILURE:
      console.log(payload)
      return state
        .set('isEditingUser', false)
        .set('error', Map({ status: true, message: payload.error }));

    default:
      return state;
  }
}
