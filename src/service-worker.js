// -------
// REGULAR

const CACHE_VERSION = 6;

const offlineUrl = '/offline.html';

const currentCache = {
  offline: `offline-cache-v${CACHE_VERSION}`
};

/**
 * The event listener for the service worker installation
 */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline)
      .then(cache => cache.addAll([
        offlineUrl
      ]))
  );
});

/**
* Is the current request for an HTML page?
* @param {Object} event
*/
function isHtmlPage(event) {
  return event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html');
}

/**
* Fetch and cache any results as we receive them.
*/
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Only return cache if it's not an HTML page
      if (response && !isHtmlPage(event)) {
        return response;
      }

      return fetch(event.request).then((fetchResponse) => {
        // Dont cache if not a 200 response
        if (!fetchResponse || fetchResponse.status !== 200) {
          return fetchResponse;
        }

        const responseToCache = fetchResponse.clone();

        caches.open(currentCache.offline)
          .then((cache) => {
            console.log("sw.js fetch cache: ", event.request);
            cache.put(event.request, responseToCache);
          });

        return fetchResponse;
      }).catch((error) => {
        console.log("sw.js fetch error: ", error);

        // Check if the user is offline first and is trying to navigate to a web page
        if (isHtmlPage(event)) {
          return caches.match(offlineUrl);
        }
      });
    })
  );
});

// Cleanup stale cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== currentCache.offline)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

// -------
// WORKBOX

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js",
);

if (workbox) {
  workbox.core.setCacheNameDetails({
    prefix: 'wedding-app',
    suffix: `v${CACHE_VERSION}`,
    precache: 'wedding-app-precache',
    runtime: 'wedding-app-runtime',
  });

  workbox.core.skipWaiting();
  workbox.core.clientsClaim();

  // By default all resources are cached when they are first encountered.
  // Any subsequent HTTP request will immediately return a copy from the cache
  workbox.routing.setDefaultHandler(
    new workbox.strategies.StaleWhileRevalidate()
  );

  // Cache the Google Fonts stylesheets with a stale while revalidate strategy.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    }),
  );

  // Cache the Google Fonts webfont files with a cache first strategy for 1 year.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
        }),
      ],
    }),
  );

  // Cache CSS files.
  // Use cache but update in the background.
  workbox.routing.registerRoute(
    /\.css$/,
    new workbox.strategies.StaleWhileRevalidate({
      // Use a custom cache name.
      cacheName: "css-cache",
    }),
  );

  // Cache image files.
  // Use the cache if its available.
  workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    new workbox.strategies.CacheFirst({
      // Use a custom cache name.
      cacheName: "image-cache",
      plugins: [
        new workbox.expiration.Plugin({
          // Cache only 20 images.
          maxEntries: 20,
          // Cache for a maximum of a week.
          maxAgeSeconds: 7 * 24 * 60 * 60,
        }),
      ],
    }),
  );

  // workbox.precaching.precacheAndRoute([]);

  workbox.googleAnalytics.initialize();

  workbox.routing.registerNavigationRoute("/index.html");

  workbox.precaching.cleanupOutdatedCaches();
}
