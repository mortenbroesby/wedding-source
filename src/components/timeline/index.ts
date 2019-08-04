import Vue from "vue";
import { Component } from "vue-property-decorator";

import template from "./timeline.vue";
import "./timeline.scss";

@Component({
  mixins: [template],
  components: {}
})
export default class Timeline extends Vue {
  
}
