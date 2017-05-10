/**
 * Aggregate reducers
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './userReducer';
import searchProcess from './searchProcessReducer';
import modal from './modalReducer';

export default combineReducers({
  user,
  searchProcess,
  modal,
  routing: routerReducer,
});
