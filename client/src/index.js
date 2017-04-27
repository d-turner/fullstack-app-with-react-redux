/**
 * Client entry point
 */

// npm packages
import React from 'react';
import ReactDOM from 'react-dom';
import a11y from 'react-a11y';

// our packages
import App from './app/app';

const ENV = 'development';
if (ENV === 'development') a11y(React, /* StrictMode: { throw: true },*/ { ReactDOM });

// render on page
ReactDOM.render(<App />, document.getElementById('app'));
