/**
 * Created by chrisng on 4/11/17.
 */
import { Observable } from 'rxjs';
import * as actionTypes from '../constants/actionTypes';
import { createHeaders } from '../utils/requestUtils';

export function login(payload) {
  return {
    type: actionTypes.LOGIN,
    payload,
  };
}

function setSession(session) {
  return {
    type: actionTypes.SESSION_SET,
    payload: session,
  };
}

function setSessionError(error) {
  console.log('SESSION ERROR')
  return {
    type: actionTypes.SESSION_ERROR,
    payload: { error },
  };
}

function fetchLogin(options) {
  return fetch(`${process.env.API_URL}/auth/login`, options)
    .then(response => response.json())
    // TODO: catch errors
    .catch(err => err);
}

export const loginEpic = (action$) => {
  return action$.ofType(actionTypes.LOGIN)
    .mergeMap((action) => {
      const { payload } = action;
      const options = {
        method: 'POST',
        headers: createHeaders(),
        body: JSON.stringify({ email: payload.email, password: payload.password }),
      };
      return Observable.from(fetchLogin(options))
        .map(setSession)
        .catch(setSessionError);
    });
};
