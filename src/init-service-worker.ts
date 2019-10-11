import Logger from "js-logger";
import { initialisedFirebase } from ".";



export function setupServiceWorker() {
  Logger.info("Setting up service worker...");

  const messaging = initialisedFirebase.messaging();
  messaging.onMessage((payload) => {
    console.log("Message received. ", payload);
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.ts").then((registration) => {
      Logger.info("Service worker has been registered for scope: " + registration.scope);
      initialisedFirebase.messaging().useServiceWorker(registration);
    }).catch((error) => {
      Logger.warn("Service worker registration error: " + error);
    });
  }
}

export const askForPermissionToReceiveNotifications = async () => {
  try {
    const messaging = initialisedFirebase.messaging();
    await messaging.requestPermission();

    const token = await messaging.getToken();
    console.log("usage token: ", token);

    return token;
  } catch (error) {
    Logger.warn("Error asking for notification permissions", error);
  }
};

