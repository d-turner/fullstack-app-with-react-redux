import { combineReducers } from 'redux';

import todoReducer from './todoReducer';
import userReducer from './userReducer';
import projectReducer from './projectReducer';

// Reducer Root
const reducerRoot = combineReducers({
  todoReducer,
  userReducer,
  projectReducer,
});

export default reducerRoot;
