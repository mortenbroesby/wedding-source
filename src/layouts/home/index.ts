import { mixins } from "vue-class-component";
import { Component, Watch } from "vue-property-decorator";

import StoreMixin from "../../mixins/store.mixin";
import { $store } from "../../store";

import Cover from "../../components/cover"
import Countdown from "../../components/countdown"

import template from "./home.vue";
import "./home.scss";

@Component({
  mixins: [template],
  components: {
    Cover,
    Countdown,
  }
})
export default class Home extends mixins(StoreMixin)  {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/

  /*************************************************/
  /* COMPUTED'S */
  /*************************************************/

  /*************************************************/
  /* WATCHERS */
  /*************************************************/

  /*************************************************/
  /* LIFE CYCLE */
  /*************************************************/
  mounted() {
  }

  beforeDestroy() {
  }

  /*************************************************/
  /* METHODS */
  /*************************************************/
}
