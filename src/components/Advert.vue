<script lang="ts" setup>
import data from "../assets/data";
import Button from "./Button.vue";

const pros = data?.advert?.pros;
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
  padding: 0 0 vars.$padding-lg;
  .section-title {
    text-align: start;
  }
}
.phone-image {
  position: relative;
  width: 100%;
  flex-basis: 50%;
  max-width: 50vw;
  min-height: 70svh;
  z-index: 10;
  .phone {
    left: unset;
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
  padding: 0 vars.$padding-lg 0 vars.$padding-sm;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
    min-height: 60svh;
    max-width: 100%;
    .phone {
      left: 0;
    }
  }
  .text-container {
    flex-basis: unset;
    padding: 0 vars.$padding-md vars.$padding-lg;
    align-items: center;
    .pros-list {
      width: fit-content;
    }
  }
}

@media screen and (max-width: vars.$breakpoint-sm) {
  .text-container {
    padding: 0 vars.$padding-sm vars.$padding-md;
  }
}
</style>
