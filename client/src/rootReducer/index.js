import { combineReducers } from 'redux';

import projectReducer from '../components/Project/Reducers/ProjectReducer';
// import segmentReducer from '../components/Segment/Reducers/SegmentReducer';
import documentReducer from '../components/Document/Reducers/DocumentReducer';
import commentReducer from '../components/Comments/Reducers/CommentReducer';

// Reducer Root
const reducerRoot = combineReducers({
  projectReducer,
  documentReducer,
  commentReducer,
});

export default reducerRoot;
