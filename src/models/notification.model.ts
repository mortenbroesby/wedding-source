import Logger from "js-logger";
import { isNonEmptyString, isDefined } from "../utilities";
import _ from "lodash";

const images = require("../*.png");
const icon = _.find(images, (image, key) => key === "android-chrome-192x192");

export class NotificationModel {
  title: "Wedding Jo & Morten has updates";

  options: any = {
    body: "Check it out!",
    icon: icon,
  };

  constructor(payload: any) {
    if (isDefined(payload)) {
      if (isDefined(payload.data)) {
        if (isNonEmptyString(payload.data.title)) {
          this.title = payload.data.title;
        }

        if (isNonEmptyString(payload.data.message)) {
          if ("body" in Notification.prototype) {
            this.options.body = payload.data.message;
          }
        }
      }
    }

    if ("vibrate" in Notification.prototype) {
      this.options.vibrate = [200, 100, 200, 100, 200, 100, 200];
    }

    if ("actions" in Notification.prototype) {
      this.options.actions = [
        {
          action: "visit-page-action",
          title: "Go to Josephine & Morten Website",
          icon
        }
      ];
    }

    if ("tag" in Notification.prototype) {
      this.options.tag = "focus-window";
    }

    if ("icon" in Notification.prototype) {
      this.options.icon = icon;
    }
  }
}
