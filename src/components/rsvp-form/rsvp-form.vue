<template>
  <div class="rsvp-form">
    <div class="rsvp-form__content">
      <h1 class="rsvp-form__content__title">RSVP</h1>

      <div class="rsvp-form__content__userData">
        <input type="text" name="name" v-model="formData.name" placeholder="Name" />
        <input type="text" name="email" v-model="formData.email" placeholder="Email" />
      </div>

      <div class="rsvp-form__content__isAttending">
        Attending? <input type="checkbox" v-model="formData.isAttending">
      </div>

      <p>Song suggestions</p>
      <textarea v-model="formData.songSuggestions"></textarea>

      <div>
        <button class="sendButton" @click="sendForm">SEND</button>
        <button class="clearButton" @click="clearForm">CLEAR</button>
      </div>
    </div>
  </div>
</template>
