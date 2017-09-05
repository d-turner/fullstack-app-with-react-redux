import mariaDB from './index';

const User = {
  findByUser(userId, cb) {
    return mariaDB.query('SELECT * FROM Documents WHERE user_id = :userId',
    { userId },
    cb);
  },

  findOneDocument(id, cb) {
    return mariaDB.query('SELECT * FROM Documents WHERE document_id = :id',
    { id },
    cb);
  },

  create(name, description, location, userId, cb) {
    return mariaDB.query('INSERT INTO Documents (name, description, location, user_id) VALUES (:name, :description, :location, :userId)',
    { name, description, location, userId }, cb);
  },
};

export default User;
