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
  currentStep: '',
  location: 'oracle arena',

  transitMethod: '',
  transitTime: 0,
  radius: 0,
  isSubmittingTransit: false,

  foodType: '',

  searchId: '',
  choices: List(),
  hoveredChoice: '',
  isSubmittingSearch: false,

  selectedChoice: Map(),
  isSelectingChoice: false,

  error: initialError,
});

export default function searchProcess(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.CHANGE_STEP:
      return state
        .set('currentStep', payload.currentStep);

    case actionTypes.SUBMIT_LOCATION:
      return state
        .set('location', payload.location);
    case actionTypes.CONFIRM_LOCATION:
      return state
        .set('currentStep', 'transit');

    case actionTypes.SUBMIT_TRANSIT_PENDING:
      return state
        .set('isSubmittingTransit', true);
    case actionTypes.SUBMIT_TRANSIT_SUCCESS:
      return state
        .set('isSubmittingTransit', false)
        .set('transitMethod', payload.transitMethod)
        .set('transitTime', payload.transitTime)
        .set('radius', parseFloat(payload.radius))
        .set('currentStep', 'foodType')
        .set('error', initialError);
    case actionTypes.SUBMIT_TRANSIT_FAILURE:
      return state
        .set('isSubmittingTransit', false)
        .set('error', Map({ status: true, error: payload.error }));

    case actionTypes.SUBMIT_FOOD_TYPE:
      return state
        .set('foodType', payload.foodType);

    case actionTypes.SUBMIT_SEARCH_PENDING:
      return state
        .set('isSubmittingSearch', true);
    case actionTypes.SUBMIT_SEARCH_SUCCESS:
      return state
        .set('searchId', payload.id)
        .set('choices', fromJS(payload.restaurants))
        .set('isSubmittingSearch', false)
        .set('error', initialError);
    case actionTypes.SUBMIT_SEARCH_FAILURE:
      return state
        .set('choices', List())
        .set('isSubmittingSearch', false)
        .set('error', Map({ status: true, error: payload.error }));

    case actionTypes.MOUSE_ENTER_CHOICE:
      return state
        .set('hoveredChoice', payload);
    case actionTypes.MOUSE_LEAVE_CHOICE:
      return state
        .set('hoveredChoice', '');

    case actionTypes.SELECT_CHOICE_PENDING:
      return state
        .set('isSelectingChoice', true);
    case actionTypes.SELECT_CHOICE_SUCCESS:
      return state
        .set('selectedChoice', fromJS(payload.choice))
        .set('isSelectingChoice', false)
        .set('error', initialError);
    case actionTypes.SELECT_CHOICE_FAILURE:
      return state
        .set('selectedChoice', Map())
        .set('isSelectingChoice', false)
        .set('error', Map({ status: true, error: payload.error }));

    case actionTypes.SIGN_IN_SUCCESS:
      return state
        .set('location', payload.user.location || state.get('location'))
        .set('error', initialError);;
    case actionTypes.EDIT_USER_SUCCESS:
      return state
        .set('location', payload.user.location || state.get('location'))
        .set('error', initialError);;

    case actionTypes.CLEAR_CHOICES:
      return state
        .set('choices', List());
    case actionTypes.CLEAR_SEARCH_INFO:
      return initialState;

    default:
      return state;
  }
}
