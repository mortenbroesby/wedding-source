import Logger from "js-logger";
import { mixins } from "vue-class-component";
import { Component, Prop } from "vue-property-decorator";

import StoreMixin from "../../mixins/store.mixin";

import { isEmptyString } from "../../utilities";

import MainMenu from "../../components/main-menu";

import "./markdown.scss";
import template from "./info.vue";

@Component({
  mixins: [template],
  components: {
    MainMenu,
  },
  metaInfo: {},
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

  get info() {
    return {
      title: "Title",
      content: require("../../content/infoPage/index.md"),
    };
  }

  /*************************************************/
  /* LIFE CYCLE */
  /*************************************************/
  created() {
    this.redirectIfEmptyID();
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
