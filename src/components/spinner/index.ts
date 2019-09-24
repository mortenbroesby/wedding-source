import Vue from "vue";
import { Component } from "vue-property-decorator";

import template from "./spinner.vue";

@Component({
  mixins: [template],
})
export default class Spinner extends Vue {}
