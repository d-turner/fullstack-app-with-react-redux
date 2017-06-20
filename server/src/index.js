// our packages
import app from './app';
import logger from './util/logger';
import mariaDB from './db';

mariaDB.connect(() => {
  logger.info('Connected to MariaDb, starting server...');
  app.listen(8080, () => {
    const host = '127.0.0.1';
    const port = 8080;
    logger.info(`App listening at http://${host}:${port}`);
  });
});

mariaDB
.on('error', (err) => {
  logger.error(`Client error: ${err}`);
})
.on('close', (hadError) => {
  logger.info(`Client closed: ${hadError}`);
});

process.on('uncaughtException', err => logger.error('Uncaught Exception Error:', err));
process.on('unhandledRejection', err => logger.error('Unhandled Rejection Error:', err));
