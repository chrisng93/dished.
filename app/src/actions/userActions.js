/**
 * Created by chrisng on 4/11/17.
 */
import { Observable } from 'rxjs';
import { push } from 'react-router-redux';
import * as actionTypes from '../constants/actionTypes';
import { createHeaders } from '../utils/requestUtils';

export function signin(payload) {
  return {
    type: actionTypes.SIGNIN_PENDING,
    payload,
  };
}

function signinUser(action) {
  const { payload } = action;
  const body = JSON.stringify(payload);
  const headers = createHeaders();
  return Observable.ajax.post(`${process.env.API_URL}/auth/signin`, body, headers);
}

export const signinEpic = (action$) => {
  return action$.ofType(actionTypes.SIGNIN_PENDING)
    .switchMap(action =>
      Observable.from(signinUser(action))
        .flatMap(payload =>
          Observable.concat(
            Observable.of({ type: actionTypes.SIGNIN_SUCCESS, payload: payload.response }),
            Observable.of(push('/')),
          )
        )
        .catch(error => Observable.of({ type: actionTypes.SIGNIN_FAILURE, payload: { error } }))
    )
};

export function signup(payload) {
  return {
    type: actionTypes.SIGNUP_PENDING,
    payload,
  };
}

function signupUser(action) {
  const { payload } = action;
  const body = JSON.stringify(payload);
  const headers = createHeaders();
  return Observable.ajax.post(`${process.env.API_URL}/api/user`, body, headers);
}

export const signupEpic = (action$) => {
  return action$.ofType(actionTypes.SIGNUP_PENDING)
    .switchMap(action =>
      Observable.from(signupUser(action))
        .flatMap(payload =>
          Observable.concat(
            Observable.of({ type: actionTypes.SIGNUP_SUCCESS, payload: payload.response }),
            Observable.of(push('/')),
          )
        )
        .catch(error => Observable.of({ type: actionTypes.SIGNUP_FAILURE, payload: { error } }))
    )
};

export function editUser(payload) {
  return {
    type: actionTypes.EDIT_USER_PENDING,
    payload,
  }
}

function editUserFetch(action) {
  const { payload } = action;
  const body = JSON.stringify(payload);
  const headers = createHeaders(payload.token);
  return Observable.ajax.put(`${process.env.API_URL}/api/user/${payload.id}`, body, headers);
}

export const editUserEpic = (action$) => {
  return action$.ofType(actionTypes.EDIT_USER_PENDING)
    .switchMap(action =>
      Observable.from(editUserFetch(action))
        .map(payload => ({ type: actionTypes.EDIT_USER_SUCCESS, payload: payload.response }))
        .catch(error => Observable.of({ type: actionTypes.EDIT_USER_FAILURE, payload: { error } }))
    )
};
