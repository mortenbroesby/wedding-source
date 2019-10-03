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

  menuItems = [
    { label: "Home", url: "home", showExpanded: false },
    { label: "When & Where", url: "timeline", showExpanded: true },
    { label: "All infos", url: "info", showExpanded: true },
    { label: "RSVP", url: "rsvp", showExpanded: true },
  ];

  /*************************************************/
  /* COMPUTED'S */
  /*************************************************/
  get hamburgerIcon(): string {
    return this.menuVisible ? "close" : "menu";
  }

  get expandedMenuItems() {
    return this.menuItems.filter((item) => item.showExpanded);
  }

  get logoHTML() {
    return require("../../assets/logo-small.svg");
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

  getURL(section: any) {
    return `#${section.url}`;
  }
}
