<template>
  <div id="home" class="home">
    <main-menu></main-menu>

    <cover></cover>
    <couple-intro></couple-intro>
    <countdown></countdown>

    <info-extra id="infoExtra"></info-extra>
    <timeline id="timeline" v-show="false"></timeline>

    <information id="info"></information>
    <RSVPForm id="rsvp" v-show="false"></RSVPForm>

    <FooterArea></FooterArea>
  </div>
</template>

<style lang="scss" scoped>
  @import "./home.scss"
</style>
