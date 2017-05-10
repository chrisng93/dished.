/**
 * Actions for modal state
 */
import { push } from 'react-router-redux';
import * as actionTypes from '../constants/actionTypes';

export function changeModal(payload) {
  return {
    type: actionTypes.CHANGE_MODAL,
    payload,
  }
}
