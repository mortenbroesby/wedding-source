<template>
  <div class="main-menu">
    <div class="main-menu__bar">
      <a class="logo" href="#home">MoJo</a>

      <button class="hamburger" @click="toggleMenu">
        <i class="material-icons">{{ hamburgerIcon }}</i>
      </button>

      <div class="navigation-expanded">
        <a class="navigation-item"
          @click="hideMenu"
          :href="getURL(menuItem)"
          v-for="(menuItem, index) in expandedMenuItems" :key="index">
          {{ menuItem.label }}
        </a>
      </div>
    </div>

    <div class="overlay" :class="{ visible: menuVisible }" @click="hideMenu">
      <a class="overlay__item"
        @click="hideMenu"
        :href="getURL(menuItem)"
        v-for="(menuItem, index) in menuItems" :key="index">
        {{ menuItem.label }}
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "./main-menu.scss"
</style>
