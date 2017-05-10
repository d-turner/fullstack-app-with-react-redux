import { combineReducers } from 'redux';

import todoReducer from './todoReducer';
import userReducer from './userReducer';
import projectReducer from './projectReducer';
import segmentReducer from './segmentReducer';

// Reducer Root
const reducerRoot = combineReducers({
  todoReducer,
  userReducer,
  projectReducer,
  segmentReducer,
});

export default reducerRoot;
