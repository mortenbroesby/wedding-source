import Logger from "js-logger";
import { isNonEmptyString } from "../utilities";

export class NotificationModel {
  title: "";

  options: any = {
    body: "",
    image: "./android-chrome-512x512.png",
  };

  constructor(payload: any) {
    if (payload !== undefined) {
      if (payload.data !== undefined) {

        if (isNonEmptyString(payload.data.title)) {
          this.title = payload.data.title;
        }

        if (isNonEmptyString(payload.data.message)) {
          this.options.body = payload.data.message;
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
          icon: "/images/demos/action-download-book-128x128.png"
        }
      ];
    }

    if ("tag" in Notification.prototype) {
      this.options.tag = "focus-window";
    }

    if ("icon" in Notification.prototype) {
      this.options.icon = "./android-chrome-192x192.png";
    }

    if ("image" in Notification.prototype) {
      this.options.image = "./android-chrome-512x512.png";
    }
  }
}
