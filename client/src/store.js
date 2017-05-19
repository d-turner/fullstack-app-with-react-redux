import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducerRoot from './reducers';

const loggerMiddleware = createLogger();

const store = createStore(
  reducerRoot,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware, // neat middleware that logs actions
  ),
);

export default store;
