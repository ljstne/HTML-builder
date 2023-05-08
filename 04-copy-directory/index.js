const path = require('path');
const fs = require('fs');
const { readdir } =  require('node:fs/promises');

const copyOriginDir = path.join(__dirname, './files');

async function copyDir(folder) {
  const copyFolder = path.join(__dirname, './files-copy');
  fs.promises.mkdir(copyFolder, {recursive: true});

  const files = await readdir(folder, {withFileTypes: true});
  files.forEach(async (file) => {
    if (file.isFile()) {
      const pathToFile = path.join(folder, file.name);
      fs.copyFile(pathToFile, `04-copy-directory\\files-copy\\${file.name}`, (err) => {
        if (err) {
          console.error(err);
        }
      });
    }
  });
}
copyDir(copyOriginDir);