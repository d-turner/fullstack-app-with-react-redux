// npm package
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

// local packages
import logger from './util/logger';
import setupUserRoutes from './UserRoutes';
import passport from './config/passport';
// init app
// when testing you do not need to start the server
// you just need to test it
const app = express();
// prod: const APP_HOSTNAME = 'http://kanjingo.adaptcentre.ie';
const APP_HOSTNAME = 'http://localhost:3000';

// setup logging
// morgan logs every request that comes into express in a nice format
// morgan stream your output to the logger
app.use(morgan('combined', { stream: logger.stream }));

// add body parsing
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('anything'));

// passport middleware
app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());

// cors headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', APP_HOSTNAME);
  res.header('Access-Control-Allow-Credentials', true);
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
  logger.error('unhandled application error: ', err);
  res.status(500).send(err);
  next();
});
export default app;
