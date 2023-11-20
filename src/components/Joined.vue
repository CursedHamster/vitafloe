<script lang="ts" setup>
import { onMounted } from "vue";
import gsap from "gsap";
import data from "../assets/data";
import Button from "./Button.vue";
import vars from "../_vars.module.scss";

const emit = defineEmits(["change-joined", "reset-data"]);
const images = data?.joined?.images;
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
      { opacity: 0.8 },
      { opacity: 0, duration: 0.6 },
      "<"
    )
    .fromTo(
      ".joined-gallery-image",
      { translateY: "0", opacity: 1 },
      {
        translateY: "-100vh",
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut",
        stagger: 0.1,
      },
      ">"
    )
    .fromTo(
      ".joined-gallery",
      { background: vars?.background },
      { background: "none", duration: 1 },
      "<+=.5"
    )
    .fromTo("html", {}, { overflowY: "auto" })
    .call(() => emit("change-joined", false));
}

onMounted(() => {
  tl.fromTo("html", {}, { overflowY: "hidden" });
  tl.fromTo(
    ".joined-gallery",
    { background: "none" },
    { background: vars?.background, duration: 0.5 },
    0
  )
    .fromTo(
      ".joined-gallery-image",
      { translateY: "100vh", opacity: 0 },
      {
        translateY: "0",
        opacity: 1,
        duration: 0.5,
        ease: "power1.inOut",
        stagger: 0.1,
      },
      "<"
    )
    .fromTo(
      ".joined-background",
      { opacity: 0 },
      { opacity: 0.8, duration: 0.6 },
      ">"
    )
    .fromTo(
      ".joined-text",
      { autoAlpha: 0, yPercent: -100 },
      { autoAlpha: 1, yPercent: 0, duration: 0.7, ease: "back.inOut" },
      "<"
    );

  const sparkleAnimation = gsap.timeline({ repeat: -1 });
  sparkleAnimation
    .fromTo(
      [".sparkle--1", ".sparkle--3", ".sparkle--5"],
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 0, duration: 0.5, stagger: 0.2, delay: 1 },
      0
    )
    .fromTo(
      [".sparkle--1", ".sparkle--3", ".sparkle--5"],
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.2 },
      ">"
    )
    .fromTo(
      [".sparkle--2", ".sparkle--4"],
      { opacity: 1, scale: 1 },
      { opacity: 0, scale: 0, duration: 0.5, delay: 0.5 },
      "<"
    )
    .fromTo(
      [".sparkle--2", ".sparkle--4"],
      { opacity: 0, scale: 0 },
      { opacity: 1, scale: 1, duration: 0.5 },
      ">"
    );
});
</script>
<template>
  <div class="joined-container">
    <div class="relative">
      <div class="joined-gallery">
        <img
          class="joined-gallery-image"
          v-for="image in images"
          :src="image"
          alt="Happy person"
        />
      </div>
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
  z-index: 1200;
  .relative {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .joined-background {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: vars.$text;
      opacity: 0.8;
      z-index: -1;
    }
  }
  .joined-gallery {
    position: absolute;
    width: 100%;
    height: 100%;
    max-height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, calc((100vh - (1rem * 4)) / 3));
    gap: vars.$gap-md;
    padding: vars.$padding-xs;
    background: vars.$background;
    img {
      width: 100%;
      height: 100%;
      // height: 0%;
      // max-height: 33vh;
      border-radius: vars.$border-radius-xs;
      object-fit: cover;
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
    padding: calc(vars.$padding-md * 2) vars.$padding-sm;
    background: vars.$translucent-background;
    backdrop-filter: blur(5px);
    box-shadow: vars.$border-shadow;
    .joined-title {
      font-size: vars.$font-h0;
      line-height: 1;
      text-transform: capitalize;
      z-index: 0;
    }
    p {
      font-size: vars.$font-h3;
    }

    .sparkle {
      &--1 {
        font-size: 3em;
        top: 5%;
        left: 10%;
      }
      &--2 {
        font-size: 1.5em;
        top: -10%;
        left: 10%;
      }
      &--3 {
        font-size: 4em;
        top: -5%;
        left: 1%;
      }
      &--4 {
        font-size: 2em;
        top: 4%;
        right: 8%;
      }
      &--5 {
        font-size: 4em;
        top: -6%;
        right: 1%;
      }
    }
  }
}

@media screen and (min-width: vars.$breakpoint-sm) {
  .joined-container {
    .relative {
      padding: 0 vars.$padding-md;
      .joined-text {
        padding: calc(vars.$padding-md * 2);
        border-radius: vars.$border-radius-md;
      }
    }
  }
}

@media screen and (min-width: vars.$breakpoint-md) {
  .joined-container {
    .relative {
      padding: 0 vars.$padding-lg;
      .joined-text {
        padding: vars.$padding-lg;
        .joined-title {
          font-size: vars.$font-ult;
        }
        p {
          font-size: vars.$font-h2;
        }
        .sparkle {
          &--1 {
            font-size: 4em;
          }
          &--2 {
            font-size: 3em;
          }
          &--3 {
            font-size: 6em;
          }
          &--4 {
            font-size: 3em;
          }
          &--5 {
            font-size: 6em;
          }
        }
      }
    }
  }
}
</style>
