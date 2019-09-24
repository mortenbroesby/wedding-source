<template>
  <div class="countdown">
    <div class="countdown__element countdown__element--active">
      <div class="countdown__element__section">
        <p class="countdown__element__section__text countdown__element__section__text--days">{{ $t("countdown.days", { daysLeft: daysLeft }) }}</p>
        <p class="countdown__element__section__text countdown__element__section__text--hours">{{ $t("countdown.hours", { hoursLeft: hoursLeft }) }}</p>
      </div>

      <div class="countdown__element__section">
        <p class="countdown__element__section__text countdown__element__section__text--minutes">{{ $t("countdown.minutes", { minutesLeft: minutesLeft }) }}</p>
        <p class="countdown__element__section__text countdown__element__section__text--seconds">{{ $t("countdown.seconds", { secondsLeft: secondsLeft }) }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "./countdown.scss"
</style>
