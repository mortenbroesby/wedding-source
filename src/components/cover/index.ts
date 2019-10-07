import Vue from "vue";
import { Component } from "vue-property-decorator";

import template from "./cover.vue";

@Component({
  mixins: [template],
})
export default class Cover extends Vue {
  /*************************************************/
  /* COMPUTED's */
  /*************************************************/
  get logoHTML() {
    return require("../../assets/logo-large.svg");
  }

  get background() {
    return {
      xl: require("../../assets/header-xlarge.jpg"),
      large: require("../../assets/header-large.jpg"),
      medium: require("../../assets/header-mobile.jpg"),
    };
  }
}
