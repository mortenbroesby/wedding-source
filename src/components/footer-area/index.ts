import Vue from "vue";
import { Component } from "vue-property-decorator";

import template from "./footer-area.vue";

@Component({
  mixins: [template]
})
export default class FooterArea extends Vue {}
