import MariaDB from 'mariasql';

const host = '127.0.0.1';
const port = 3306;
const user = 'adapt';
const password = 'TeHQ5u2g';
const db = 'testdb';

const client = new MariaDB({
  multiStatements: true,
  host,
  port,
  user,
  password,
  db,
});

export default client;
