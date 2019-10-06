<template>
  <div class="information">
    <div class="information__content">
      <div class="header">
        <h2 class="title">All infos</h2>
      </div>

      <div class="contentItem" v-for="(item, index) in informationItems" :key="index">
        <div class="contentItem__image">
          <img class="contentItem__image__asset" :src="item.image" />
        </div>

        <div class="contentItem__metadata">
          <div class="contentItem__metadata__title">{{ item.title }}</div>
          <div class="contentItem__metadata__description" v-html="item.description"></div>
          <div class="contentItem__metadata__buttons">
            <button class="contentItem__metadata__button"
              v-for="(button, index) in item.buttons" :key="index"
              :class="{ inactive: isInactive(button) }"
              :disabled="isInactive(button)"
              @click="openLink(button)">{{ button.label }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "./information.scss"
</style>
