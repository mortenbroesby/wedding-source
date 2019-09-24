import Logger from "js-logger";
import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";

import { db } from "../../index";

import StoreMixin from "../../mixins/store.mixin";

import MainMenu from "../../components/main-menu";
import Cover from "../../components/cover";
import CoupleIntro from "../../components/couple-intro";
import Countdown from "../../components/countdown";
import Timeline from "../../components/timeline";
import Information from "../../components/information";
import RSVPForm from "../../components/rsvp-form";

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
  }
})
export default class Home extends mixins(StoreMixin) {
  temporaryData: any[] = [];
  enableData: boolean = false;

  mounted() {
    if (!this.enableData) return;

    db.collection("rsvp").onSnapshot((querySnapshot) => {
      this.temporaryData = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.temporaryData.push(data);
      });
    });
  }
}
