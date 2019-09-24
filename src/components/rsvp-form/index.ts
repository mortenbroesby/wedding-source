import Logger from "js-logger";
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { db } from "../../index";

import template from "./rsvp-form.vue";
import "./rsvp-form.scss";

@Component({
  mixins: [template],
})
export default class RSVPForm extends Vue {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  name: string = "";
  email: string = "";

  isAttending: boolean = false;
  songSuggestions: string = "";

  /*************************************************/
  /* COMPUTED'S */
  /*************************************************/
  attending(): string {
    return this.isAttending ? "yes" : "no";
  }

  /*************************************************/
  /* METHODS */
  /*************************************************/
  sendForm() {
    const data = {
      name: this.name,
      email: this.email,
      attending: this.isAttending ? "yes" : "no",
      songSuggestions: this.songSuggestions,
    };

    db.collection("rsvp").doc().set(data).then(() => {
      Logger.info("RSVP successfully sent! - data: ", data);
      alert("Success sending RSVP");
    });
  }
}
