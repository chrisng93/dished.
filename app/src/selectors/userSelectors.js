/**
 * Created by chrisng on 4/17/17.
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

export const isSigningInSelector = createSelector(
  userStateSelector,
  userState => userState.get('isSigningIn')
);

export const userErrorSelector = createSelector(
  userStateSelector,
  userState => userState.get('error')
);
