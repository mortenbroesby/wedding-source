import Logger from "js-logger";
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { getInformationContent } from "../../services/api.service";
import { InfoItem, InfoButton } from "../../interfaces";
import { isUndefined, isDefined } from "../../utilities";
import _ from "lodash";

import template from "./information.vue";

@Component({
  mixins: [template],
})
export default class Information extends Vue {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  informationItems: any = [];

  /*************************************************/
  /* COMPUTED'S */
  /*************************************************/
  get imageFranish() {
    return require("../../assets/information/franish.jpg");
  }

  /*************************************************/
  /* LIFE CYCLE */
  /*************************************************/
  mounted() {
    this.getContent();
  }

  /*************************************************/
  /* METHODS */
  /*************************************************/
  async getContent() {
    try {
     const content
      = await getInformationContent();

     this.setContent(content);
    } catch (error) {
      Logger.warn("getInformation error: ", error);
    }
  }

  formatItems(content: InfoItem[]) {
    if (isUndefined(content)) {
      return [];
    }

    const items = content.map((item: InfoItem, index) => {
      const images = require("../../assets/information/*.jpg");
      const currentImage = _.find(images, (_: string, key: string) => key === item.image);

      return {
        id: `${index}-${item.id}`,
        image: currentImage,
        title: item.title,
        description: item.description,
        buttons: item.buttons,
      };
    });

    return items;
  }

  setContent(content: InfoItem[]) {
    this.informationItems = this.formatItems(content);
  }

  openLink(button: InfoButton) {
    const isExternalLink = button.external || false;
    const hasExternalLink = isExternalLink && isDefined(button.link);
    const hasLink = isDefined(button.link);

    if (hasExternalLink) {
      const win = window.open(button.link, "_blank");
      if (win) {
        win.focus();
      }
    } else if (hasLink) {
      this.$router.push({
        path: button.link
      });
    }
  }

  isInactive(button: InfoButton) {
    return button.inactive || false;
  }
}
