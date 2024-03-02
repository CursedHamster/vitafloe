<script lang="ts" setup>
import { onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import data from "../assets/data";

const numbers = data?.numbers;

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".numbers-container",
        start: "top 80%",
        end: "bottom 80%",
      },
    })
    .from(".number-title", {
      innerText: 0,
      snap: {
        innerText: 1,
      },
      stagger: 0.1,
    });
});
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
  padding: vars.$padding-lg 0;
  margin: 0 auto;
  display: flex;
  gap: vars.$gap-xl;
  max-width: 1200px;
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
    font-size: 7em;
    font-weight: 400;
    background: vars.$gradient-3;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

@media screen and (max-width: vars.$breakpoint-md) {
  .numbers-container {
    padding: vars.$padding-md;
    flex-direction: column;
    gap: vars.$gap-lg;
  }
  .numbers-object {
    flex-basis: unset;
    h3 {
      font-size: vars.$font-h1;
    }
  }
}
</style>
