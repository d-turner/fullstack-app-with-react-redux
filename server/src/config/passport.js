import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import User from '../db/user';
import logger from '../util/logger';

// Serialize sessions
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  const id = user.user_id;
  User.findOneUser(id, (err, result) => {
    done(err, result[0]);
  });
});

// Use local strategy
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
(username, password, cb) => {
  User.findByUsername(username, (err, result) => {
    const user = result[0];
    if (err) { return cb(err); }
    if (!user) { return cb(null, false); }
    if (user.password !== password) { return cb(null, false); }
    logger.info('User authenticated...');
    return cb(null, user);
  });
},
));

passport.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (req.user) { return next(req, res); }
  res.status(401).send('You are not authenticated...');
};


export default passport;
