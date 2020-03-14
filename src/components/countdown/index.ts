import Vue from "vue";
import { Component } from "vue-property-decorator";
import moment from "moment";

import template from "./countdown.vue";

@Component({
  mixins: [template],
})
export default class Countdown extends Vue {
  /*************************************************/
  /* PROPERTIES */
  /*************************************************/
  countdownInterval: any = -1;
  timeHasPassed: boolean = false;

  daysLeft: number = 0;
  hoursLeft: number = 0;
  minutesLeft: number = 0;
  secondsLeft: number = 0;

  eventTimeUnix: number = 1604068200; // 10/30/2020 @ 2:30pm (UTC) - https://www.unixtimestamp.com/index.php
  countdownIntervalMS: number = 1000;

  /*************************************************/
  /* LIFE CYCLE */
  /*************************************************/
  mounted() {
    this.init();
  }

  beforeDestroy() {
    window.clearInterval(this.countdownInterval);
  }

  /*************************************************/
  /* METHODS */
  /*************************************************/
  init() {
    this.checkCountdown();
    this.setupCountdownInterval();
  }

  checkCountdown() {
    const hasExpired = this.checkIfExpired();
    if (hasExpired) {
      return this.resetTime();
    }

    this.calculateCountdown();
  }

  checkIfExpired(): boolean {
    const currentTimeUnix = Math.floor(Date.now() / 1000);

    const diffTime = this.eventTimeUnix - currentTimeUnix;
    this.timeHasPassed = diffTime <= 0;

    return this.timeHasPassed;
  }

  resetTime() {
    this.daysLeft = 0;
    this.hoursLeft = 0;
    this.minutesLeft = 0;
    this.secondsLeft = 0;
  }

  calculateCountdown() {
    const eventDate = moment.unix(this.eventTimeUnix);
    const todaysDate = moment();

    const diff = eventDate.diff(todaysDate);
    const timeLeft = moment.duration(diff);

    this.daysLeft = eventDate.diff(todaysDate, "days");
    this.hoursLeft = timeLeft.hours();
    this.minutesLeft = timeLeft.minutes();
    this.secondsLeft = timeLeft.seconds();
  }

  setupCountdownInterval() {
    const hasExpired = this.checkIfExpired();

    if (!hasExpired) {
      window.clearInterval(this.countdownInterval);

      this.countdownInterval = window.setInterval(() => {
        this.checkCountdown();
      }, this.countdownIntervalMS);
    }
  }
}
