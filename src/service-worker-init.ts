import Logger from "js-logger";
import { initialisedFirebase } from ".";
import config from "./config";
import { NotificationModel } from "./models/notification.model";

let messaging: firebase.messaging.Messaging;
let serviceWorkerRegistration: ServiceWorkerRegistration | undefined = undefined;

export function setupServiceWorker() {
  Logger.info("Setting up service worker...");

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js").then((registration) => {
      Logger.info("Service worker has been registered: ", { registration});

      serviceWorkerRegistration = registration;
      messaging = initialisedFirebase.messaging();

      if (!messaging) return;

      messaging.useServiceWorker(registration);
      messaging.usePublicVapidKey(config.webPushCertificate);

      messaging.onMessage((payload: any) => {
        console.log("Message received. ", payload);
        notifyMe(new NotificationModel(payload));
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

    navigator.serviceWorker.addEventListener("message", (message) => {
      return console.log("message: ", message);
    });

    return token;
  } catch (error) {
    Logger.warn("Error asking for notification permissions", error);
  }
};

function notifyMe(notification: NotificationModel) {
  if (!serviceWorkerRegistration) return;

  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
    return;
  }

  // We need to ask the user for permission
  if (Notification.permission === "denied") {
    return askForPermissionToReceiveNotifications();
  }

  console.log("Triggering notification: ", notification);

  serviceWorkerRegistration.showNotification(
    notification.title,
    notification.options
  );
}