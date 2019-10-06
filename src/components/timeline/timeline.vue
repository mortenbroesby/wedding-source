<template>
  <div class="timeline">
    <div class="header">
      <h2 class="title">When & where?</h2>
      <h2 class="subtitle">Saturday 21st of March 2020</h2>
    </div>

    <div class="timeline-content">
      <div class="mainLine"></div>

      <div class="timeline-item">
        <div class="point"></div>
        <div class="metadata">
          <div class="icon icon--ceremony" v-html="iconCeremonyHTML"></div>
          <h2 class="title">Ceremony</h2>
          <p class="text">
            14:00: Church doors open <br/>
            14:30: Ceremony <br/><br/>

            <a class="link" href="https://goo.gl/maps/5GjShzqyGbEL3JdE6">Onze Lieve Vrouwkerk</a> <br/>
            Keizersgracht 220 <br/>
            1016 DZ Amsterdam, NL <br/>
          </p>
        </div>
      </div>

      <div class="timeline-item">
        <div class="point"></div>
        <div class="metadata">
          <div class="icon icon--cruise" v-html="iconCruiseHTML"></div>
          <h2 class="title">Canal cruise</h2>
          <p class="text">
            Right after the ceremony, we invite you to a boat tour on Amsterdam’s canals. You don’t have to worry about transportation,
            the boats will drop us at the next location ;) And you can enjoy the view! <br/><br/>
            You prefer to skip this and meet us at the venue at 17:30? Of course, just let us know about one month before :)
          </p>
        </div>
      </div>

      <div class="timeline-item">
        <div class="point"></div>
        <div class="metadata">
          <div class="icon icon--party" v-html="iconPartyHTML"></div>
          <h2 class="title">Drinks, dinner and dance</h2>
          <p class="text">
            Around 17:30: Cake and drinks <br/>
            19:00: Dîner <br/>
            22h30: Let's dance! <br/>
            03:00: Doors are closing <br/><br/>

            <a class="link" href="https://goo.gl/maps/HdwP5BLvE8FUVCcXA">Westerliefde</a> <br/>
            Klönneplein 4-6<br/>
            1014 DD Amsterdam
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "./timeline.scss"
</style>
