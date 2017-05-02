/**
 * Store config w/ logger, persist, and router
 */
import { compose, createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import { createEpicMiddleware } from 'redux-observable';
import { routerMiddleware } from 'react-router-redux';
import { rootEpic } from '../actions/index';
import rootReducer from '../reducers/index';

const logger = createLogger({
  collapsed: true,
  duration: true,
  diff: true,
  stateTransformer: state => JSON.parse(JSON.stringify(state)),
  actionTransformer: state => JSON.parse(JSON.stringify(state)),
  errorTransformer: state => JSON.parse(JSON.stringify(state)),
});
const router = routerMiddleware(browserHistory);

const epicMiddleware = createEpicMiddleware(rootEpic);

const createStoreWithMiddleware = compose(
  applyMiddleware(epicMiddleware, router, logger)
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
