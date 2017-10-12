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

  findDocumentBySavedName(id, cb) {
    return mariaDB.query('SELECT * FROM Documents WHERE saved_name = :id',
    { id },
    cb);
  },

  create(name, description, filename, location, userId, cb) {
    return mariaDB.query('INSERT INTO Documents (name, description, saved_name, location, user_id) VALUES (:name, :description, :filename, :location, :userId)',
    { name, description, filename, location, userId }, cb);
  },

  insertLog(documentId, location, userId, cb) {
    return mariaDB.query('INSERT IGNORE INTO Logs (document_id, location, user_id) VALUES (:documentId, :location, :userId)',
    { documentId, location, userId }, cb);
  },
};

export default User;
