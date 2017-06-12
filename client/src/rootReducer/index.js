import { combineReducers } from 'redux';

import projectReducer from '../components/Project/Reducers/ProjectReducer';
// import segmentReducer from '../components/Segment/Reducers/SegmentReducer';
import documentReducer from '../components/Document/Reducers/DocumentReducer';
import FindReplaceReducer from '../components/FindReplace/Reducers/FindReplaceReducer';

// Reducer Root
const reducerRoot = combineReducers({
  projectReducer,
  documentReducer,
  FindReplaceReducer,
});

export default reducerRoot;
