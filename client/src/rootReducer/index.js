import { combineReducers } from 'redux';

import projectReducer from '../components/Project/Reducers/ProjectReducer';
import segmentReducer from '../components/Segment/Reducers/SegmentReducer';
import documentReducer from '../components/Document/Reducers/DocumentReducer';

// Reducer Root
const reducerRoot = combineReducers({
  projectReducer,
  segmentReducer,
  documentReducer,
});

export default reducerRoot;
