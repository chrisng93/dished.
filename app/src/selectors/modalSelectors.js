/**
 * Created by chrisng on 4/26/17.
 */
import { createSelector } from 'reselect';

const modalStateSelector = state => state.modal;

export const currentModalSelector = createSelector(
  modalStateSelector,
  modalState => modalState.get('currentModal')
);
