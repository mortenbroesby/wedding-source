<template>
  <div id="home" class="home">
    <main-menu></main-menu>

    <cover></cover>
    <couple-intro></couple-intro>
    <countdown></countdown>
    <timeline></timeline>
    <information></information>
    <RSVPForm></RSVPForm>

    <div v-for="(data, index) in temporaryData" :key="index">{{ data }}</div>
  </div>
</template>

<style lang="scss" scoped>
  @import "./home.scss"
</style>
