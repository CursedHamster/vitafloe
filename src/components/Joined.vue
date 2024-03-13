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
});
</script>
<template>
  <div class="joined-container">
    <div class="relative">
      <div class="joined-background"></div>
      <div class="joined-text">
        <div>
          <h1 class="section-title joined-title">
            Thank you for <span class="extra">joining!</span>
          </h1>
          <p>
            Get ready to embark on a journey to optimal health. We're thrilled
            to have you with us. Look out for our newsletters packed with
            exclusive updates, offers, and wellness insights. Your well-being is
            our priority!
          </p>
        </div>
        <Button @click="changeJoined">Close</Button>
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
    justify-content: center;
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
        border-top: vars.$border-width solid vars.$transparent-text;
        border-bottom: vars.$border-width solid vars.$transparent-text;
        overflow-y: auto;
        max-height: 100%;
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
