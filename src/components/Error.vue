<script lang="ts" setup>
import { onMounted } from "vue";
import gsap from "gsap";
import Button from "./Button.vue";

onMounted(() => {
  gsap.fromTo(
    ".ball--1",
    {},
    { x: 5, y: -5, duration: 1, repeat: -1, yoyo: true, yoyoEase: "none" }
  );
  gsap.fromTo(
    ".ball--2",
    {},
    { x: -10, duration: 1, repeat: -1, delay: .5, yoyo: true, yoyoEase: "none" }
  );
});
</script>
<template>
  <div class="error-container full-height">
    <div class="error-text">
      <h1 class="section-title">
        404 - Page <span class="extra">Not Found</span>
      </h1>
      <p>
        Sorry, the page you are looking for is not found. Meanwhile, you can go
        back to the home page.
      </p>
      <Button @click="$router.push('/')">Go to the home page</Button>
    </div>
    <div class="ball ball--1"></div>
    <div class="ball ball--2"></div>
  </div>
</template>
<style lang="scss" scoped>
@use "../vars";
.error-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .error-text {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: vars.$gap-lg;
    background: vars.$translucent-background;
    backdrop-filter: blur(5px);
    padding: vars.$padding-md vars.$padding-sm;
    text-align: center;
    box-shadow: vars.$border-shadow;
  }
  .ball {
    position: absolute;
    &--1 {
      width: 50%;
      top: vars.$header-offset;
      left: -10%;
    }
    &--2 {
      width: 60%;
      top: unset;
      bottom: vars.$header-offset;
      left: 60%;
    }
  }
}

@media screen and (min-width: vars.$breakpoint-sm) {
  .error-container {
    padding: 0 vars.$padding-md;
    .error-text {
      padding: calc(vars.$padding-md * 2);
      border-radius: vars.$border-radius-md;
    }
  }
}

@media screen and (min-width: vars.$breakpoint-md) {
  .error-container {
    padding: 0 vars.$padding-lg;
    .joined-text {
      padding: vars.$padding-lg;
      p {
        font-size: vars.$font-h2;
      }
    }
  }
}
</style>
