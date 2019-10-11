declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "*.json" {
  const value: any;
  export default value;

  export const version: any;
}

declare module "get-user-locale" {
  const getUserLocale: any;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

// These are only available in a Web Worker
declare function importScripts(...urls: string[]): void;

declare module "workbox" {
  export function backgroundSync(): any;
  export function broadcastUpdate(): any;
  export function cacheableResponse(): any;
  export function core(): any;
  export function expiration(): any;
  export function googleAnalytics(): any;
  export function navigationPreload(): any;
  export function precaching(): any;
  export function rangeRequests(): any;
  export function routing(): any;
  export function strategies(): any;
  export function streams(): any;
}
