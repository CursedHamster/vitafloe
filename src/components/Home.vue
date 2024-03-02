<script setup lang="ts">
import Hero from './Hero.vue';
import Main from './Main.vue';
import Timeline from './Timeline.vue';
import Numbers from './Numbers.vue';
import Reviews from './Reviews.vue';
import Advert from './Advert.vue';
import Join from './Join.vue';
</script>

<template>
  <Hero />
  <Main />
  <Timeline />
  <div class="full-height numbers-and-reviews">
    <Numbers />
    <Reviews />
  </div>
  <div class="full-height advert-and-join">
    <Advert />
    <Join />
  </div>
</template>

<style lang="scss" scoped>
@use "../vars";
.numbers-and-reviews {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: vars.$padding-md 0;
}
</style>
