import Vue from "vue";
import { Component } from "vue-property-decorator";

import Countdown from "../countdown";

import template from "./couple-intro.vue";

@Component({
  mixins: [template],
  components: {
    Countdown,
  }
})
export default class CoupleIntro extends Vue {}
