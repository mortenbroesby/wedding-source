<template>
  <div id="info" class="info">
    <div class="menu-container">
      <main-menu :showAlternative="true"></main-menu>
    </div>

    <h1 class="title">{{ info.title }}</h1>
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<style lang="scss" scoped>
  @import "./info.scss"
</style>
