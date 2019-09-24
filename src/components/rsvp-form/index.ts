import Logger from "js-logger";
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { db } from "../../index";

import template from "./rsvp-form.vue";

@Component({
  mixins: [template],
})
export default class RSVPForm extends Vue {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  formData = {
    name: "",
    email: "",
    isAttending: false,
    songSuggestions: "",
  };

  /*************************************************/
  /* COMPUTED'S */
  /*************************************************/
  attending(): string {
    return this.formData.isAttending ? "yes" : "no";
  }

  /*************************************************/
  /* METHODS */
  /*************************************************/
  sendForm() {
    const data = {
      name: this.formData.name,
      email: this.formData.email,
      attending: this.formData.isAttending ? "yes" : "no",
      songSuggestions: this.formData.songSuggestions,
    };

    db.collection("rsvp").doc().set(data).then(() => {
      alert("Success sending RSVP");
      this.clearForm();
    });
  }

  clearForm() {
    this.formData = {
      name: "",
      email: "",
      isAttending: false,
      songSuggestions: "",
    };
  }
}
