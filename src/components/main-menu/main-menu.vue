<template>
  <div class="main-menu">
    <div class="main-menu__bar">
      <div class="logo">
        MoJo
      </div>

      <button class="hamburger" @click="toggleMenu">
        <i class="material-icons">{{ hamburgerIcon }}</i>
      </button>

      <div class="navigation-expanded">
        <a class="navigation-item"
          @click="hideMenu"
          :href="getURL(section)"
          v-for="(section, index) in sections" :key="index">
          {{ section.label }}
        </a>
      </div>
    </div>

    <div class="overlay" :class="{ visible: menuVisible }" @click="hideMenu">
      <a class="overlay__item"
        @click="hideMenu"
        :href="getURL(section)"
        v-for="(section, index) in sections" :key="index">
        {{ section.label }}
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "./main-menu.scss"
</style>
