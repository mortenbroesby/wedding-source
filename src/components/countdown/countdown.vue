<template>
  <div class="countdown">
    <div class="countdown__element countdown__element--active">
      <div class="countdown__element__section">
        <p class="countdown__element__section__text countdown__element__section__text--days">{{ daysLeft }} days</p>
        <p class="countdown__element__section__text countdown__element__section__text--hours">{{ hoursLeft }} hours</p>
      </div>

      <div class="countdown__element__section">
        <p class="countdown__element__section__text countdown__element__section__text--minutes">{{ minutesLeft }} minutes</p>
        <p class="countdown__element__section__text countdown__element__section__text--seconds">{{ secondsLeft }} seconds</p>
      </div>
    </div>
  </div>
</template>
