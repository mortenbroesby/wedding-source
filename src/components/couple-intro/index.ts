import Vue from "vue";
import { Component } from "vue-property-decorator";

import template from "./couple-intro.vue";

@Component({
  mixins: [template]
})
export default class CoupleIntro extends Vue {
  /*************************************************/
  /* COMPUTED'S */
  /*************************************************/
  get imageGroom() {
    return require("../../assets/image-morten.jpg");
  }

  get imageBride() {
    return require("../../assets/image-jo.jpg");
  }

  get textBride() {
    return `
      aka Jo / French / 👰 / 1988 / Amsterdamer for 6 years /
      Sea / Cats / Red / Travelling / Wine /Designer /
      “C’est la vie” / Was a scout for so long / All kind of games / Optimist / Sewing
      and making things / Cycling everywhere / 🙃
    `
    .replace(/^\s+|\s+$/g, "");
  }

  get textGroom() {
    return `
      aka Mabo / aka Morty / Danish / 🤵 / 1988 / Amsterdamer for 3,5 years /
      Loves Mountains / Dogs / Blue / Travelling / Wine /
      Developer / Skate, surf, ski - everything that slides /
      Board & video games / Geeky things / Skateboarding everywhere / 😛
    `
    .replace(/^\s+|\s+$/g, "");
  }
}
