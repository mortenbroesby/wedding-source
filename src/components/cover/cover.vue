<template>
  <div class="cover">
    <div class="cover__background"></div>
    <div class="cover__overlay"></div>

    <div class="cover__logo">
      <div class="cover__logo__content" v-html="logoHTML"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "./cover.scss"
</style>
