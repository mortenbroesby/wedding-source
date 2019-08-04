<template>
  <div class="timeline">
    <div class="timeline__content">
      <div class="timeline__content__item columns" v-for="(item, index) in timelineItems" :key="index">
        <div class="column is-mobile timeline__content__item__image">
          <div class="timeline__content__item__image__asset" :style="{ backgroundImage: `url('${item.image}')` }"></div>
        </div>
        <div class="column is-mobile">
          <div class="timeline__content__item__title">{{ item.title }}</div>
          <div class="timeline__content__item__description">{{ item.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
