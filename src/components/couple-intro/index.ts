import Vue from "vue";
import { Component } from "vue-property-decorator";

import template from "./couple-intro.vue";

@Component({
  mixins: [template]
})
export default class CoupleIntro extends Vue {}
