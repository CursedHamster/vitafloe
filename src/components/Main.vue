<script lang="ts" setup>
import data from "../assets/data";
import MainCard from "./MainCard.vue";

const cards = data?.main?.cards;
</script>
<template>
  <main id="benefits" class="main-container section-container">
    <ul class="main-cards-container">
      <li class="main-card" v-for="card in cards">
        <MainCard :card-info="card" />
      </li>
    </ul>
    <div class="main-text-container">
      <h2 class="section-title">
        Discover the <span class="extra">Benefits</span>
      </h2>
      <p>
        Elevate your health journey with our exclusive range of vitamins. At
        Vitafloe, we're committed to pioneering cutting-edge formulations that
        prioritize your well-being.
      </p>
    </div>
  </main>
</template>
<style lang="scss" scoped>
@use "../vars";
.main-container {
  width: 100% !important;
  max-width: 100% !important;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: visible;
}

.main-cards-container {
  flex-basis: 50%;
  width: 100%;
  min-height: 100vh;
  min-height: 100svh;
  max-height: 100vh;
  max-height: 100svh;
  position: relative;
  z-index: 20;
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    padding: vars.$header-offset 0 0;
  }
}

.main-text-container {
  width: 100%;
  padding-left: vars.$padding-md;
  padding-right: vars.$padding-lg;
  flex-basis: 50%;
  text-align: center;
  .section-title {
    margin-bottom: vars.$padding-sm;
  }
  p {
    max-width: vars.$max-text-width;
    margin: 0 auto;
  }
}

@media screen and (max-width: vars.$breakpoint-md) {
  .main-container {
    flex-direction: column;
  }
  .main-text-container {
    padding: vars.$padding-md vars.$padding-md 0;
  }
}

@media screen and (max-width: vars.$breakpoint-sm) {
  .main-cards-container {
    li {
      padding: vars.$header-offset 0 0;
    }
  }
  .main-text-container {
    padding: vars.$padding-md vars.$padding-sm 0;
  }
}
</style>
