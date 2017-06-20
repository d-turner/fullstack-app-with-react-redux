import passport from '../config/passport';

export default (app) => {
  app.post('/api/login',
  passport.authenticate('local', { failureRedirect: '/api/login' }),
  (req, res) => {
    res.redirect('/test');
  });

  app.get('/api/login', (req, res) => {
    res.send('Login Page');
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/api/login');
  });

  app.get('/test', (req, res) => {
    passport.ensureAuthenticated(req, res, (requ, resp) => {
      res.send(`Test page for user: ${JSON.stringify(requ.user)}`);
    });
  });
};

