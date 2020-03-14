import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import template from "./main-menu.vue";

@Component({
  mixins: [template],
})
export default class MainMenu extends Vue {
  /*************************************************/
  /* EXTERNAL PROPERTIES */
  /*************************************************/
  @Prop({ default: false })
  showAlternative: boolean;

  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  menuVisible: boolean = false;

  menuItems = [
    { label: "Home", url: "home", showExpanded: false },
    { label: "When & Where", url: "infoExtra", showExpanded: true },
    { label: "All infos", url: "info", showExpanded: true },
    // { label: "RSVP", url: "rsvp", showExpanded: true },
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

  get overlayVisible() {
    if (this.showAlternative) {
      return false;
    }

    return this.menuVisible;
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

  goHome() {
    if (!this.showAlternative) return;

    this.$router.replace({
      path: "/"
    });
  }
}
