<template>
  <div class="rsvp-form">
    <div class="content">
      <h1 class="title">RSVP</h1>

      <div class="userData">
        <div class="inputContainer">
          <p>Name</p>
          <input class="input" type="text" name="name" v-model="formData.name" placeholder="" />
        </div>
        <div class="inputContainer">
          <p>Email</p>
          <input class="input" type="text" name="email" v-model="formData.email" placeholder="" />
        </div>
      </div>

      <div class="isAttending">
        <p class="isAttending__label">Are you attending?</p>
        <select v-model="formData.isAttending">
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div class="bigField">
        <p class="bigField__label">Song suggestions</p>
        <textarea v-model="formData.songSuggestions"></textarea>
      </div>

      <div class="bigField">
        <p class="bigField__label">Diet restrictions</p>
        <textarea v-model="formData.dietRestrictions"></textarea>
      </div>

      <div>
        <button class="sendButton" @click="onSubmit">SEND</button>
        <button class="clearButton" @click="onReset">CLEAR</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "./rsvp-form.scss"
</style>
