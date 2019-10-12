import Logger from "js-logger";
import { initialisedFirebase } from ".";
import config from "./config";
import { db } from "./index";
import Vue from "vue";

import { parseEncrypted } from "./utilities";

const cloudMessage = parseEncrypted(config.cloudMessage);

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

    subscribeTokenToTopic(token).then((status) => {
      checkSubscriptionAndTriggerToast(status);
    });

    navigator.serviceWorker.addEventListener("message", (message) => {
      return console.log("message: ", message);
    });
  } catch (error) {
    Logger.warn("Error asking for notification permissions", error);

    Vue.toasted.error("Sorry - there was an error. Please try again.");
  }
};

function checkSubscriptionAndTriggerToast(status: string) {
  if (status === "subscribed") {
    Vue.toasted.success("Thank you - your subscription has been activated :)");
  } else if (status === "exists") {
    Vue.toasted.success("You already have a subscription :)");
  } else if (status === "error") {
    Vue.toasted.error("Sorry - there was an error. Please try again.");
  }
}

export async function subscribeTokenToTopic(token, topic = "notifications"): Promise<string> {
  let subscriptionExists: boolean = false;

  try {
    const querySnapshot =
      await db.collection("subscriptions").get();

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const hasSubscription = data && data.token && data.token === token;
      if (hasSubscription) {
        subscriptionExists = true;
      }
    });
  } catch (error) {
    console.error("Error searching for token: ", error);
    return Promise.resolve("error");
  }

  if (subscriptionExists) {
    console.log("Subscription already active: ", token);
    return Promise.resolve("exists");
  }

  try {
    const fetchResponse =
    await fetch("https://iid.googleapis.com/iid/v1/" + token + "/rel/topics/" + topic, {
      method: "POST",
      headers: new Headers({
        "Authorization": "key=" + cloudMessage.key
      })
    });

    if (fetchResponse.status < 200 || fetchResponse.status >= 400) {
      console.log("Error subscribing to topic: ", fetchResponse);
      return Promise.resolve("error");
    }

    try {
      await db.collection("subscriptions").doc(token).set({ token });
      console.log("Subscribed to: ", topic);
    } catch (error) {
      console.error("Error adding subscription: ", error);
      return Promise.resolve("error");
    }
  } catch (error) {
    console.error("Error setting subscription to remote: ", error);
    return Promise.resolve("error");
  }

  return Promise.resolve("subscribed");
}

function notifyMe(notification: NotificationModel) {
  if (!serviceWorkerRegistration) return;

  // Let"s check if the browser supports notifications
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
