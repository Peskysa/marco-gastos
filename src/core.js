/* SPDX-License-Identifier: AGPL-3.0-only · Marco Pescador */
(function(root,factory){if(typeof module==='object'&&module.exports)module.exports=factory();else root.Gastos=factory();})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const EXPENSE=['Alimentación','Vivienda','Transporte','Salud','Ocio','Compras','Educación','Otros gastos'];
 const INCOME=['Nómina','Otros ingresos'];
 const CATEGORIES=[...EXPENSE,...INCOME],MAX=999999999,MAX_ENTRIES=10000;
 function fail(message){throw new Error(message);}
 function validMonth(m){return typeof m==='string'&&/^\d{4}-(0[1-9]|1[0-2])$/.test(m)&&Number(m.slice(0,4))>=1900&&Number(m.slice(0,4))<=2199;}
 function validDate(d){if(typeof d!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(d)||!validMonth(d.slice(0,7)))return false;const x=new Date(d+'T12:00:00Z');return !isNaN(x)&&x.toISOString().slice(0,10)===d;}
 function cents(text){const s=String(text).trim();if(!/^\d{1,7}([.,]\d{1,2})?$/.test(s))fail('Escribe un importe positivo con un máximo de dos decimales, sin separadores de miles.');const [a,b='']=s.replace(',','.').split('.');const n=Number(a)*100+Number(b.padEnd(2,'0'));if(!Number.isSafeInteger(n)||n<=0||n>MAX)fail('El importe debe estar entre 0,01 y 9.999.999,99 €.');return n;}
 function money(n){return new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR'}).format(n/100);}
 function amountText(n){return (n/100).toFixed(2).replace('.',',');}
 function empty(){return {version:1,currency:'EUR',demo:false,entries:[],budgets:{}};}
 function entry(value){if(!value||typeof value!=='object')fail('Movimiento inválido.');const {id,date,type,category,amount,note}=value;
  if(typeof id!=='string'||!/^[a-zA-Z0-9_-]{1,80}$/.test(id)||!validDate(date)||!['expense','income'].includes(type)||!(type==='expense'?EXPENSE:INCOME).includes(category)||!Number.isSafeInteger(amount)||amount<=0||amount>MAX||typeof note!=='string'||note.length>200)fail('Hay un movimiento con fecha, categoría, concepto o importe inválido.');
  return {id,date,type,category,amount,note:note.trim()};
 }
 function validate(value){if(!value||value.version!==1||value.currency!=='EUR'||!Array.isArray(value.entries)||value.entries.length>MAX_ENTRIES||!value.budgets||typeof value.budgets!=='object'||Array.isArray(value.budgets)||typeof value.demo!=='boolean')fail('La copia no tiene el formato de Marco Gastos (versión 1, EUR).');
  const entries=value.entries.map(entry);if(new Set(entries.map(e=>e.id)).size!==entries.length)fail('La copia contiene identificadores repetidos.');
  const budgets={};if(Object.keys(value.budgets).length>3600)fail('La copia tiene demasiados presupuestos.');
  for(const [month,limits] of Object.entries(value.budgets)){if(!validMonth(month)||!limits||typeof limits!=='object'||Array.isArray(limits))fail('Presupuesto inválido.');budgets[month]={};for(const [cat,n] of Object.entries(limits)){if(!EXPENSE.includes(cat)||!Number.isSafeInteger(n)||n<=0||n>MAX)fail('Límite de presupuesto inválido.');budgets[month][cat]=n;}}
  return {version:1,currency:'EUR',demo:value.demo,entries,budgets};
 }
 function parse(text){if(typeof text!=='string'||text.length>5000000)fail('La copia supera el límite de 5 MB.');return validate(JSON.parse(text));}
 function upsert(state,value){const e=entry(value),next=validate(state),i=next.entries.findIndex(x=>x.id===e.id);if(i<0){if(next.entries.length>=MAX_ENTRIES)fail('Límite de 10.000 movimientos alcanzado.');next.entries.push(e);}else next.entries[i]=e;return next;}
 function remove(state,id){const next=validate(state);next.entries=next.entries.filter(e=>e.id!==id);return next;}
 function budget(state,month,category,amount){if(!validMonth(month)||!EXPENSE.includes(category)||!Number.isSafeInteger(amount)||amount<0||amount>MAX)fail('Presupuesto inválido.');const next=validate(state);next.budgets[month]||={};if(amount===0)delete next.budgets[month][category];else next.budgets[month][category]=amount;return next;}
 function folded(s){return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
 function select(state,month,filter={}){return state.entries.filter(e=>e.date.slice(0,7)===month&&(!filter.type||e.type===filter.type)&&(!filter.category||e.category===filter.category)&&(!filter.search||folded(e.note+' '+e.category).includes(folded(filter.search)))).sort((a,b)=>b.date.localeCompare(a.date)||b.id.localeCompare(a.id));}
 function summary(state,month){const entries=select(state,month),byCategory=Object.fromEntries(EXPENSE.map(c=>[c,0]));let income=0,expense=0;for(const e of entries){if(e.type==='income')income+=e.amount;else{expense+=e.amount;byCategory[e.category]+=e.amount;}}return {income,expense,balance:income-expense,count:entries.length,byCategory};}
 function csv(state,month){const safe=v=>'"'+(/^[\s]*[=+\-@\t\r\n]/.test(String(v))?"'":'')+String(v).replace(/"/g,'""')+'"';return '\ufeff'+[['Fecha','Tipo','Categoría','Concepto','Importe EUR'],...select(state,month).map(e=>[e.date,e.type==='income'?'Ingreso':'Gasto',e.category,e.note,amountText(e.amount)])].map(row=>row.map(safe).join(';')).join('\r\n');}
 function demo(month){if(!validMonth(month))fail('Mes inválido.');const state=empty();state.demo=true;const data=[['01','income','Nómina',210000,'Ingreso de ejemplo'],['02','expense','Vivienda',69000,'Alquiler'],['04','expense','Alimentación',5260,'Compra semanal'],['06','expense','Transporte',4200,'Combustible'],['08','expense','Ocio',2400,'Excursión'],['10','expense','Alimentación',3875,'Mercado'],['12','expense','Salud',1850,'Farmacia'],['14','expense','Educación',2900,'Material escolar']];state.entries=data.map((r,i)=>({id:'demo_'+i,date:month+'-'+r[0],type:r[1],category:r[2],amount:r[3],note:r[4]}));state.budgets[month]={'Alimentación':30000,'Transporte':12000,'Ocio':10000,'Vivienda':70000};return state;}
 return Object.freeze({EXPENSE,INCOME,CATEGORIES,MAX_ENTRIES,cents,money,amountText,validDate,validMonth,empty,validate,parse,upsert,remove,budget,select,summary,csv,demo});
});
