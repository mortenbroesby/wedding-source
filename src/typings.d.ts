declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "*.json" {
  const value: any;
  export default value;
}

declare module "get-user-locale" {
  const getUserLocale: any;
}
