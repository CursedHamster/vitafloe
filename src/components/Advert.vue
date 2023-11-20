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

  const ballAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: ".advert-and-join",
      start: "top bottom",
      end: "bottom bottom",
      invalidateOnRefresh: true,
      scrub: 1,
    },
  });

  ballAnimation
    ?.fromTo(
      ".ball--1",
      { top: "10%", left: "-50%", scale: 0 },
      { top: "70%", left: "-10%", scale: 1 }
    )
    .fromTo(
      ".ball--2",
      { top: "80%", left: "110%", scale: 0 },
      { top: "30%", left: "90%", scale: 1 },
      0
    )
    .fromTo(".ball--1", {}, { scale: 0, left: "-30%" })
    .fromTo(".ball--2", {}, { scale: 0 }, "<");
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
  flex-direction: column-reverse;
  gap: vars.$gap-xl;
  padding: 0 0 vars.$padding-md;
  .section-title {
    text-align: center;
  }
}
.phone-image {
  position: relative;
  width: 100%;
  min-height: 50vh;
  max-height: 100%;
  z-index: -1;
  .phone {
    transform: skewX(25deg);
    height: 100% !important;
  }
}
.text-container {
  padding: 0 vars.$padding-sm vars.$padding-md;
  display: flex;
  flex-direction: column;
  align-items: center;
  .pros-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: vars.$gap-sm;
    .pros-item {
      position: relative;
      padding-left: vars.$padding-xs;
      &::before {
        position: absolute;
        content: "";
        width: 0.5rem;
        height: 0.5rem;
        transform: rotate(45deg);
        display: block;
        top: 0.5em;
        left: 0;
        background: vars.$gradient-2;
      }
    }
  }
  .btn {
    margin-top: vars.$padding-sm;
  }
}
@media screen and (min-width: vars.$breakpoint-sm) {
  #advert {
    flex-direction: row;
    .section-title {
      text-align: start;
    }
  }
  .phone-image {
    flex-basis: 50%;
    max-width: 50vw;
    min-height: 70vh;
    .phone {
      left: unset;
    }
  }
  .text-container {
    flex-basis: 50%;
    padding-right: vars.$padding-md;
    align-items: flex-start;
  }
}

@media screen and (min-width: vars.$breakpoint-md) {
  .text-container {
    padding-right: vars.$padding-lg;
  }
}
</style>
