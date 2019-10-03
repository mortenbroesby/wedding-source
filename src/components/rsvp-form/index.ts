import Logger from "js-logger";
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { db } from "../../index";
import { visitor } from "../../services/tracking.service";

import { isNonEmptyString } from "../../utilities";

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

    const hasDietRestrictions = isNonEmptyString(this.formData.dietRestrictions);
    const dietRestrictions = hasDietRestrictions ? this.formData.dietRestrictions : "None";

    const payload = {
      name: this.formData.name,
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
      visitor.event("rsvp", "rsvp-success").send();

      this.resetForm();
    } catch (error) {
      Logger.warn("sendForm error: ", error);

      visitor.event("rsvp", "rsvp-error").send();
    }
  }
}
