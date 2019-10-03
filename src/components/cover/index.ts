import Vue from "vue";
import { Component } from "vue-property-decorator";

import template from "./cover.vue";

@Component({
  mixins: [template],
  components: {}
})
export default class Cover extends Vue {}
