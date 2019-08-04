<template>
  <div class="countdown">
    <div class="countdown__element countdown__element--active">

      <div class="countdown__element__section">
        <p class="countdown__element__section__text countdown__element__section__text--days">
          Days: {{ daysLeft }}
        </p>

        <p class="countdown__element__section__text countdown__element__section__text--hours">
          Hours: {{ hoursLeft }}
        </p>
      </div>

      <div class="countdown__element__section">
        <p class="countdown__element__section__text countdown__element__section__text--minutes">
          Minutes: {{ minutesLeft }}
        </p>
        
        <p class="countdown__element__section__text countdown__element__section__text--seconds">
          Seconds: {{ secondsLeft }}
        </p>
      </div>

    </div>
  </div>
</template>
