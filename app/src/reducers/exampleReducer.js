/**
 * Reducers should change state based on action type/payload
 */
import * as actionTypes from '../constants/actionTypes';

const initialState = {

};

export default function example(state = initialState, action) {
  switch (action.type) {
    case actionTypes.EXAMPLE:
      return state;
    default:
      return state;
  }
}
