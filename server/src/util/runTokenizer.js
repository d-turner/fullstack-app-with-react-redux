const spawn = require('child_process').spawn;

const tokenizeString = (sentence, callback) => {
  const pythonProcess = spawn('/home/adapt/Documents/git/kanjingo-react-redux/server/pythonDependencies/bin/python', ['/home/adapt/Documents/git/kanjingo-react-redux/server/src/util/tokenizer.py', sentence]);

  pythonProcess.stdout.on('data', (data) => {
    let dataString = data.toString();
    // dataString = dataString.replace(/``/g, '"');
    // dataString = dataString.replace(/''/g, '"');
    if (dataString === 'ZZZXXXZZZXXX') return callback([]);
    return callback(dataString.split('ZZZXXXZZZXXX'));
  });
};

export default tokenizeString;
