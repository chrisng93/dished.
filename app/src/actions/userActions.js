/**
 * Created by chrisng on 4/11/17.
 */
import { Observable } from 'rxjs';
import { push } from 'react-router-redux';
import * as actionTypes from '../constants/actionTypes';
import { createHeaders } from '../utils/requestUtils';

export function signIn(payload) {
  return {
    type: actionTypes.SIGN_IN_PENDING,
    payload,
  };
}

function signInUser(action) {
  const { payload } = action;
  const body = JSON.stringify(payload);
  const headers = createHeaders();
  return Observable.ajax.post(`${process.env.API_URL}/auth/signin`, body, headers);
}

export const signInEpic = (action$) => {
  return action$.ofType(actionTypes.SIGN_IN_PENDING)
    .switchMap(action =>
      Observable.from(signInUser(action))
        .flatMap(payload =>
          Observable.concat(
            Observable.of({ type: actionTypes.SIGN_IN_SUCCESS, payload: payload.response }),
            Observable.of(push('/')),
          )
        )
        .catch(error => Observable.of({ type: actionTypes.SIGN_IN_FAILURE, payload: { error } }))
    )
};

export function signUp(payload) {
  return {
    type: actionTypes.SIGN_UP_PENDING,
    payload,
  };
}

const signUpUser = (action) => {
  const { payload } = action;
  const body = JSON.stringify(payload);
  const headers = createHeaders();
  return Observable.ajax.post(`${process.env.API_URL}/api/user`, body, headers);
};

export const signUpEpic = (action$) => {
  return action$.ofType(actionTypes.SIGN_UP_PENDING)
    .switchMap(action =>
      Observable.from(signUpUser(action))
        .flatMap(payload =>
          Observable.concat(
            Observable.of({ type: actionTypes.SIGN_UP_SUCCESS, payload: payload.response }),
            Observable.of(push('/')),
          )
        )
        .catch(error => Observable.of({ type: actionTypes.SIGN_UP_FAILURE, payload: { error } }))
    )
};

export function signOut(payload) {
  return {
    type: actionTypes.SIGN_OUT_PENDING,
    payload,
  }
}

const signOutUser = (action) => {
  const { payload } = action;
  const body = JSON.stringify({});
  const headers = createHeaders(payload.token);
  return Observable.ajax.post(`${process.env.API_URL}/auth/signout`, body, headers);
};

export const signOutEpic = (action$) => {
  return action$.ofType(actionTypes.SIGN_OUT_PENDING)
    .switchMap(action =>
      Observable.from(signOutUser(action))
        .flatMap(payload =>
          Observable.concat(
            Observable.of({ type: actionTypes.SIGN_OUT_SUCCESS }),
            Observable.of(push('/')),
          )
        )
        .catch(error => Observable.of({ type: actionTypes.SIGN_OUT_FAILURE, payload: { error } }))
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

export function getUserSearches(payload) {
  return {
    type: actionTypes.GET_USER_SEARCHES_PENDING,
    payload,
  }
}

function getUserSearchesFetch(action) {
  const { payload } = action;
  const headers = createHeaders(payload.token);
  const settings = {
    url: `${process.env.API_URL}/api/user/searches`,
    headers,
  };
  return Observable.ajax(settings);
}

export const getUserSearchesEpic = (action$) => {
  return action$.ofType(actionTypes.GET_USER_SEARCHES_PENDING)
    .switchMap(action =>
      getUserSearchesFetch(action)
        .map(payload => ({ type: actionTypes.GET_USER_SEARCHES_SUCCESS, payload: payload.response }))
        .catch(error => Observable.of({ type: actionTypes.GET_USER_SEARCHES_FAILURE, payload: { error } }))
    )
};
