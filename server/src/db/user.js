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

  register(email, password, salt, cb) {
    const name = 'Some Name';
    return mariaDB.query('INSERT INTO Users (email, name, password, salt) VALUES (:email, :name, :password, :salt)',
    { email, name, password, salt }, cb);
  },
};

export default User;
