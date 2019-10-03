import Logger from "js-logger";
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { getInformationContent } from "../../services/api.service";
import { InfoItem } from "../../interfaces";

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
    const items = content.map((item: InfoItem, index) => {
      return {
        id: `${index}-${item.id}`,
        image: item.image,
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

  imageStyling(item: any) {
    return {
      backgroundImage: `url(${item.image})`
    };
  }
}
