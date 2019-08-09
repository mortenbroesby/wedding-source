import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import moment from "moment";

import template from "./countdown.vue";
import "./countdown.scss";

@Component({
  mixins: [template]
})
export default class Countdown extends Vue {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  countdownInterval: any = -1;
  isExpired: boolean = false;

  daysLeft: number = 0;
  hoursLeft: number = 0;
  minutesLeft: number = 0;
  secondsLeft: number = 0;

  /*************************************************/
  /* LIFE CYCLE */
  /*************************************************/
  mounted() {
    this.setupCountdownInterval();
  }

  beforeDestroy() {
    clearInterval(this.countdownInterval);
  }

  /*************************************************/
  /* METHODS */
  /*************************************************/
  countdown() {
    const eventTimeUnix = 1584801000; // Sat, 21 Mar 2020 14: 30: 00 + 0000
    const currentTimeUnix = Math.floor(Date.now() / 1000);

    const diffTime = eventTimeUnix - currentTimeUnix;
    this.isExpired = diffTime <= 0;

    if (!this.isExpired) {
      const eventDate = moment.unix(eventTimeUnix);
      const todaysDate = moment();

      const diff = eventDate.diff(todaysDate);
      const timeLeft = moment.duration(diff);

      this.daysLeft = eventDate.diff(todaysDate, "days");
      this.hoursLeft = timeLeft.hours();
      this.minutesLeft = timeLeft.minutes();
      this.secondsLeft = timeLeft.seconds();
    } else {
      this.daysLeft = 0;
      this.hoursLeft = 0;
      this.minutesLeft = 0;
      this.secondsLeft = 0;
    }
  }

  setupCountdownInterval() {
    this.countdown();

    const intervalSeconds = 1;
    this.countdownInterval = setInterval(() => {
      this.countdown();
    }, intervalSeconds * 1000);
  }
}
