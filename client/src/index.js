/**
 * Client entry point
 */

// npm packages
import React from 'react';
import ReactDOM from 'react-dom';
import a11y from 'react-a11y';
import { Provider } from 'react-redux';
// our packages
import App from './app/app';
import store from './store';

const ENV = 'development';
if (ENV === 'development') a11y(React, /* StrictMode: { throw: true },*/ { ReactDOM });

// render on page
ReactDOM.render(
  <Provider store={store}>{App}</Provider>,
  document.getElementById('app'),
);
