/**
 * Selectors for modal state
 */
import { createSelector } from 'reselect';

const modalStateSelector = state => state.modal;

export const currentModalSelector = createSelector(
  modalStateSelector,
  modalState => modalState.get('currentModal')
);
