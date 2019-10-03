<template>
  <div class="rsvp-form">
    <div class="content">
      <h1 class="title">RSVP</h1>

      <div class="userData">
        <div class="inputContainer">
          <p class="label">Your name(s)</p>
          <input class="input" type="text" name="name" v-model="formData.name" placeholder="" />
        </div>
      </div>

      <div class="isAttending">
        <p class="label">Are you attending?</p>
        <select class="input" v-model="formData.isAttending">
          <option value="Yes">Yes, I/we will be there.</option>
          <option value="No">No, I/we won't be there.</option>
        </select>
      </div>

      <div class="bigField bigField--extended">
        <p class="label">Want to tell us something?</p>
        <textarea class="input" v-model="formData.message"
          placeholder="Is there anything special we should know? Are you excited?"></textarea>
      </div>

      <div class="bigField">
        <p class="label">A song that will make you dance:</p>
        <textarea class="input" v-model="formData.songSuggestions"></textarea>
      </div>

      <div class="buttons">
        <button class="button clearButton" @click="onReset">Clear</button>
        <button class="button sendButton" @click="onSubmit">Send my answer</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "./rsvp-form.scss"
</style>
