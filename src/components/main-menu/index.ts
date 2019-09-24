import Vue from "vue";
import { Component } from "vue-property-decorator";

import template from "./main-menu.vue";

@Component({
  mixins: [template],
})
export default class MainMenu extends Vue {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  menuVisible: boolean = false;

  /*************************************************/
  /* COMPUTED'S */
  /*************************************************/
  get hamburgerIcon(): string {
    return this.menuVisible ? "close" : "menu";
  }

  /*************************************************/
  /* METHODS */
  /*************************************************/
  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  hideMenu() {
    this.$nextTick().then(() => {
      this.menuVisible = false;
    });
  }
}
