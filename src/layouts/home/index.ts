import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";

import StoreMixin from "../../mixins/store.mixin";

import Cover from "../../components/cover";
import CoupleIntro from "../../components/couple-intro";
import Countdown from "../../components/countdown";
import Timeline from "../../components/timeline";
import Information from "../../components/information";

import template from "./home.vue";
import "./home.scss";

@Component({
  mixins: [template],
  components: {
    Cover,
    CoupleIntro,
    Countdown,
    Timeline,
    Information,
  }
})
export default class Home extends mixins(StoreMixin) {}
