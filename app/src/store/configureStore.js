/**
 * Store config w/ logger, persist, and router
 */
import { compose, createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { autoRehydrate } from 'redux-persist';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/index';

const logger = createLogger({
  collapsed: true,
  duration: true,
  diff: true,
});
const router = routerMiddleware(browserHistory);

const createStoreWithMiddleware = compose(applyMiddleware(router, logger), autoRehydrate())(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
