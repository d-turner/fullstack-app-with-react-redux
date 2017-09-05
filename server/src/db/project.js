// import mariaDB from './index';

// const User = {
//   findByUsername(username, cb) {
//     return mariaDB.query('SELECT * FROM Users WHERE email = :username LIMIT 1',
//     { username },
//     cb);
//   },

//   findOneUser(id, cb) {
//     return mariaDB.query('SELECT * FROM Users WHERE user_id = :id',
//     { id },
//     cb);
//   },

//   register(email, name, hash, salt, cb) {
//     return mariaDB.query('INSERT INTO Users (email, name, password, salt) VALUES (:email, :name, :hash, :salt)',
//     { email, name, hash, salt }, cb);
//   },
// };

// export default User;
