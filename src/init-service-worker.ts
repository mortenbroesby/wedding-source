import Logger from "js-logger";

export function setupServiceWorker() {
  Logger.info("Setting up service worker...");

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.ts").then((reg) => {
      Logger.info("Service worker has been registered for scope: " + reg.scope);
    }).catch((error) => {
      Logger.warn("Service worker registration error: " + error);
    });
  }
}
