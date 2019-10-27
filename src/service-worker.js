import { find } from "lodash-es";

const CACHE_VERSION = 31;

console.log("Service worker cache version: ", CACHE_VERSION);

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");
importScripts("https://www.gstatic.com/firebasejs/4.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.10.0/firebase-messaging.js");

const images = require("./*.png");
const icon = find(images, (image, key) => key === "android-chrome-192x192");

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

  // Cache JS and CSS files.
  // Use cache but update in the background.
  // workbox.routing.registerRoute(
  //   /\.(?:js|css)$/,
  //   new workbox.strategies.StaleWhileRevalidate({
  //     cacheName: "assets-cache",
  //   }),
  // );

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
  // workbox.routing.registerRoute(
  //   /\.(?:png|jpg|jpeg|svg|gif)$/,
  //   new workbox.strategies.CacheFirst({
  //     cacheName: "image-cache",
  //     plugins: [
  //       new workbox.expiration.Plugin({
  //         // Cache only 20 images.
  //         maxEntries: 20,
  //         // Cache for a maximum of a week.
  //         maxAgeSeconds: 7 * 24 * 60 * 60,
  //       }),
  //     ],
  //   }),
  // );

  // Cache offline html
  // workbox.precaching.precacheAndRoute(["/index.html"]);

  // // Register SPA entry point
  // workbox.routing.registerNavigationRoute(
  //   workbox.precaching.getCacheKeyForURL('/index.html')
  // );
}

function setupFirebase() {
  firebase.initializeApp({
    messagingSenderId: "29718419301",
  });

  const messaging = firebase.messaging();

  messaging.setBackgroundMessageHandler((payload) => {
    const promiseChain = clients
      .matchAll({
        type: "window",
        includeUncontrolled: true
      })
      .then(windowClients => {
        windowClients.map((client) => client.postMessage(payload));
        return payload;
      })
      .then(() => {
        console.log("onMessage received - background: ", payload);

        const hasMessage = payload && payload.data && payload.data.message;
        const body = (hasMessage) || "Check it out!";

        const title = "Wedding Jo & Morten has updates";
        const options = {
          body,
          icon,
        };

        return registration.showNotification(
          title,
          options,
        );
      });

    return promiseChain;
  });
}

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(clients.matchAll({
    type: 'window'
  }).then((clientList) => {
    for (let i = 0; i < clientList.length; i++) {
      const client = clientList[i];
      if (client.url === '/' && 'focus' in client) {
        return client.focus();
      }
    }

    if (clients.openWindow) {
      return clients.openWindow('/');
    }
  }));
});

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  setupWorkbox();
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

if (firebase) {
  console.log(`Yay! Firebase is loaded 🎉`);
  setupFirebase();
} else {
  console.log(`Boo! Firebase didn't load 😬`);
}
