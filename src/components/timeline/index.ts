import Vue from "vue";
import { Component } from "vue-property-decorator";

import template from "./timeline.vue";
import "./timeline.scss";

@Component({
  mixins: [template],
  components: {}
})
export default class Timeline extends Vue {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  timelineItems: any = {};

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
    const items = new Array(10).fill(null).map((item, index) => {
      return {
        id: index,
        image: require("../../assets/cover.jpg"),
        title: "Title 1",
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris id fermentum arcu. 
          Mauris rhoncus libero ac mauris facilisis faucibus. Quisque sodales malesuada massa at sollicitudin. 
          Morbi eget finibus dui, vel tempor elit. Ut bibendum nec mauris sed congue. Donec blandit augue eros,`
      }
    })

    this.timelineItems = items;
  }
}
