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
  error: initialError,
});

export default function user(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SESSION_SET:
      return state
        .set('user', Map(payload.user))
        .set('token', payload.token)
        .set('error', initialError);
    case actionTypes.SESSION_ERROR:
      console.log('got session error', fromJS({ status: true, message: payload.error }))
      return state
        .set('user', Map())
        .set('token', '')
        .set('error', fromJS({ status: true, message: payload.error }));

    default:
      return state;
  }
}
