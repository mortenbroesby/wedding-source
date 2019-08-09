import Vue from "vue";
import { Component } from "vue-property-decorator";

import template from "./cover.vue";
import "./cover.scss";

@Component({
  mixins: [template]
})
export default class Cover extends Vue {}
