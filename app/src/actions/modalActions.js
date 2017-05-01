/**
 * Created by chrisng on 4/26/17.
 */
import { push } from 'react-router-redux';
import * as actionTypes from '../constants/actionTypes';

export function changeModal(payload) {
  return {
    type: actionTypes.CHANGE_MODAL,
    payload,
  }
}
