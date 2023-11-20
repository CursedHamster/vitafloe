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
  padding: vars.$padding-md;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: vars.$gap-md;
}
.numbers-object {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  h3 {
    line-height: 1.5;
    font-size: vars.$font-ult;
    background: vars.$gradient-1;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  p {
    font-size: vars.$font-h4;
  }
}

@media screen and (min-width: vars.$breakpoint-md) {
  .numbers-container {
    padding: vars.$padding-lg;
    flex-direction: row;
    gap: vars.$gap-xl;
    max-width: 1400px;
  }
  .numbers-object {
    flex-basis: calc(100%/3);
    h3 {
      font-size: 5em;
    }
  }
}
</style>
