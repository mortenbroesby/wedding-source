import Vue from "vue";
import { Component } from "vue-property-decorator";

import { RouteName } from "../../router";

import template from "./notFound.vue";

@Component({
  mixins: [template],
  components: {}
})
export default class NotFound extends Vue {
  /*************************************************/
  /* LIFE CYCLE */
  /*************************************************/
  mounted() {
    this.redirectUser();
  }

  /*************************************************/
  /* METHODS */
  /*************************************************/
  redirectUser() {
    this.$router.replace({
      path: "/"
    });
  }
}
