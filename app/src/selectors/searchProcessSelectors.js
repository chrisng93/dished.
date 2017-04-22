/**
 * Created by chrisng on 4/20/17.
 */
import { createSelector } from 'reselect';

const searchProcessStateSelector = state => state.searchProcess;

export const currentStepSelector = createSelector(
  searchProcessStateSelector,
  searchProcessState => searchProcessState.get('currentStep')
);

export const locationSelector = createSelector(
  searchProcessStateSelector,
  searchProcessState => searchProcessState.get('location')
);

export const transitMethodSelector = createSelector(
  searchProcessStateSelector,
  searchProcessState => searchProcessState.get('transitMethod')
);

export const transitTimeSelector = createSelector(
  searchProcessStateSelector,
  searchProcessState => searchProcessState.get('transitTime')
);

export const radiusSelector = createSelector(
  searchProcessStateSelector,
  searchProcessState => searchProcessState.get('radius')
);

export const foodTypeSelector = createSelector(
  searchProcessStateSelector,
  searchProcessState => searchProcessState.get('foodType')
);

export const choicesSelector = createSelector(
  searchProcessStateSelector,
  searchProcessState => searchProcessState.get('choices')
);

export const isSubmittingSearchSelector = createSelector(
  searchProcessStateSelector,
  searchProcessState => searchProcessState.get('isSubmittingSearch')
);

export const selectedChoiceSelector = createSelector(
  searchProcessStateSelector,
  searchProcessState => searchProcessState.get('selectedChoice')
);

export const isSelectingChoiceSelector = createSelector(
  searchProcessStateSelector,
  searchProcessState => searchProcessState.get('isSelectingChoice')
);

export const errorSelector = createSelector(
  searchProcessStateSelector,
  searchProcessState => searchProcessState.get('error')
);
