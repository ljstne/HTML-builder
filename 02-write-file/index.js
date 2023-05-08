const process = require('process');
const fs = require('fs');
const path = require('path');
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const outputFile = path.join(__dirname, 'out.txt');
fs.writeFile(outputFile, '', (err)=>{if(err){console.log(err);}});
const writeStream = fs.createWriteStream(outputFile, {flags: 'a'});

function prompt() {
  readline.question('input here ', (text) => {
    if (text === 'exit') {
      readline.close();
    }
    else {
      writeStream.write(text);
      prompt();
    
    }

  });
  readline.on('close', () => {
    writeStream.end();
    console.log('goodbye!');
  });
}
prompt();
    

