<template>
  <div class="information">
    <div class="information__content">
      <div class="information__content__item" v-for="(item, index) in informationItems" :key="index">
        <div class="information__content__item__image">
          <div class="information__content__item__image__asset" :style="{ backgroundImage: `url('${item.image}')` }"></div>
        </div>
        <div class="information__content__item__text">
          <div class="information__content__item__text__title">{{ item.title }}</div>
          <div class="information__content__item__text__description" v-html="item.description"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "./information.scss"
</style>
