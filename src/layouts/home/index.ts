import Logger from "js-logger";
import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";

import { version } from "../../../package.json";

import StoreMixin from "../../mixins/store.mixin";

import MainMenu from "../../components/main-menu";
import Cover from "../../components/cover";
import CoupleIntro from "../../components/couple-intro";
import Countdown from "../../components/countdown";

import Timeline from "../../components/timeline";
import Information from "../../components/information";
import RSVPForm from "../../components/rsvp-form";

import FooterArea from "../../components/footer-area";

import template from "./home.vue";

@Component({
  mixins: [template],
  components: {
    MainMenu,
    Cover,
    CoupleIntro,
    Countdown,
    Timeline,
    Information,
    RSVPForm,
    FooterArea,
  },
  metaInfo: {}
})
export default class Home extends mixins(StoreMixin) {
  /*************************************************/
  /* COMPUTEDS */
  /*************************************************/
  get metaInfo() {
    return {
      titleTemplate: "%s :: Home",
    };
  }

  get appVersion() {
    return version;
  }

  /*************************************************/
  /* LIFE CYCLE */
  /*************************************************/
  created() {
    this.setMeta();
  }

  /*************************************************/
  /* METHODS */
  /*************************************************/
  setMeta() {
    this.$options.metaInfo = this.metaInfo;
  }
}
