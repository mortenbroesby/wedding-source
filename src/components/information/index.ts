import Vue from "vue";
import { Component } from "vue-property-decorator";

import template from "./information.vue";
import { getInformation } from "../../services/api.service";
import Logger from "js-logger";
import { InfoItem } from "@/interfaces";

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
    this.fillItems();
  }

  /*************************************************/
  /* METHODS */
  /*************************************************/
  async fillItems() {
    try {
     const content = await getInformation();

     this.informationItems = this.formatItems(content);
    } catch (error) {
      Logger.warn("getInformation error: ", error);
    }
  }

  formatItems(content: InfoItem[]) {
    const items = content.map((item: InfoItem, index) => {
      Logger.info(">>>>>> index: ", index);
      Logger.info(">>>>>> item: ", item);

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

  imageStyling(item: any) {
    return {
      backgroundImage: `url(${item.image})`
    };
  }
}
