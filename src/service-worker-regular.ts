import Logger from "js-logger";

const CACHE_VERSION = 8;

const offlineUrl = "/offline.html";

const currentCache = {
  offline: `offline-cache-v${CACHE_VERSION}`
};

/**
 * The event listener for the service worker installation
 */
self.addEventListener("install", (event: any) => {
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
function isHtmlPage(event: any) {
  return event.request.method === "GET" && event.request.headers.get("accept").includes("text/html");
}

/**
* Fetch and cache any results as we receive them.
*/
self.addEventListener("fetch", (event: any) => {
  Logger.info("sw.js fetch: ", event);

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
            cache.put(event.request, responseToCache);
          });

        return fetchResponse;
      }).catch((error) => {
        Logger.info("sw.js fetch error: ", error);

        // Check if the user is offline first and is trying to navigate to a web page
        if (isHtmlPage(event)) {
          return caches.match(offlineUrl);
        }
      });
    })
  );
});

// Cleanup stale cache
self.addEventListener("activate", (event: any) => {
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
