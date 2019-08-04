<template>
  <div id="countdown" class="countdown">
    <div class="countdown__element countdown__element--active">
      <p class="countdown__element__text countdown__element__text--days">
        Days: {{ daysLeft }}
      </p>

      <p class="countdown__element__text countdown__element__text--hours">
        Hours: {{ hoursLeft }}
      </p>

      <p class="countdown__element__text countdown__element__text--minutes">
        Minutes: {{ minutesLeft }}
      </p>
      
      <p class="countdown__element__text countdown__element__text--seconds">
        Seconds: {{ secondsLeft }}
      </p>
    </div>
  </div>
</template>
