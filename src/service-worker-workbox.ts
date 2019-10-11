const CACHE_VERSION = 8;

import workbox from "workbox-sw";

if (workbox) {
  workbox.core.setCacheNameDetails({
    prefix: "wedding-app",
    suffix: `v${CACHE_VERSION}`,
    precache: "wedding-app-precache",
    runtime: "wedding-app-runtime",
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

  workbox.googleAnalytics.initialize();

  workbox.routing.registerNavigationRoute("/index.html");

  workbox.precaching.cleanupOutdatedCaches();
}
