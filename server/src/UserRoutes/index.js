import User from '../db/user';
import routes from './user';
import logger from '../utils/logger';

const UserRoute = (app) => {
  app.get('/api/users/:id', (req, res) => {
    User.findOneUser(req.params.id, (err, result) => {
      if (err) logger.error(err);
      res.send(result[0]);
    });
  });

  routes(app);
};

export default UserRoute;
