import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppContainer from './containers/AppContainer';
import LoginContainer from './containers/LoginContainer';

const routes = (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={LoginContainer} />
    <Route path="/login" component={LoginContainer} />
  </Route>
);

export default routes;
