import { combineReducers } from 'redux';

import projectReducer from '../components/Project/Reducers/ProjectReducer';
// import segmentReducer from '../components/Segment/Reducers/SegmentReducer';
import documentReducer from '../components/Document/Reducers/DocumentReducer';
import commentReducer from '../components/Comments/Reducers/CommentReducer';
import authenticationReducer from '../components/Authentication/AuthReducer';

// Reducer Root
const reducerRoot = combineReducers({
  projectReducer,
  documentReducer,
  commentReducer,
  authenticationReducer,
});

export default reducerRoot;
