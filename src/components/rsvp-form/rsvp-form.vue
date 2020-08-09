<template>
  <div class="rsvp-form">
    <div class="content">
      <h1 class="title">RSVP</h1>

      <div class="userData">
        <div class="inputContainer">
          <label class="label" for="name">
            <p class="text">Your name(s)</p>
            <input class="input" type="text" name="name" v-model="formData.name" placeholder="" />
          </label>
        </div>
      </div>

      <div class="isAttending">
        <div class="input-wrapper">
          <label class="label" for="isAttending">
            <p class="text">Are you attending?</p>

            <select class="input" v-model="formData.isAttending" name="isAttending">
              <option value="Yes">Yes, I/we will be there</option>
              <option value="No">No, I/we won't be there</option>
            </select>
            <div class="arrow">
              <i class="material-icons back">keyboard_arrow_down</i>
            </div>
          </label>
        </div>
      </div>

      <div class="bigField bigField--extended">
        <label class="label" for="message">
          <p class="text">Want to tell us something?</p>

          <textarea class="input"
            name="message"
            v-model="formData.message"
            placeholder="Is there anything special we should know? Are you excited? Biensûr vous pouvez écrire en français. Du kan selvfølgelig skrive på Dansk hvis du vil :)"
          ></textarea>
        </label>
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
