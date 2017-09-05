import passport from '../config/passport';
import logger from '../util/logger';
import * as resp from '../config/Responses';

function authenticatedCallback(err, user, info, req, res, next) {
  if (err) return next(err);
  if (!user) {
    return res.status(resp.noAuth).json(info);
  }
  return req.logIn(user, (error) => {
    if (error) {
      logger.error(`Error: ${error}`);
      return res.status(resp.error).json(info);
    }
    return res.status(resp.good).json(info);
  });
}

export default (app) => {
  // login routes
  app.get('/api/login', (req, res) => {
    if (req.user) {
      return res.status(resp.good).json(resp.loggedIn);
    }
    return res.status(resp.good).json(resp.loggedOut);
  });

  app.post('/api/login', (req, res, next) => {
    // body: { email, password }
    passport.authenticate('login', (err, user, info) => {
      authenticatedCallback(err, user, info, req, res, next);
    })(req, res, next);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/api/login');
  });

  // register routes
  app.post('/api/register', (req, res, next) => {
    // body: { name, email, password }
    const data = req.body;
    if (!data.name || !data.email || !data.password) {
      // Unprocessable Entity
      res.status(resp.unprocessable).json(resp.badParameters);
    }
    passport.authenticate('register', (err, user, info) => {
      // authenticatedCallback(err, user, info, req, res, next);
      if (err) next(err);
      if (info.error) res.status(resp.conflict).json(info);
      res.status(resp.good).json(info);
    })(req, res, next);
  });

  // test routes
  app.get('/api/test', (req, res) => {
    passport.ensureAuthenticated(req, res, (status, reply) => {
      res.status(status).json(reply);
    });
  });
};
