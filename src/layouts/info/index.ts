import Logger from "js-logger";
import { mixins } from "vue-class-component";
import { Component, Prop } from "vue-property-decorator";

import StoreMixin from "../../mixins/store.mixin";

import { isEmptyString, isDefined } from "../../utilities";
import { find } from "lodash-es";

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
      title: this.title,
      content: this.markdown,
    };
  }

  get title() {
    switch (this.id) {
      case "transportation":
        return "Transportation";

      case "where-to-sleep":
        return "Where to sleep?";

      default:
        return "Title";
    }
  }

  get markdown() {
    const markdown = require("../../content/infoPage/*.md");
    const currentMarkdown = find(markdown, (_: string, key: string) => key === this.id);

    return currentMarkdown;
  }

  get hasMarkdown() {
    return isDefined(this.markdown);
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
    if (isEmptyString(this.id) || !this.hasMarkdown) {
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
