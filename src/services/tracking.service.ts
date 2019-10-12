import Logger from "js-logger";
import ua from "universal-analytics";
import config from "../config";
import { RouteName } from "../router";

import {
  getDeviceId,
  getApplicationVersion,
  randomValue,
} from "../utilities";

const analyticsID = config.googleAnalytics.id;

export const visitor = ua(analyticsID);

const trackingVersion = 1;
const deviceID = getDeviceId();
const appVersion = getApplicationVersion();

// Set persistant data
visitor.set("tid", analyticsID);
visitor.set("v", trackingVersion);
visitor.set("an", "josephinemorten.info");
visitor.set("av", appVersion);
visitor.set("dh", "josephinemorten.info");
visitor.set("ds", "web");
visitor.set("cid", deviceID);
visitor.set("uid", deviceID);

export const defaultPayload = {
  tid: config.googleAnalytics.id,
  v: 1,
  an: "josephinemorten.info",
  av: getApplicationVersion(),
  dh: "josephinemorten.info",
  ds: "web",
};

export function trackPage({ fullPath = "/", pageName = RouteName.HOME }: { fullPath?: string; pageName?: string; } = {}) {
  const cacheBuster = randomValue();

  const trackingPayload = {
    z: cacheBuster,
    dp: fullPath,
    dt: pageName,
  };

  visitor.pageview(trackingPayload).send();
}
