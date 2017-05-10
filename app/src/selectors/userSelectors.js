/**
 * Selectors for state related to users
 */
import { createSelector } from 'reselect';

const userStateSelector = state => state.user;

export const userSelector = createSelector(
  userStateSelector,
  userState => userState.get('user')
);

export const tokenSelector = createSelector(
  userStateSelector,
  userState => userState.get('token')
);

export const isAuthenticatedSelector = createSelector(
  userStateSelector,
  userState => userState.get('isAuthenticated')
);

export const userSearchesSelector = createSelector(
  userStateSelector,
  userState => userState.get('userSearches')
);

export const isSigningInSelector = createSelector(
  userStateSelector,
  userState => userState.get('isSigningIn')
);

export const isSigningUpSelector = createSelector(
  userStateSelector,
  userState => userState.get('isSigningUp')
);

export const isEditingUserSelector = createSelector(
  userStateSelector,
  userState => userState.get('isEditingUser')
);

export const userErrorSelector = createSelector(
  userStateSelector,
  userState => userState.get('error')
);
