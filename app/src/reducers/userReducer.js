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
  isSigningOut: false,
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
    case actionTypes.SIGN_IN_PENDING:
      return state
        .set('isSigningIn', true);
    case actionTypes.SIGN_IN_SUCCESS:
      return authSuccess(state, payload)
        .set('isSigningIn', false);
    case actionTypes.SIGN_IN_FAILURE:
      return authFailure(state, payload)
        .set('isSigningIn', false);

    case actionTypes.SIGN_UP_PENDING:
      return state
        .set('isSigningUp', true);
    case actionTypes.SIGN_UP_SUCCESS:
      return authSuccess(state, payload)
        .set('isSigningUp', false);
    case actionTypes.SIGN_UP_FAILURE:
      return authFailure(state, payload)
        .set('isSigningUp', false);

    case actionTypes.SIGN_OUT_PENDING:
      return state
        .set('isSigningOut', true);
    case actionTypes.SIGN_OUT_SUCCESS:
      return state
        .set('user', Map())
        .set('token', '')
        .set('isAuthenticated', false)
        .set('isSigningOut', false);
    case actionTypes.SIGN_OUT_FAILURE:
      return state
        .set('isSigningOut', false)
        .set('error', Map({ status: true, message: payload.error }));

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
