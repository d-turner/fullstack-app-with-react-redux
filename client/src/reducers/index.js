import { combineReducers } from 'redux';

import todoReducer from './todoReducer';
import userReducer from './userReducer';
import projectReducer from './projectReducer';
import segmentReducer from './segmentReducer';
import documentReducer from '../components/Document/Reducers/DocumentReducer';

// Reducer Root
const reducerRoot = combineReducers({
  todoReducer,
  userReducer,
  projectReducer,
  segmentReducer,
  documentReducer,
});

export default reducerRoot;
