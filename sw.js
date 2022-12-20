self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('fox-store').then((cache) => cache.addAll(['/index.html', '/gamestyle.css', '/manifest.json', '/js/', '/js/gamevsIA.js', '/js/sb-pwa.js']);
}

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
