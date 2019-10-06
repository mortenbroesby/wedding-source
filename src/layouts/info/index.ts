import Logger from "js-logger";
import { mixins } from "vue-class-component";
import { Component, Prop } from "vue-property-decorator";

import StoreMixin from "../../mixins/store.mixin";

import { isEmptyString } from "../../utilities";

import template from "./info.vue";

@Component({
  mixins: [template],
  components: {},
  metaInfo: {}
})
export default class Info extends mixins(StoreMixin) {
  /*************************************************/
  /* EXTERNAL PROPERTIES */
  /*************************************************/
  @Prop({ default: "" })
  id: string;

  /*************************************************/
  /* COMPUTEDS */
  /*************************************************/
  get metaInfo() {
    return {
      titleTemplate: "%s :: Info",
    };
  }

  /*************************************************/
  /* LIFE CYCLE */
  /*************************************************/
  created() {
    this.redirectToHome();
    this.setMeta();
  }

  /*************************************************/
  /* METHODS */
  /*************************************************/
  redirectIfEmptyID() {
    if (isEmptyString(this.id)) {
      this.redirectToHome();
    }
  }

  redirectToHome() {
    this.$router.replace({
      path: "/"
    });
  }

  setMeta() {
    this.$options.metaInfo = this.metaInfo;
  }
}
