import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import todos from './todos';

// Reducer Root
const reducerRoot = combineReducers({
  todos,
  routing: routerReducer,
});

export default reducerRoot;
