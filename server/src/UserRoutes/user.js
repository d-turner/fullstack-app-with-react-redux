import passport from '../config/passport';
import User from '../db/user';

export default (app) => {
  // login routes
  app.get('/api/login', (req, res) => {
    res.send('Login Page');
  });

  app.post('/api/login', function (req, res, next) {
    passport.authenticate('login', function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({
            err: info,
        });
      }
      req.logIn(user, function (error) {
        if (error) {
          return res.status(500).json({
            err: 'Could not log in user',
          });
        }
        res.status(200).json({
          status: 'Login successful!',
        });
      });
    })(req, res, next);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/api/login');
  });

  // register routes
  app.get('/api/registered', (req, res) => {
    res.send('Registration Successful');
  });

  app.post('/api/register', (req, res) => {
    // body: { name, email, password }
    const data = req.body;
    if (!data.name && !data.email && !data.password) {
      res.status().send({ error: 'Request is not valid, missing parameters' });
    }
    res.redirect('/api/login');
  });

  // test routes
  app.get('/api/test', (req, res) => {
    passport.ensureAuthenticated(req, res, (status, reply) => {
      res.status(status).send(reply);
    });
  });
};

