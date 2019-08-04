<template>
  <div class="timeline">
    <div class="timeline__content">
      <div class="timeline__content__header">
        <h2 class="timeline__content__header__title">Saturday 21st March 2020</h2>
      </div>

      <div class="timeline__content__item" v-for="(item, index) in timelineItems" :key="index">
        <div class="timeline__content__item__image">
          <div class="timeline__content__item__image__asset" :style="{ backgroundImage: `url('${item.image}')` }"></div>
        </div>
        <div class="timeline__content__item__text">
          <div class="timeline__content__item__title">{{ item.title }}</div>
          <div class="timeline__content__item__description" v-html="item.description"></div>
        </div>
      </div>
    </div>
  </div>
</template>
