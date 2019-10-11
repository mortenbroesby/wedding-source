import Logger from "js-logger";
import { initialisedFirebase } from ".";
import config from "./config";

let messaging: firebase.messaging.Messaging | undefined = undefined;

export function setupServiceWorker() {
  Logger.info("Setting up service worker...");

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.ts").then((registration) => {
      Logger.info("Service worker has been registered for scope: " + registration.scope);

      messaging = initialisedFirebase.messaging();

      messaging.useServiceWorker(registration);
      messaging.usePublicVapidKey(config.webPushCertificate);

      messaging.onMessage((payload: any) => {
        console.log("Message received. ", payload);
      });
    }).catch((error) => {
      Logger.warn("Service worker registration error: " + error);
    });
  }
}

export const askForPermissionToReceiveNotifications = async () => {
  try {
    if (!messaging) return;

    await messaging.requestPermission();

    const token = await messaging.getToken();
    console.log("usage token: ", token);

    return token;
  } catch (error) {
    Logger.warn("Error asking for notification permissions", error);
  }
};
