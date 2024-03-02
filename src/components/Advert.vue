<script lang="ts" setup>
import { onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import data from "../assets/data";
import Button from "./Button.vue";

const pros = data?.advert?.pros;

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".pros-list",
        start: "top bottom",
        end: "bottom bottom",
      },
    })
    .fromTo(
      ".pros-item",
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.2 }
    );
});
</script>
<template>
  <section id="advert">
    <div class="phone-image">
      <img class="phone" src="/images/phone_screenshot.png" alt="" />
    </div>
    <div class="text-container">
      <h2 class="section-title">
        By <span class="extra">joining</span> us you...
      </h2>
      <ul class="pros-list">
        <li class="pros-item" v-for="pro in pros">{{ pro }}</li>
      </ul>
      <Button @click="$router.push('#join')">Join</Button>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use "../vars";
#advert {
  display: flex;
  flex-direction: row;
  padding: 0 0 vars.$padding-md;
  .section-title {
    text-align: start;
  }
}
.phone-image {
  position: relative;
  width: 100%;
  flex-basis: 50%;
  max-width: 50vw;
  min-height: 70vh;
  z-index: 10;
  .phone {
    left: unset;
    transform: rotate(-10deg);
    height: 100% !important;
  }
  &::before {
    content: "";
    height: 100%;
    aspect-ratio: 1/2;
    position: absolute;
    top: vars.$padding-xs;
    left: -(vars.$padding-xs);
    right: 0;
    margin: 0 auto;
    background: vars.$gradient-3;
    border-radius: vars.$border-radius-md;
    transform: rotate(-10deg);
    opacity: 0.5;
    z-index: -1;
  }
}
.text-container {
  padding: 0 vars.$padding-sm vars.$padding-lg;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-basis: 50%;
  .pros-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: vars.$gap-sm;
    .pros-item {
      position: relative;
      padding-left: vars.$padding-sm;
      &::before {
        position: absolute;
        content: "";
        width: 0.5rem;
        height: 0.5rem;
        display: block;
        top: 0.5em;
        left: 0;
        background: vars.$text;
        border-radius: 50%;
      }
    }
  }
  .btn {
    margin-top: vars.$padding-md;
  }
}

@media screen and (max-width: vars.$breakpoint-md) {
  #advert {
    flex-direction: column-reverse;
  }
  .phone-image {
    flex-basis: unset;
    min-height: 60vh;
    max-width: 100%;
    .phone {
      left: 0;
    }
  }
  .text-container {
    flex-basis: unset;
    padding-right: vars.$padding-md;
    align-items: center;
  }
}

@media screen and (max-width: vars.$breakpoint-sm) {
  .text-container {
    padding-right: vars.$padding-sm;
  }
}
</style>
