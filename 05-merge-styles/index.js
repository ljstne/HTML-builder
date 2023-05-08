const path = require('path');
const fs = require('fs');
const { readdir } =  require('node:fs/promises');

const bundleFolder = path.join(__dirname, './project-dist');
const folderCSS = path.join(__dirname, './styles');

async function bundleCSS(folder) {
  let stylesArray = [];

  const  bundleFile = path.join(`${bundleFolder}\\bundle.css`);
  const emptyStr = '';
  await fs.promises.writeFile(bundleFile, emptyStr);

  const files = await readdir(folder, {withFileTypes: true});

  for (const file of files) {
    const ext = path.extname(file.name);
    if (file.isFile() && ext === '.css') {
      const pathToFile = path.join(folder, file.name);
      const data = await fs.promises.readFile(pathToFile, 'utf8');
      stylesArray.push(data);
    }
  }
      
  await Promise.all(
    stylesArray.map((file) => {
      return fs.promises.appendFile(bundleFile, file);
    })
  );
           

}
bundleCSS(folderCSS);