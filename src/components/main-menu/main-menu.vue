<template>
  <div class="main-menu">
    <div class="main-menu__bar">
      <a class="logo" href="#home" @click="goHome">
        <div class="logo__content" v-html="logoHTML"></div>
      </a>

      <button class="hamburger" @click="toggleMenu" v-if="!showAlternative">
        <i class="material-icons">{{ hamburgerIcon }}</i>
      </button>

      <div class="navigation-expanded" v-if="!showAlternative">
        <a class="navigation-item"
          @click="hideMenu"
          :href="getURL(menuItem)"
          v-for="(menuItem, index) in expandedMenuItems" :key="index">
          {{ menuItem.label }}
        </a>
      </div>

      <div class="navigation-alternative" v-if="showAlternative" @click="goHome">
        <a class="navigation-item"><i class="material-icons back">keyboard_backspace</i>Go back</a>
      </div>
    </div>

    <transition name="fade">
      <div class="overlay" :class="{ visible: menuVisible }" @click="hideMenu" v-if="overlayVisible">
        <a class="overlay__item"
          @click="hideMenu"
          :href="getURL(menuItem)"
          v-for="(menuItem, index) in menuItems" :key="index">
          {{ menuItem.label }}
        </a>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
  @import "./main-menu.scss"
</style>
