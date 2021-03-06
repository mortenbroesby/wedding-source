import Logger from "js-logger";
import Vue from "vue";
import { Component } from "vue-property-decorator";

import firebase from "firebase/app";
import { db } from "../../index";
import { visitor } from "../../services/tracking.service";

import { isNonEmptyString } from "../../utilities";
import { IPayload } from "@/interfaces";

import template from "./rsvp-form.vue";

@Component({
  mixins: [template],
})
export default class RSVPForm extends Vue {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  formData: IPayload = this.defaultData();

  /*************************************************/
  /* LIFE CYCLE */
  /*************************************************/
  created() {
    this.resetForm();
  }

  mounted() {
    this.resetForm();
  }

  /*************************************************/
  /* METHODS */
  /*************************************************/
  defaultData(): IPayload {
    return {
      name: "",
      isAttending: "Yes",
      message: "",
    };
  }

  onReset() {
    this.$toasted.info("Form has been cleared!");
    this.resetForm();
  }

  onSubmit() {
    const nameFilled = isNonEmptyString(this.formData.name);
    if (!nameFilled) {
      this.$toasted.info("You need to fill out your name :)");
      return;
    }

    const hasMessage = isNonEmptyString(this.formData.message);
    const message = hasMessage ? this.formData.message : "None";

    const payload: IPayload = {
      name: this.formData.name,
      isAttending: this.formData.isAttending,
      message: message,
    };

    this.sendForm(payload);
  }

  resetForm() {
    this.formData = this.defaultData();
  }

  async sendForm(data: any = {}) {
    try {
      const timestamp = await firebase.firestore.Timestamp.now().toMillis();
      await db.collection("rsvpOctober").doc(`${timestamp}`).set(data);

      Logger.info("Form data sent: ", data);
      visitor.event("rsvp", "rsvp-success").send();

      this.$toasted.success("Thank you - your reply has been received :)");

      this.resetForm();
    } catch (error) {
      Logger.warn("sendForm error: ", error);

      visitor.event("rsvp", "rsvp-error").send();

      this.$toasted.error("Sorry - there was an error. Please try again.");
    }
  }
}
