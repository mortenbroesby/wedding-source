import Vue from "vue";
import { Component } from "vue-property-decorator";

import template from "./information.vue";
import "./information.scss";

@Component({
  mixins: [template],
  components: {}
})
export default class Information extends Vue {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  informationItems: any = {};

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
    const items = new Array(10).fill({}).map((item, index) => {
      return {
        id: index,
        image: "",
        title: "Title 1",
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id fermentum arcu.
          Mauris rhoncus libero ac mauris facilisis faucibus. Quisque sodales malesuada massa at sollicitudin.
          Morbi eget finibus dui, vel tempor elit. Ut bibendum nec mauris sed congue. Donec blandit augue eros,`
      };
    });

    this.informationItems = items;
  }
}
