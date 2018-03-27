const spawn = require('child_process').spawn;

export const tokenizeString = (sentence, callback) => {
  const pythonProcess = spawn('./pythonDependencies/bin/python', ['./src/util/tokenizer.py', sentence]);

  pythonProcess.stdout.on('data', (data) => {
    if (data.toString() === 'ZZZXXXZZZXXX') return callback([]);
    return callback(data.toString().split('ZZZXXXZZZXXX'));
  });
};
