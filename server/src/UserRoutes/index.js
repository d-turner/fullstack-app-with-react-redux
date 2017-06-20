import User from '../db/user';

const UserRoute = (app) => {
  app.get('/api/users/:id', (req, res) => {
    User.findOneUser(req.params.id, (err, result) => {
      if (err) console.log(err);
      console.log(result);
      res.send(result);
    });
  });
};

export default UserRoute;
