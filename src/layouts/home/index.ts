import { mixins } from "vue-class-component";
import { Component, Watch } from "vue-property-decorator";

import StoreMixin from "../../mixins/store.mixin";
import { $store } from "../../store";

import template from "./home.vue";
import "./home.scss";

@Component({
  mixins: [template],
  components: {
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
