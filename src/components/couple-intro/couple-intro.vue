<template>
  <div class="couple-intro">
    <div class="couples">
      <div class="couple couple--bride">
        <img class="image image--bride" :src="imageBride" alt="Josephine" />
      </div>

      <div class="metadata">
        <h1 class="title">Joséphine Cambier</h1>
        <p class="text">{{ textBride }}</p>
      </div>

      <div class="and">&</div>

      <div class="couple couple--groom">
        <img class="image image--groom" :src="imageGroom" alt="Morten" />
      </div>

      <div class="metadata">
        <h1 class="title">Morten Broesby-Olsen</h1>
        <p class="text">{{ textGroom }}</p>
      </div>
    </div>

    <div class="couples-text-large">
      <div class="couple couple--bride">
        <div class="metadata">
          <h1 class="title">Joséphine Cambier</h1>
          <p class="text">{{ textBride }}</p>
        </div>
      </div>

      <div class="couple couple--groom">
        <div class="metadata">
          <h1 class="title">Morten Broesby-Olsen</h1>
          <p class="text">{{ textGroom }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "./couple-intro.scss"
</style>
