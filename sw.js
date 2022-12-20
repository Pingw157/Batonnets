self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('game-store').then((cache) => cache.addAll(['/index.html', '/gamestyle.css', '/manifest.webmanifest', '/app.js']))
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});


self.addEventListener('install', (e) => {
  e.waitUntil(caches.open('game-store').then(async (cache) => {
    let ok,
    c = ['/index.html', '/gamestyle.css', '/manifest.json', '/app.js'];

    console.log('ServiceWorker: Caching files:', c.length, c);
    try {
      ok = await cache.addAll(c);
    } catch (err) {
      console.error('sw: cache.addAll');
      for await (let i of c) {
        try {
          ok = await cache.add(i);
        } catch (err) {
          console.warn('sw: cache.add',i);
        }
      }
    }

    return ok;
  }));

  console.log('ServiceWorker installed');
});
