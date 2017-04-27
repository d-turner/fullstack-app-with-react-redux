/**
 * Client entry point
 */

// npm packages
import React from 'react';
import ReactDOM from 'react-dom';
import a11y from 'react-a11y';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import store from './store';
// our packages
import App from './app/app';

const ENV = 'development';
if (ENV === 'development') a11y(React, /* StrictMode: { throw: true },*/ { ReactDOM });

const history = syncHistoryWithStore(browserHistory, store);

// render on page
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
