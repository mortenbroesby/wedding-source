import Logger from "js-logger";
import Vue from "vue";
import { Component } from "vue-property-decorator";

import template from "./info-extra.vue";

@Component({
  mixins: [template],
})
export default class Timeline extends Vue {}
