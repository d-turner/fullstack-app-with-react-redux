import User from '../db/user';
import userRoutes from './user';
import documentRoutes from './document';
import logger from '../util/logger';

const UserRoute = (app) => {
  app.get('/api/users/:id', (req, res) => {
    User.findOneUser(req.params.id, (err, result) => {
      if (err) logger.error(err);
      res.send(result[0]);
    });
  });

  userRoutes(app);
  documentRoutes(app);
};

export default UserRoute;
