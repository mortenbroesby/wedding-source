import Logger from "js-logger";
import Vue from "vue";

import VueRouter, {
  RouterOptions,
  RouteConfig,
} from "vue-router";

import { trackPage } from "./services/tracking.service";

export enum RouteName {
  HOME = "home",
  INFO = "info",
  NOT_FOUND = "not-found",
}

export const routes: RouteConfig[] = [
  {
    path: `/${RouteName.HOME}/`,
    name: RouteName.HOME,
    component: () => import("./layouts/home"),
    alias: "/",
  },
  {
    path: `/${RouteName.INFO}/:id?`,
    name: RouteName.INFO,
    component: () => import("./layouts/info"),
    props: true,
  },
  {
    path: "*",
    name: RouteName.NOT_FOUND,
    component: () => import("./layouts/notFound"),
  }
];

Vue.use(VueRouter);

const routeOptions: RouterOptions = {
  routes,
  mode: "history",
  linkActiveClass: "active",
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      };
    }

    return { x: 0, y: 0 };
  }
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

