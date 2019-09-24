import Vue from "vue";
import { Component } from "vue-property-decorator";

import template from "./rsvp-form.vue";
import "./rsvp-form.scss";

@Component({
  mixins: [template],
})
export default class RSVPForm extends Vue {
  /*************************************************/
  /* LIFE CYCLE */
  /*************************************************/
  mounted() {

  }
}
