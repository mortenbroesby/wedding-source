declare var workbox: any;
declare var firebase: any;

const CACHE_VERSION = 16;

console.log("Service worker cache version: ", CACHE_VERSION);

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");
importScripts("https://www.gstatic.com/firebasejs/4.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.10.0/firebase-messaging.js");

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  setupWorkbox();
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

if (firebase) {
  console.log(`Yay! Firebase is loaded 🎉`);
} else {
  console.log(`Boo! Firebase didn't load 😬`);
}

function setupWorkbox() {
  workbox.setConfig({ debug: true });

  workbox.core.setCacheNameDetails({
    prefix: "wedding-app",
    suffix: `v${CACHE_VERSION}`,
    precache: "wedding-app-precache",
    runtime: "wedding-app-runtime",
  });

  workbox.core.skipWaiting();
  workbox.core.clientsClaim();

  // Clean outdated caches
  workbox.precaching.cleanupOutdatedCaches();

  // Cache offline html
  workbox.precaching.precacheAndRoute([
    "/offline.html"
  ]);

  workbox.routing.registerRoute(
    new RegExp(".html"),
    new workbox.strategies.NetworkOnly({
      cacheName: "htmlcache"
    })
  );

  workbox.routing.setCatchHandler(({ event }: any) => {
    switch (event.request.destination) {
      case "document":
        return caches.match("offline.html");
      default:
        return Response.error();
    }
  });

  // Cache JS and CSS files.
  // Use cache but update in the background.
  workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "assets-cache",
    }),
  );

  // Cache the Google Fonts stylesheets with a stale while revalidate strategy.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "google-fonts-stylesheets",
    }),
  );

  // Cache the Google Fonts webfont files with a cache first strategy for 1 year.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
      cacheName: "google-fonts-webfonts",
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

  // Cache image files.
  // Use the cache if its available.
  workbox.routing.registerRoute(
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    new workbox.strategies.CacheFirst({
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
}
