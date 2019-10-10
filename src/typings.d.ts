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
