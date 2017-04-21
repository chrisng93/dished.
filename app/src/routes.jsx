import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppContainer from './containers/AppContainer';
import HomeContainer from './containers/HomeContainer';
import SigninContainer from './containers/SigninContainer';
import SignupContainer from './containers/SignupContainer';
import SearchProcessContainer from './containers/SearchProcessContainer';
import LocationContainer from './containers/LocationContainer';
import TransitContainer from './containers/TransitContainer';
import FoodTypeContainer from './containers/FoodTypeContainer';
import EnsureAuthenticationContainer from './containers/EnsureAuthenticationContainer';
import ProfileContainer from './containers/ProfileContainer';

const routes = (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={HomeContainer} />
    <Route path="/signin" component={SigninContainer} />
    <Route path="/signup" component={SignupContainer} />
    <Route path="/search" component={SearchProcessContainer}>
      <IndexRoute component={LocationContainer} />
      <Route path="/search/location" component={LocationContainer} />
      <Route path="/search/transit" component={TransitContainer} />
      <Route path="/search/food" component={FoodTypeContainer} />
      {/*<Route path="/search/choices" component={ChoicesContainer} />*/}
      {/*<Route path="/search/selection" component={SelectionContainer} />*/}
  </Route>
    <Route path="/profile" component={EnsureAuthenticationContainer}>
      <IndexRoute component={ProfileContainer} />
      <Route path="/profile" component={ProfileContainer} />
    </Route>
    {/*<Route path="/searches" component={EnsureAuthenticationContainer}>*/}
    {/*<IndexRoute component={SearchesContainer} />*/}
      {/*<Route path="/searches" component={SearchesContainer} />*/}
      {/*<Route path="/searches/:id" component={SearchContainer} />*/}
    {/*</Route>*/}
    {/*<Route path="*" component={NotFoundContainer} />*/}
  </Route>
);

export default routes;
