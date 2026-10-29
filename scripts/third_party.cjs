'use strict';
const fs=require('node:fs'),path=require('node:path'),root=path.resolve(__dirname,'..');
for(const name of ['electron','electron-builder','playwright','sharp']){
 const folder=path.dirname(require.resolve(name+'/package.json')),out=path.join(root,'licenses',name);fs.mkdirSync(out,{recursive:true});
 for(const file of fs.readdirSync(folder)){if(/^licen[cs]e|^notice/i.test(file)&&fs.statSync(path.join(folder,file)).isFile())fs.copyFileSync(path.join(folder,file),path.join(out,file));}
 const meta=require(name+'/package.json');fs.writeFileSync(path.join(out,'component.json'),JSON.stringify({name,version:meta.version,license:meta.license,repository:meta.repository},null,2));
}
const chrome=path.join(root,'node_modules/electron/dist/LICENSES.chromium.html');if(fs.existsSync(chrome))fs.copyFileSync(chrome,path.join(root,'licenses/electron/LICENSES.chromium.html'));
console.log('Licencias y versiones de terceros conservadas.');
