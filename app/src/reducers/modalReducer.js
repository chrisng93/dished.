/**
 * Reducer for modal state
 */
import { fromJS } from 'immutable';
import * as actionTypes from '../constants/actionTypes';

const initialState = fromJS({
  currentModal: '',
});

export default function modal(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.CHANGE_MODAL:
      return state
        .set('currentModal', payload.currentModal);

    default:
      return state;
  }
}
