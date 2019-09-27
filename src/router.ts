import Logger from "js-logger";
import Vue from "vue";

import VueRouter, {
  RouterOptions,
  RouteConfig,
} from "vue-router";

import { trackPage } from "./services/tracking.service";

import Home from "./layouts/home";
import NotFound from "./layouts/notFound";

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

