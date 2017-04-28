import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import todoReducer from './todoReducer';
import userReducer from './userReducer';
import projectReducer from './projectReducer';

// Reducer Root
const reducerRoot = combineReducers({
  todoReducer,
  userReducer,
  projectReducer,
  routing: routerReducer,
});

export default reducerRoot;
