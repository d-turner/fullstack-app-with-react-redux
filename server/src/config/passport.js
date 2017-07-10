import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import crypto from 'crypto';

import User from '../db/user';
import logger from '../util/logger';

const LEN = 256;
const SALT_LEN = 64;
const ITERATIONS = 10000;
const DIGEST = 'sha256';

function hashPassword(password, salt, callback) {
  const len = LEN / 2;
  if (arguments.length === 3) {
    crypto.pbkdf2(password, salt, ITERATIONS, len, DIGEST, (err, derivedKey) => {
      if (err) {
        return callback(err);
      }

      return callback(null, derivedKey.toString('hex'));
    });
  } else {
    callback = salt;
    crypto.randomBytes(SALT_LEN / 2, (error, newSalt) => {
      if (error) {
        return callback(error);
      }

      const generatedSalt = newSalt.toString('hex');
      return crypto.pbkdf2(password, generatedSalt, ITERATIONS, len, DIGEST, (err, derivedKey) => {
        if (err) {
          return callback(err);
        }

        return callback(null, derivedKey.toString('hex'), generatedSalt);
      });
    });
  }
}

// Serialize sessions
passport.serializeUser((user, done) => {
  user.password = undefined;
  user.salt = undefined;
  done(null, user);
});

passport.deserializeUser((user, done) => {
  const id = user.user_id;
  User.findOneUser(id, (err, result) => {
    const user1 = result[0];
    user1.salt = undefined;
    user1.password = undefined;
    done(err, user1);
  });
});

// Use local strategy
passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
(username, password, cb) => {
  User.findByUsername(username, (err, result) => {
    const user = result[0];
    if (err) { return cb(err); }
    if (!user) { return cb(null, false); }
    return hashPassword(password, user.salt, (hashErr, hash) => {
      if (hashErr) {
        logger.error(hashErr);
        return cb(hashErr, false);
      }
      if (user.password !== hash) { return cb(null, false); }
      logger.info('User authenticated...');
      user.password = undefined;
      user.salt = undefined;
      return cb(null, user);
    });
  });
},
));

passport.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(200, `Test page for user: ${JSON.stringify(req.user)}`); }
  if (req.user) { return next(200, `Test page for user: ${JSON.stringify(req.user)}`); }
  return next(401, 'You are not authenticated...');
};


export default passport;
