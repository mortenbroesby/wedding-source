import Logger from "js-logger";
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { db, visitor } from "../../index";

import { isNonEmptyString, isValidEmail } from "../../utilities";

import template from "./rsvp-form.vue";

@Component({
  mixins: [template],
})
export default class RSVPForm extends Vue {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  formData = this.defaultData();

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
  defaultData() {
    return {
      name: "",
      email: "",
      isAttending: "Yes",
      songSuggestions: "",
      dietRestrictions: "",
    };
  }

  onReset() {
    this.resetForm();
  }

  onSubmit() {
    const nameFilled = isNonEmptyString(this.formData.name);
    if (!nameFilled) {
      return alert("Name not filled");
    }

    const emailFilled = isNonEmptyString(this.formData.email);
    if (!emailFilled) {
      return alert("Email not filled");
    }

    const emailIsValid = isValidEmail(this.formData.email);
    if (!emailIsValid) {
      return alert("Email is not valid");
    }

    const hasDietRestrictions = isNonEmptyString(this.formData.dietRestrictions);
    const dietRestrictions = hasDietRestrictions ? this.formData.dietRestrictions : "None";

    const payload = {
      name: this.formData.name,
      email: this.formData.email,
      isAttending: this.formData.isAttending,
      songSuggestions: this.formData.songSuggestions,
      dietRestrictions: dietRestrictions,
    };

    this.sendForm(payload);
  }

  resetForm() {
    this.formData = this.defaultData();
  }

  async sendForm(data: any = {}) {
    try {
      await db.collection("rsvp").doc().set(data);

      Logger.info("Form data sent: ", data);
      visitor.event("RSVP", "post-success").send();

      alert("Success sending RSVP");
      this.resetForm();
    } catch (error) {
      visitor.event("RSVP", "post-error").send();
    }
  }
}
