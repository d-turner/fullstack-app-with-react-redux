import mariaDB from './index';

const User = {
  findByUsername(username, cb) {
    return mariaDB.query('SELECT * FROM Users WHERE email = :username LIMIT 1',
    { username },
    cb);
  },

  findOneUser(id, cb) {
    return mariaDB.query('SELECT * FROM Users WHERE user_id = :id',
    { id },
    cb);
  },
};

export default User;
