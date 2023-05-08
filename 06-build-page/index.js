const path = require('path');
const fs = require('fs');
const { readdir } =  require('node:fs/promises');

const templateFile = path.join(__dirname, './template.html');
// const headerFile = path.join(__dirname, './components/header.html');
// const articlesFile = path.join(__dirname, './components/articles.html');
// const footerFile = path.join(__dirname, './components/footer.html');

const projectFolder = path.join(__dirname, './project-dist');
fs.promises.mkdir(projectFolder, {recursive: true});


const bundleTemplates = async function() {

    
  let template = await fs.promises.readFile(templateFile);
    
  const componentsFolder = './06-build-page/components';

  const components =await readdir(componentsFolder, {withFileTypes: true});


  for (const component of components) {
    const componentPath =  path.join(__dirname, `./components/${component.name}`);
    const componentInnerHtml = await fs.promises.readFile(componentPath, 'utf8');
    const componentName = component.name.slice(0,component.name.indexOf('.'))
    template = template.toString().replace(`{{${componentName}}}`, componentInnerHtml);
  }

   fs.writeFile('./06-build-page/project-dist/index.html', template, (err) => {
    if (err) {console.log(err
    );}
  });


};

async function bundleCSS(folder) {
  let stylesArray = [];

  const  bundleFile = path.join('.\\06-build-page\\project-dist\\style.css');
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

async function copyDir(folder) {
  // const copyFolder = path.join(__dirname, '.\\project-dist\\assets');

  // await fs.promises.rm(copyFolder, {force: true, recursive: true});

  await fs.promises.mkdir(copyFolder, {force: true ,recursive: true});

  const files = await readdir(folder, {withFileTypes: true});

  for (const file of files) {
    if (file.isFile()) {
      const pathToFile = path.join(folder, file.name);
      let copyPath = '.\\06-build-page\\project-dist\\' + pathToFile.substring(pathToFile.indexOf('assets\\'));
      await copyAssets(pathToFile, copyPath);
    }
    else if (file.isDirectory()) {
      const folderToCopy = path.join(copyFolder, file.name);
      await fs.promises.mkdir(folderToCopy, {force: true, recursive: true });
      await copyDir(path.join(folder, file.name));
    }
  }
}
  
async function copyAssets(from, to) {
  fs.copyFile(from, to, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

const folderAssets = path.join(__dirname, './assets');

const copyFolder = path.join(__dirname, '.\\project-dist\\assets');

async function copyDirWrapper() {
  await fs.promises.rm(copyFolder, {force: true, recursive: true});

  await copyDir(folderAssets);

}
copyDirWrapper();

const folderCSS = path.join(__dirname, './styles');

bundleCSS(folderCSS);
bundleTemplates();
