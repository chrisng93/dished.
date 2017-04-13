/**
 * Reducers should change state based on action type/payload
 */
import * as actionTypes from '../constants/actionTypes';

const initialState = {

};

export default function example(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.EXAMPLE:
      return state;
    default:
      return state;
  }
}
