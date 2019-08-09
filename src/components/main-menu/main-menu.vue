<template>
  <div class="main-menu">
    <div class="main-menu__bar">
      <button class="main-menu__bar__hamburger" @click="toggleMenu">
        <i class="material-icons">{{ hamburgerIcon }}</i>
      </button>
    </div>

    <div class="main-menu__overlay" :class="{ visible: menuVisible }" @click="hideMenu">
      <button class="main-menu__overlay__item" @click="hideMenu">Menu Item</button>
    </div>
  </div>
</template>
