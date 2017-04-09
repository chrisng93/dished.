import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import example from './exampleReducer';

export default combineReducers({
  example,
  routing: routerReducer,
});
