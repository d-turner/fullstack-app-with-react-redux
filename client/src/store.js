import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducerRoot from './rootReducer';

const loggerMiddleware = createLogger();
let middleware = null;
const ENV = process.env.NODE_ENV;
if (ENV === 'development') {
  middleware = applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware, // neat middleware that logs actions
  );
} else {
  middleware = applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
  );
}
const store = createStore(
  reducerRoot,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  middleware,
);

export default store;
