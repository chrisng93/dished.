import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomeContainer from './containers/HomeContainer';
import SigninContainer from './containers/SigninContainer';
import SignupContainer from './containers/SignupContainer';
import SearchProcessContainer from './containers/SearchProcessContainer';
import LocationContainer from './containers/LocationContainer';
import TransitContainer from './containers/TransitContainer';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomeContainer} />
    <Route path="/signin" component={SigninContainer} />
    <Route path="/signup" component={SignupContainer} />
    <Route path="/search" component={SearchProcessContainer}>
      <Route path="/search/location" component={LocationContainer} />
      <Route path="/search/transit" component={TransitContainer} />
      {/*<Route path="/search/food" component={FoodTypeContainer} />*/}
      {/*<Route path="/search/choices" component={ChoicesContainer} />*/}
      {/*<Route path="/search/selection" component={SelectionContainer} />*/}
    </Route>
    {/*<Route path="/profile" component={EnsureAuthenticationContainer}>*/}
      {/*<Route path="/profile" component={ProfileContainer} />*/}
    {/*</Route>*/}
    {/*<Route path="/searches" component={EnsureAuthenticationContainer}>*/}
      {/*<Route path="/searches" component={SearchesContainer} />*/}
      {/*<Route path="/searches/:id" component={SearchContainer} />*/}
    {/*</Route>*/}
    {/*<Route path="*" component={NotFoundContainer} />*/}
  </Route>
);

export default routes;
