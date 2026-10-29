/* SPDX-License-Identifier: AGPL-3.0-only */
'use strict';
const {app,BrowserWindow,protocol,net,session,Menu,dialog,shell}=require('electron');
const path=require('node:path'),fs=require('node:fs'),{pathToFileURL}=require('node:url');
protocol.registerSchemesAsPrivileged([{scheme:'gastos',privileges:{standard:true,secure:true,supportFetchAPI:true}}]);
const smoke=process.argv.includes('--smoke');
if(process.env.PORTABLE_EXECUTABLE_DIR)app.setPath('userData',path.join(process.env.PORTABLE_EXECUTABLE_DIR,'Marco-Gastos-Datos'));
if(process.env.MARCO_GASTOS_TEST_DATA)app.setPath('userData',process.env.MARCO_GASTOS_TEST_DATA);
app.whenReady().then(()=>{
  const root=path.resolve(__dirname,'../dist/web');
  protocol.handle('gastos',request=>{
    const url=new URL(request.url);let target;try{target=path.resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));}catch{return new Response('',{status:400});}
    if(url.host!=='app'||!target.startsWith(root+path.sep)||!['GET','HEAD'].includes(request.method))return new Response('',{status:403});
    return net.fetch(pathToFileURL(target).toString());
  });
  Menu.setApplicationMenu(null);
  const win=new BrowserWindow({width:1320,height:1000,minWidth:370,minHeight:600,title:'Marco Gastos',icon:path.join(__dirname,'../assets/icon-512.png'),backgroundColor:'#f6f6f0',show:!smoke,webPreferences:{nodeIntegration:false,contextIsolation:true,sandbox:true}});
  const ses=session.defaultSession;ses.setPermissionRequestHandler((_w,_p,cb)=>cb(false));ses.setPermissionCheckHandler(()=>false);
  function external(url){if(url==='https://github.com/Peskysa/marco-gastos')shell.openExternal(url);}
  win.webContents.setWindowOpenHandler(({url})=>{external(url);return {action:'deny'};});
  win.webContents.on('will-navigate',(e,url)=>{if(!url.startsWith('gastos://app/')){e.preventDefault();external(url);}});
  ses.on('will-download',async(_e,item)=>{const result=await dialog.showSaveDialog(win,{title:'Guardar copia',defaultPath:path.join(app.getPath('downloads'),path.basename(item.getFilename()))});if(result.canceled)item.cancel();else item.setSavePath(result.filePath);});
  win.loadURL('gastos://app/');
  if(smoke)win.webContents.once('did-finish-load',async()=>{try{const report=await win.webContents.executeJavaScript("({title:document.title,ready:document.documentElement.dataset.ready==='true',origin:location.origin})");fs.writeFileSync(process.argv[process.argv.indexOf('--smoke')+1],JSON.stringify(report));app.exit(report.ready?0:1);}catch{app.exit(1);}});
});
app.on('window-all-closed',()=>app.quit());
