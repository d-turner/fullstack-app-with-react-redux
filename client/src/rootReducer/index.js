import { combineReducers } from 'redux';

import projectReducer from '../components/Project/Reducers/ProjectReducer';
// import segmentReducer from '../components/Segment/Reducers/SegmentReducer';
import documentReducer from '../components/Document/Reducers/DocumentReducer';
import commentReducer from '../components/Comments/Reducers/CommentReducer';
import authenticationReducer from '../components/Authentication/AuthReducer';
import keyLoggerReducer from '../components/KeyLogger/KeyLoggerReducer';

// Reducer Root
const appReducer = combineReducers({
  projectReducer,
  documentReducer,
  commentReducer,
  authenticationReducer,
  keyLoggerReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
