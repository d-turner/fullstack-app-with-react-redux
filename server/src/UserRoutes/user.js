import User from '../db/user';
import passport from '../config/passport';
import * as resp from '../config/Responses';

function authenticatedCallback(user, info, req, res, next) {
  if (!user) {
    return res.status(resp.noAuth).json(info);
  }
  return req.logIn(user, (error) => {
    if (error) return next(error);
    return res.status(resp.good).json(info);
  });
}

export default (app) => {
  // TODO: remove this in production code, just for testing
  app.get('/api/users/:id', (req, res, next) => {
    User.findOneUser(req.params.id, (err, result) => {
      if (err) { next(err); return; }
      res.status(resp.good).json(result[0]);
    });
  });

  // login routes
  app.get('/api/login', (req, res) => {
    if (req.user) { res.status(resp.good).json(resp.loggedIn); return; }
    res.status(resp.good).json(resp.loggedOut);
  });

  app.post('/api/login', (req, res, next) => {
    // body: { email, password }
    passport.authenticate('login', (err, user, info) => {
      if (err) return next(err);
      return authenticatedCallback(user, info, req, res, next);
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
      if (err) { next(err); return; }
      if (info.error) { res.status(resp.conflict).json(info); return; }
      res.status(resp.good).json(info);
    })(req, res, next);
  });

  // test routes
  app.get('/api/test', passport.ensureAuthenticated, (req, res) => {
    res.status(resp.good).json({ status: 'Authenticated', data: req.user });
  });
};
