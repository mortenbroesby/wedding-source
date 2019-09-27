
import Logger from "js-logger";
import Vue from "vue";
import config from "./config";

import VueRouter, {
  RouterOptions,
  RouteConfig,
} from "vue-router";

import { visitor } from "./index";

import Home from "./layouts/home";
import NotFound from "./layouts/notFound";
import { getDeviceId, getApplicationVersion } from "./utilities";

export enum RouteName {
  HOME = "home",
  NOT_FOUND = "not-found",
}

export const routes: RouteConfig[] = [
  {
    path: `/${RouteName.HOME}/`,
    name: RouteName.HOME,
    component: Home,
    alias: "/",
  },
  {
    path: "*",
    name: RouteName.NOT_FOUND,
    component: NotFound,
  }
];

Vue.use(VueRouter);

const routeOptions: RouterOptions = {
  routes,
  mode: "history",
  linkActiveClass: "active"
};

export const router = new VueRouter(routeOptions);

router.beforeEach((to, from, next) => {
  const fullPath = to.fullPath;
  const pageName = to.name;

  trackPage({
    fullPath,
    pageName,
  });

  next();
});

function trackPage({ fullPath = "/", pageName = RouteName.HOME }: { fullPath?: string; pageName?: string; } = {}) {
  const cacheBuster = Math.floor(Math.random() * 100000000);
  const deviceID = getDeviceId();

  const defaultPayload = {
    tid: config.googleAnalytics.id,
    v: 1,
    an: "Wedding website, Josephine & Morten",
    av: getApplicationVersion(),
    dh: "josephinemorten.info",
    ds: "web",
    cid: deviceID,
    uid: deviceID,
    z: cacheBuster,
  };

  const trackingPayload = {
    ...defaultPayload,
    dp: fullPath,
    dt: pageName,
  };

  visitor.pageview(trackingPayload).send();
}
