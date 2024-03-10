<script lang="ts" setup>
import data from "../assets/data";
const numbers = data?.numbers;
</script>
<template>
  <section id="statistics" class="numbers-container section-container">
    <div class="numbers-object" v-for="number in numbers">
      <h3 class="number-title">{{ number?.title }}</h3>
      <p>{{ number?.description }}</p>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use "../vars";
.numbers-container {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: vars.$padding-lg;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: vars.$gap-xl;
}
.numbers-object {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-basis: calc(100% / 3);
  h3 {
    line-height: 1.2;
    font-size: 5em;
    font-weight: 600;
    background: vars.$gradient-3;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

@media screen and (max-width: vars.$breakpoint-md) {
  #statistics {
    max-width: 500px;
  }
  .numbers-container {
    padding: vars.$padding-md;
    flex-direction: column;
  }
  .numbers-object {
    flex-basis: unset;
  }
}

@media screen and (max-width: vars.$breakpoint-sm) {
  .numbers-container {
    padding: vars.$padding-md vars.$padding-sm;
    gap: vars.$gap-lg;
  }
}
</style>
