import Vue from "vue";
import { Component } from "vue-property-decorator";

import { RootState } from "../store";

@Component
export default class StoreMixin extends Vue {
  get rootState(): RootState {
    return this.$store.state;
  }
}
