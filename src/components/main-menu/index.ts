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

  sections = [
    { label: "When & Where", url: "when-where" },
    { label: "All infos", url: "all-infos" },
    { label: "RSVP", url: "rsvp" },
  ];

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

  getURL(section: any) {
    return `#${section.url}`;
  }
}
