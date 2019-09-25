<template>
  <div class="timeline">
    <div class="timeline__content">
      <div class="header">
        <h2 class="header__title">When & where?</h2>
        <h2 class="header__subtitle">Saturday 21st of March 2020</h2>
      </div>

      <div class="item" v-for="(item, index) in timelineItems" :key="index">
        <div class="item__image">
          <div class="item__image__asset" :style="imageStyling"></div>
        </div>
        <div class="item__text">
          <div class="item__text__title">{{ item.title }}</div>
          <div class="item__text__description"
            v-html="item.description"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "./timeline.scss"
</style>
