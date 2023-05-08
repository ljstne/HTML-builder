const fs = require('fs');
const path = require('path');

const textFilePath = path.join(__dirname, 'text.txt');

const readStream = fs.createReadStream(textFilePath);

readStream.setEncoding('utf8');

readStream.on('data', function(res) {
  console.log(res);
});