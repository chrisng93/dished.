/**
 * Created by chrisng on 4/18/17.
 */
import { Observable } from 'rxjs';
import { push } from 'react-router-redux';
import * as actionTypes from '../constants/actionTypes';
import { createHeaders } from '../utils/requestUtils';

export function changeStep(payload) {
  return {
    type: actionTypes.CHANGE_STEP,
    payload,
  }
}

export function submitLocation(payload) {
  return {
    type: actionTypes.SUBMIT_LOCATION,
    payload,
  }
}

export function confirmLocation() {
  return { type: actionTypes.CONFIRM_LOCATION }
}

export const confirmLocationEpic = (action$) => {
  return action$.ofType(actionTypes.CONFIRM_LOCATION)
    .mapTo(push('/search/transit'));
};

export function submitTransit(payload) {
  return {
    type: actionTypes.SUBMIT_TRANSIT_PENDING,
    payload,
  }
}

const submitTransitApi = (payload) => {
  const { location, transitMethod, transitTime } = payload;
  const headers = createHeaders();
  const address = location.split(' ').join('+');
  const queryString = `address=${address}&transit_method=${transitMethod}&transit_time=${transitTime}`;
  return Observable.ajax(`${process.env.API_URL}/api/restaurant/search/radius?${queryString}`, headers);
};

export const submitTransitEpic = (action$) => {
  return action$.ofType(actionTypes.SUBMIT_TRANSIT_PENDING)
    .switchMap(action =>
      Observable.from(submitTransitApi(action.payload))
        .switchMap(payload =>
          Observable.concat(
            Observable.of({ type: actionTypes.SUBMIT_TRANSIT_SUCCESS, payload: {...payload.response, ...action.payload } }),
            Observable.of(push('/search/food')),
          )
        )
        .catch(error => Observable.of({ type: actionTypes.SUBMIT_TRANSIT_FAILURE, payload: { error } }))
    )
};

export function submitFoodType(payload) {
  return {
    type: actionTypes.SUBMIT_FOOD_TYPE,
    payload,
  }
}

export const submitFoodTypeEpic = (action$) => {
  return action$.ofType(actionTypes.SUBMIT_FOOD_TYPE)
    .mapTo({ type: actionTypes.SUBMIT_SEARCH_PENDING });
};

export function submitSearch(store) {
  const searchProcess = store.getState().searchProcess;
  const body = JSON.stringify({
    user_location: searchProcess.get('location'),
    transit_method: searchProcess.get('transitMethod'),
    transit_time: searchProcess.get('transitTime'),
    food_type: searchProcess.get('foodType'),
    radius: searchProcess.get('radius'),
  });
  const headers = createHeaders();
  return Observable.ajax.post(`${process.env.API_URL}/api/restaurant/search`, body, headers);
}

export const submitSearchEpic = (action$, store) => {
  return action$.ofType(actionTypes.SUBMIT_SEARCH_PENDING)
    .switchMap(action =>
      Observable.from(submitSearch(store))
        .flatMap(payload =>
          Observable.concat(
            Observable.of({ type: actionTypes.SUBMIT_SEARCH_SUCCESS, payload: payload.response }),
            Observable.of(push('/search/choices')),
          )
        )
        .catch(error => Observable.of({ type: actionTypes.SUBMIT_SEARCH_FAILURE, payload: { error } }))
    )
};
