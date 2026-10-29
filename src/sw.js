/* SPDX-License-Identifier: AGPL-3.0-only */
const CACHE='marco-gastos-1.0.0',FILES=['./','index.html','styles.css','core.js','app.js','manifest.webmanifest','assets/icon.svg','assets/icon-192.png','assets/icon-512.png','LICENSE','NOTICE','THIRD_PARTY.md','MANUAL.md'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('marco-gastos-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request)));});
