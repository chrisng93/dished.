/**
 * Created by chrisng on 4/18/17.
 */
import { fromJS, Map, List } from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialError = fromJS({
  status: false,
  message: '',
});

const initialState = fromJS({
  location: '',
  transitMethod: '',
  transitTime: 0,
  foodType: '',

  choices: List(),
  isSubmittingSearch: false,

  selectedChoice: Map(),
  isSelectingChoice: false,

  error: initialError,
});

export default function searchProcess(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SUBMIT_LOCATION:
      return state
        .set('location', payload.location);
    case actionTypes.SUBMIT_TRANSIT:
      return state
        .set('transitMethod', payload.transitMethod)
        .set('transitTime', payload.transitTime);
    case actionTypes.SUBMIT_FOOD_TYPE:
      return state
        .set('foodType', payload.foodType);

    case actionTypes.SUBMIT_SEARCH_PENDING:
      return state
        .set('isSubmittingSearch', true);
    case actionTypes.SUBMIT_SEARCH_SUCCESS:
      return state
        .set('choices', fromJS(payload))
        .set('isSubmittingSearch', false)
        .set('error', initialError);
    case actionTypes.SUBMIT_SEARCH_FAILURE:
      return state
        .set('choices', List())
        .set('isSubmittingSearch', false)
        .set('error', Map({ status: true, error: payload.error }));

    case actionTypes.SELECT_CHOICE_PENDING:
      return state
        .set('isSelectingChoice', true);
    case actionTypes.SELECT_CHOICE_SUCCESS:
      return state
        .set('selectedChoice', Map(payload.selectedChoice))
        .set('isSelectingChoice', false)
        .set('error', initialError);
    case actionTypes.SELECT_CHOICE_FAILURE:
      return state
        .set('selectedChoice', Map())
        .set('isSelectingChoice', false)
        .set('error', Map({ status: true, error: payload.error }));

    default:
      return state;
  }
}
