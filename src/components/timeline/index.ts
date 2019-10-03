import Logger from "js-logger";
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { getTimelineContent } from "../../services/api.service";
import { TimelineItem } from "../../interfaces";

import template from "./timeline.vue";

@Component({
  mixins: [template],
  components: {}
})
export default class Timeline extends Vue {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  timelineItems: any = [];

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
      = await getTimelineContent();

     this.setContent(content);
    } catch (error) {
      Logger.warn("getInformation error: ", error);
    }
  }

  formatItems(content: TimelineItem[]) {
    const items = content.map((item: TimelineItem, index) => {
      return {
        id: `${index}-${item.id}`,
        image: item.image,
        title: item.title,
        description: item.description,
      };
    });

    return items;
  }

  setContent(content: TimelineItem[]) {
    this.timelineItems = this.formatItems(content);
  }

  imageStyling(item: any) {
    return {
      backgroundImage: `url(${item.image})`
    };
  }
}
