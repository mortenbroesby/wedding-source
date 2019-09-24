<template>
  <div class="rsvp-form">
    <div class="rsvp-form__content">
      <h1 class="rsvp-form__content__title">RSVP</h1>

      <div class="rsvp-form__content__userData">
        <input type="text" name="name" v-model="name" placeholder="Name" />
        <input type="text" name="email" v-model="email" placeholder="Email" />
      </div>

      <div class="rsvp-form__content__isAttending">
        Attending? <input type="checkbox" v-model="isAttending">
      </div>

      Song suggestions
      <textarea v-model="songSuggestions"></textarea>

      <button class="sendButton" @click="sendForm">SEND</button>
    </div>
  </div>
</template>
