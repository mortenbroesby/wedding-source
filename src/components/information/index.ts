import Vue from "vue";
import { Component } from "vue-property-decorator";

import template from "./information.vue";

@Component({
  mixins: [template],
})
export default class Information extends Vue {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  informationItems: any = this.placeholderItems();

  /*************************************************/
  /* LIFE CYCLE */
  /*************************************************/
  mounted() {
    this.fillItems();
  }

  /*************************************************/
  /* METHODS */
  /*************************************************/
  fillItems() {
    this.informationItems = this.placeholderItems();
  }

  placeholderItems() {
    const items = new Array(10).fill({}).map((item, index) => {
      return {
        id: index,
        image: "",
        title: "Title 1",
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id fermentum arcu.
          Mauris rhoncus libero ac mauris facilisis faucibus. Quisque sodales malesuada massa at sollicitudin.
          Morbi eget finibus dui, vel tempor elit. Ut bibendum nec mauris sed congue. Donec blandit augue eros,`,
        buttons: [
          {
            label: "Our city tips"
          },
          {
            label: "Where to sleep?"
          }
        ],
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
