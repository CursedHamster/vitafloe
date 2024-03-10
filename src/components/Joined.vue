<script lang="ts" setup>
import { onMounted } from "vue";
import gsap from "gsap";
import Button from "./Button.vue";

const emit = defineEmits(["change-joined", "reset-data"]);
const tl = gsap.timeline();

function changeJoined() {
  emit("reset-data");
  tl.fromTo(
    ".joined-text",
    { autoAlpha: 1, yPercent: 0 },
    { autoAlpha: 0, yPercent: 100, duration: 0.7, ease: "back.inOut" }
  )
    .fromTo(
      ".joined-background",
      { opacity: 1 },
      { opacity: 0, duration: 0.6 },
      "<"
    )
    .call(() => emit("change-joined", false));
}

onMounted(() => {
  tl.fromTo(
    ".joined-background",
    { opacity: 0 },
    { opacity: 1, duration: 0.6 },
    ">"
  ).fromTo(
    ".joined-text",
    { autoAlpha: 0, yPercent: -100 },
    { autoAlpha: 1, yPercent: 0, duration: 0.7, ease: "back.inOut" },
    "<"
  );

  const sparkleAnimation = gsap.timeline({ repeat: -1 });
  sparkleAnimation
    .fromTo(
      [".sparkle--1", ".sparkle--3", ".sparkle--5"],
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.2, delay: 1 },
      0
    )
    .fromTo(
      [".sparkle--1", ".sparkle--3", ".sparkle--5"],
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 0, duration: 0.5, stagger: 0.2, delay: 0.5 },
      ">"
    )
    .fromTo(
      [".sparkle--2", ".sparkle--4"],
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 0, duration: 0.5, delay: 0.5 },
      0
    )
    .fromTo(
      [".sparkle--2", ".sparkle--4"],
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.3 },
      ">"
    );
});
</script>
<template>
  <div class="joined-container">
    <div class="relative">
      <div class="joined-background"></div>
      <div class="joined-text">
        <div>
          <h1 class="section-title joined-title">
            Thank you for <span class="extra">joining</span>
          </h1>
          <p>
            Get ready to embark on a journey to optimal health. We're thrilled
            to have you with us. Look out for our newsletters packed with
            exclusive updates, offers, and wellness insights. Your well-being is
            our priority!
          </p>
        </div>
        <Button button-size="lg" @click="changeJoined">Close</Button>
        <div class="sparkle sparkle--1">✦</div>
        <div class="sparkle sparkle--2">✦</div>
        <div class="sparkle sparkle--3">✦</div>
        <div class="sparkle sparkle--4">✦</div>
        <div class="sparkle sparkle--5">✦</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "../vars";

.joined-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  height: 100svh;
  z-index: 1200;
  .relative {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 vars.$padding-lg;
    .joined-background {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(vars.$background, 0.2);
      opacity: 1;
      backdrop-filter: blur(3px);
      z-index: -1;
    }
  }
  .joined-text {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: vars.$gap-lg;
    padding: vars.$padding-lg;
    background: vars.$background;
    border-radius: vars.$border-radius-lg;
    .joined-title {
      font-size: vars.$font-h1;
      margin-bottom: vars.$padding-sm;
      z-index: 0;
    }
    &::before {
      content: "";
      position: absolute;
      width: calc(100% + vars.$border-width * 2);
      height: calc(100% + vars.$border-width * 2);
      top: -(vars.$border-width);
      left: -(vars.$border-width);
      background: vars.$gradient-2;
      border-radius: vars.$border-radius-lg;
      z-index: -1;
    }
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: vars.$background;
      border-radius: vars.$border-radius-lg;
      box-shadow: vars.$gradient-shadow;
      z-index: -1;
    }
    .sparkle {
      &--1 {
        font-size: 4em;
        top: 5%;
        left: 10%;
      }
      &--2 {
        font-size: 3em;
        top: -10%;
        left: 10%;
      }
      &--3 {
        font-size: 6em;
        top: -5%;
        left: 1%;
      }
      &--4 {
        font-size: 3em;
        top: 4%;
        right: 8%;
      }
      &--5 {
        font-size: 6em;
        top: -6%;
        right: 1%;
      }
    }
  }
}

@media screen and (max-width: vars.$breakpoint-md) {
  .joined-container {
    .relative {
      padding: 0 vars.$padding-md;
      .joined-text {
        padding: vars.$padding-md;
        .joined-title {
          font-size: vars.$font-h2;
        }
        .sparkle {
          &--1 {
            font-size: 2em;
          }
          &--2 {
            font-size: 1em;
          }
          &--3 {
            font-size: 3em;
          }
          &--4 {
            font-size: 1em;
          }
          &--5 {
            font-size: 3em;
          }
        }
      }
    }
  }
}

@media screen and (max-width: vars.$breakpoint-sm) {
  .joined-container {
    .relative {
      padding: 0;
      .joined-text {
        padding: vars.$padding-md vars.$padding-sm;
        border-radius: 0;
        &::before {
          display: none;
        }
        &::after {
          display: none;
        }
      }
    }
  }
}
</style>
