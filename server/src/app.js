// npm package
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';

// local packages
import logger from './util/logger';
import * as resp from './config/Responses';
import setupUserRoutes from './UserRoutes';
import passport from './config/passport';
// init app
// when testing you do not need to start the server
// you just need to test it
const app = express();
// prod: const APP_HOSTNAME = 'http://kanjingo.adaptcentre.ie';
const APP_HOSTNAME = 'http://localhost:3000';
// const APP_HOSTNAME = 'http://192.168.1.17:3000';
// const APP_HOSTNAME = 'http://10.42.0.1:3000';

// setup logging
// morgan logs every request that comes into express in a nice format
// morgan stream your output to the logger
app.use(morgan('combined', { stream: logger.stream }));

// add body parsing
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

// passport middleware
app.use(session({
  secret: 'kanjingo-1486729324',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// cors headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', APP_HOSTNAME);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Max-Age', 1728000);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello !');
});

// add all custom api routes here
setupUserRoutes(app);

// catch all unhandled errors
app.use((err, req, res, next) => {
  logger.error(`Error message: ${err.message}`);
  logger.error(`Error stack: ${err.stack}`);
  if (err.message.startsWith('Duplicate entry')) err.status = resp.conflict;
  res.status(err.status || resp.error).json({ error: err.message });
  next();
});
export default app;
