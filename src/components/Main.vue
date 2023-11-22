<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import data from "../assets/data";
import MainCard from "./MainCard.vue";

const cards = data?.main?.cards;
let windowHeight: number;

function resize() {
  windowHeight = window?.innerHeight;
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  const mainCards: any[] = gsap.utils.toArray(".main-card");

  ScrollTrigger.addEventListener("refreshInit", resize);
  resize();

  gsap.timeline({
    scrollTrigger: {
      trigger: ".main-cards-container",
      start: "top top",
      end: () => "+=" + mainCards?.length * windowHeight,
      scrub: 1,
      pin: ".main-container",
      pinSpacer: ".main-pin-spacer",
      invalidateOnRefresh: true,
    },
  });

  gsap.fromTo(
    mainCards[0],
    { scale: 0 },
    {
      scale: 1,
      scrollTrigger: {
        trigger: ".main-container",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,
      },
    }
  );

  mainCards?.forEach((mainCard, i) => {
    if (i > 0) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".main-pin-spacer",
            start: () => "+=" + (i - 1) * windowHeight,
            end: () => "+=" + windowHeight,
            scrub: true,
            invalidateOnRefresh: true,
            // markers: true,
          },
        })
        .fromTo(
          mainCard,
          { xPercent: 100, yPercent: -100 },
          { xPercent: 2 * i, yPercent: -2 * i },
          0
        )
        .fromTo(
          mainCards[i - 1],
          { filter: "brightness(100%)" },
          {
            filter: "brightness(95%)",
            duration: 0.1,
          }
        );
    }
  });

  const ballAnimation = gsap.timeline({
    scrollTrigger: {
      trigger: ".main-pin-spacer",
      start: "top bottom",
      end: "bottom bottom",
      invalidateOnRefresh: true,
      scrub: 1,
    },
  });

  ballAnimation
    ?.fromTo(".ball--1", {}, { top: "20%", left: "10%" })
    .fromTo(".ball--2", {}, { top: "50%", left: "60%" }, 0)
    .fromTo(".ball--1", {}, { top: "10%", left: "-50%", scale: 0 }, "50%")
    .fromTo(".ball--2", {}, { top: "80%", left: "110%", scale: 0 }, "<");
});

onUnmounted(() => ScrollTrigger.removeEventListener("refreshInit", resize));
</script>
<template>
  <main id="benefits" class="main-container section-container">
    <div class="main-pin-spacer"></div>
    <ul class="main-cards-container">
      <li class="main-card" v-for="card in cards">
        <MainCard :card-info="card" />
      </li>
    </ul>
    <div class="main-text-container">
      <h2 class="section-title">
        Discover the <span class="extra">Benefits</span>
      </h2>
      <p>
        Elevate your health journey with our exclusive range of vitamins. At
        vitaem., we're committed to pioneering cutting-edge formulations that
        prioritize your well-being.
      </p>
    </div>
  </main>
</template>
<style lang="scss" scoped>
@use "../vars";
.main-pin-spacer {
  width: 100% !important;
}
.main-container {
  width: 100% !important;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.main-cards-container {
  // display: flex;
  // flex-wrap: nowrap;
  width: 100%;
  // width: 50%;
  min-height: 100vh;
  max-height: 100vh;
  overflow: visible;
  position: relative;
  z-index: 20;
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    padding: vars.$header-offset 0 0;
  }
}

.main-text-container {
  width: 100%;
  padding: vars.$header-offset vars.$padding-sm 0;
  text-align: center;
  p {
    font-size: vars.$font-h3;
  }
}

@media screen and (min-width: vars.$breakpoint-sm) {
  .main-cards-container {
    li {
      padding: vars.$header-offset vars.$padding-md 0;
    }
  }
  .main-text-container {
    padding: 0 vars.$padding-md;
  }
}

@media screen and (min-width: vars.$breakpoint-md) {
  .main-container {
    flex-direction: row;
  }
  .main-cards-container {
    flex-basis: 50%;
  }
  .main-text-container {
    padding: 0 vars.$padding-md;
    padding-right: vars.$padding-lg;
    padding-bottom: 0;
    flex-basis: 50%;
  }
}
</style>
