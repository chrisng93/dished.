import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './userReducer';
import searchProcess from './searchProcessReducer';

export default combineReducers({
  user,
  searchProcess,
  routing: routerReducer,
});
