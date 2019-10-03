<template>
  <div class="countdown">
    <h1 class="countdown__title">We are getting married in</h1>

    <div class="countdown__element">
      <div class="section">
        <p class="text text--days">{{ $t("countdown.days", { daysLeft: daysLeft }) }}</p>
        <p class="text text--hours">{{ $t("countdown.hours", { hoursLeft: hoursLeft }) }}</p>
      </div>

      <div class="section">
        <p class="text text--minutes">{{ $t("countdown.minutes", { minutesLeft: minutesLeft }) }}</p>
        <p class="text text--seconds">{{ $t("countdown.seconds", { secondsLeft: secondsLeft }) }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "./countdown.scss"
</style>
