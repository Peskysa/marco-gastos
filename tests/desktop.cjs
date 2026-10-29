'use strict';
const {_electron:electron}=require('playwright'),assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs');
(async()=>{
 const root=path.resolve(__dirname,'..');fs.mkdirSync(path.join(root,'test-output'),{recursive:true});const folder=fs.mkdtempSync(path.join(root,'test-output','desktop-'+process.platform+'-')),env={...process.env,MARCO_GASTOS_TEST_DATA:folder};
 const executablePath=path.resolve(process.argv[2]);let app=await electron.launch({executablePath,args:[],env,timeout:60000});
 try{let page=await app.firstWindow();await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');await page.click('#add');await page.fill('#entry-amount','19,95');await page.fill('#entry-note','Persistencia entre sesiones');await page.click('#entry-form button[type=submit]');assert.equal(await page.locator('#entries tr').count(),1);assert.equal(await page.evaluate(()=>typeof require),'undefined');assert.equal(await page.evaluate(()=>location.origin),'gastos://app');await app.close();app=null;
 app=await electron.launch({executablePath,args:[],env,timeout:60000});page=await app.firstWindow();await page.waitForFunction(()=>document.documentElement.dataset.ready==='true');assert.ok(await page.getByText('Persistencia entre sesiones',{exact:true}).isVisible());assert.equal(await page.locator('#entries tr').count(),1);assert.ok((await page.textContent('#expense')).includes('19,95'));
 fs.writeFileSync(path.join(root,'test-output/desktop-report-'+process.platform+'.json'),JSON.stringify({packaged:true,persistsAcrossRestarts:true,sandbox:true,stableOrigin:true}));console.log('Escritorio empaquetado: movimiento y persistencia entre dos sesiones verificados.');
 }finally{if(app)await app.close();}
})().catch(e=>{console.error(e);process.exit(1);});
