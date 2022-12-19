self.addEventListener('install', function(event) {
  event.waitUntil(preLoad());
});

var preLoad = async function() {
  console.log('[Service Worker] Install Event processing');
  let cache = await caches.open('pwabuilder-offline');
  console.log('[Service Worker] Cached index and offline page during Install');
  return cache.addAll(['/index.html', '/gamestyle.css', '/manifest.json', '/js/gamevsIA.js', '/js/sb-pwa.js']);
}

self.addEventListener('fetch', function(event) {
  event.respondWith(fetch(event.request));
});
