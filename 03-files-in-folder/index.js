const fs = require('fs');
const path = require('path');
const { readdir } =  require('node:fs/promises');


const secretFolder = path.join(__dirname, './secret-folder');

async function read(folder) {
  const files = await readdir(folder, { withFileTypes: true });
  files.forEach(async (file) => {
    if (file.isFile()) {
      const pathToFile = path.join(folder, file.name);
      const stats = await fs.promises.stat(pathToFile);
      const base = path.parse(pathToFile).name;
      let ext = path.extname(pathToFile);
      ext = ext.replace('.', '');
      console.log(base + ' - ' + ext + ' - ' + stats.size);
    }
    // else if (file.isDirectory()) {
    //     await read(path.join(secretFolder, file.name));
    //   }
  });
  return;
}
read(secretFolder);

// const fs = require('fs');
// const path = require('path');
// const { readdir } =  require('node:fs/promises');

// const secretFolder = path.join(__dirname, './secret-folder');

// async function read(folderPath) {
//   const files = await readdir(folderPath, { withFileTypes: true });
//   files.forEach(async (file) => {
//     if (file.isFile()) {
//       console.log(file.name);
//       const pathToFile = path.join(folderPath, file.name);
//       const stats = await fs.promises.stat(pathToFile);
//       console.log(stats);
//     } else if (file.isDirectory()) {
//       await read(path.join(folderPath, file.name));
//     }
//   });
// }

// read(secretFolder);
// .then(file => {
//     console.log(file);
//     console.log(fs.stat(file[0]));
//     });

// const data = read(secretFolder);
// console.log(read(secretFolder));