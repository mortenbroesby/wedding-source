import { mixins } from "vue-class-component";
import { Component, Watch } from "vue-property-decorator";

import StoreMixin from "../../mixins/store.mixin";
import { $store } from "../../store";

import Cover from "../../components/cover";
import Countdown from "../../components/countdown";
import Timeline from "../../components/timeline";

import template from "./home.vue";
import "./home.scss";

@Component({
  mixins: [template],
  components: {
    Cover,
    Countdown,
    Timeline,
  }
})
export default class Home extends mixins(StoreMixin)  {

}
