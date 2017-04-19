/**
 * Created by chrisng on 4/18/17.
 */
import { Observable } from 'rxjs';
import { push } from 'react-router-redux';
import * as actionTypes from '../constants/actionTypes';
import { createHeaders } from '../utils/requestUtils';

export function submitLocation(payload) {
  return {
    type: actionTypes.SUBMIT_LOCATION,
    payload,
  }
}

export const submitLocationEpic = (action$) => {
  return action$.ofType(actionTypes.SUBMIT_LOCATION)
    .mapTo(push('/search/transit'));
};

export function submitTransit(payload) {
  return {
    type: actionTypes.SUBMIT_TRANSIT,
    payload,
  }
}

export const submitTransitEpic = (action$) => {
  return action$.ofType(actionTypes.SUBMIT_TRANSIT)
    .mapTo(push('/search/food'));
};

export function submitFoodType(payload) {
  return {
    type: actionTypes.SUBMIT_FOOD_TYPE,
    payload,
  }
}

export const submitFoodTypeEpic = (action$) => {
  return action$.ofType(actionTypes.SUBMIT_FOOD_TYPE)
    .mapTo(Observable.of({ type: actionTypes.SUBMIT_SEARCH_PENDING }));
};

export function submitSearch(store) {
  const { location, transitMethod, transitTime, foodType } = store.getState().searchProcess;
  const body = JSON.stringify({
    user_location: location,
    transport_method: transitMethod,
    desired_travel_time: transitTime,
    food_type: foodType,
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
            Observable.of({ type: actionTypes.SUBMIT_SEARCH_SUCCESS, payload }),
            Observable.of(push('/search/choices')),
          )
        )
    )
    .catch(error => Observable.of({ type: actionTypes.SUBMIT_SEARCH_FAILURE, payload: { error } }))
};
