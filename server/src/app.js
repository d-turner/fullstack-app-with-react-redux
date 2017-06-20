// npm package
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';

// local packages
import logger from './util/logger';
import setupUserRoutes from './UserRoutes';
import passport from './config/passport';

// init app
// when testing you do not need to start the server
// you just need to test it
const app = express();


// setup logging
// morgan logs every request that comes into express in a nice format
// morgan stream your output to the logger
app.use(morgan('combined', { stream: logger.stream }));

// add body parsing
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

// passport middleware
app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());

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
