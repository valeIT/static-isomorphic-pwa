const FILES_TO_CACHE = [
  '/',
  '/build/app.css',
  '/build/app.js',
  '/build/runtime.js'
];

const version = 1;
const DATA_CACHE_NAME = 'data-cache-v' + version;
const CACHE_NAME = 'static-cache-v' + version;


self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
          console.log('[ServiceWorker] Pre-caching offline page');
          return cache.addAll(FILES_TO_CACHE);
        })
    );
})

self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
            if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
              console.log('[ServiceWorker] Removing old cache', key);
              return caches.delete(key);
            }
          }));
        })
    );
})


self.addEventListener('fetch', event => {
    const req = event.request;
    event.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(req);
  return cachedResponse || fetch(req);
}
