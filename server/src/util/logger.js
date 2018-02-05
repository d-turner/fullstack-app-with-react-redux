import winston from 'winston';

/*
  es6 do expression
  not officially supported by eslint
  https://ponyfoo.com/articles/proposal-statements-as-expressions-using-do
  https://babeljs.io/docs/plugins/transform-do-expressions/
  bugref: https://github.com/babel/eslint-plugin-babel/issues/13
  do automatically returns last value

  let object = {
    level: do {
      if (process.env.NODE_ENV === 'testing') {
        'error';
      } else if (process.env.NODE_ENV === 'production') {
        'info';
      } else {
        'debug';
      }
    }
  }
*/

let level = 'debug';
if (process.env.NODE_ENV === 'testing') {
  level = 'error';
} else if (process.env.NODE_ENV === 'production') {
  level = 'info';
}

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level,
      colorize: true,
      timestamp: true,
      prettyPrint: true,
      label: 'kanjingo-server',
    }),
  ],
});

logger.stream = {
  write: message => logger.info(message),
};


export default logger;
