import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import crypto from 'crypto';

import logger from '../util/logger';
import User from '../db/user';
import * as resp from '../config/Responses';


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

// Use local strategy for login
passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
(username, password, cb) => {
  User.findByUsername(username, (err, result) => {
    const user = result[0];
    if (err) {
      logger.error(`Database error ${err}`);
      return cb(err, false, resp.somethingBad);
    }
    if (!user) { return cb(null, false, resp.noUserFound); }
    return hashPassword(password, user.salt, (hashErr, hash) => {
      if (hashErr) {
        logger.error(`Hashing error ${hashErr}`);
        return cb(hashErr, false, resp.somethingBad);
      }
      if (user.password !== hash) return cb(null, false, resp.loginFailed);
      user.password = undefined;
      user.salt = undefined;
      return cb(null, user, user);
    });
  });
},
));

// Use local strategy for register
passport.use('register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
},
(req, username, password, cb) => {
  const name = req.body.name;
  User.findByUsername(username, (err, result) => {
    const user = result[0];
    if (err) {
      logger.error(`Database error ${err}`);
      return cb(err, false, resp.somethingBad);
    }
    if (user !== undefined) {
      return cb(null, false, resp.emailExists);
    }
    return hashPassword(password, (hashErr, hash, salt) => {
      if (hashErr) {
        logger.error(`Hashing error ${hashErr}`);
        return cb(hashErr, false, resp.somethingBad);
      }
      return User.register(username, name, hash, salt, (insertError, insertResult) => {
        if (insertError) {
          logger.error(`Database error ${insertError}`);
          return cb(insertError, false, resp.somethingBad);
        }
        return cb(null, false, resp.registerSuccess);
      });
    });
  });
},
));

passport.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.user) { next(); return; }
  const err = new Error('Not authenticated');
  err.status = resp.forbidden;
  next(err);
};


export default passport;
