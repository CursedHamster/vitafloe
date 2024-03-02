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
  const scrollT = ScrollTrigger?.getById("main");
  scrollT?.disable(true, true);
  scrollT?.refresh();
  scrollT?.enable(true, true);
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  const mainCards: any[] = gsap.utils.toArray(".main-card");

  window.addEventListener("resize", resize);

  resize();

  ScrollTrigger?.create({
    id: "main",
    trigger: ".main-container",
    start: () => document.querySelector(".main-container")?.clientTop + " top",
    end: () => `+=${cards?.length * window.innerHeight} top`,
    pin: ".main-container",
    invalidateOnRefresh: true,
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
            trigger: ".pin-spacer-main",
            start: () => "+=" + (i - 1) * windowHeight,
            end: () => "+=" + windowHeight,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(
          mainCard,
          {
            xPercent: 100,
            yPercent: -100,
            filter: "blur(2px)",
            autoAlpha: 0.8,
          },
          {
            xPercent: 2 * i,
            yPercent: -2 * i,
            filter: "blur(0px)",
            autoAlpha: 1,
          },
          0
        )
        .fromTo(
          mainCards[i - 1],
          { filter: "blur(0px)", autoAlpha: 1 },
          {
            filter: `blur(${3 / i}px)`,
            autoAlpha: 0.3 + 0.2 * i,
            duration: 0.1,
          }
        );
    }
  });
});

onUnmounted(() => window.removeEventListener("resize", resize));
</script>
<template>
  <main id="benefits" class="main-container section-container">
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
        Vitaem, we're committed to pioneering cutting-edge formulations that
        prioritize your well-being.
      </p>
    </div>
  </main>
</template>
<style lang="scss" scoped>
@use "../vars";
.main-container {
  width: 100% !important;
  max-width: 100% !important;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.main-cards-container {
  flex-basis: 50%;
  width: 100%;
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
    padding: vars.$header-offset vars.$padding-md 0;
  }
}

.main-text-container {
  width: 100%;
  padding-left: vars.$padding-md;
  padding-right: vars.$padding-lg;
  flex-basis: 50%;
  text-align: center;
  .section-title {
    margin-bottom: vars.$padding-sm;
  }
  p {
    max-width: vars.$max-text-width;
    margin: 0 auto;
  }
}

@media screen and (max-width: vars.$breakpoint-md) {
  .main-container {
    flex-direction: column;
  }
  .main-text-container {
    padding: 0 vars.$padding-md;
  }
}

@media screen and (max-width: vars.$breakpoint-sm) {
  .main-cards-container {
    li {
      padding: vars.$header-offset 0 0;
    }
  }
  .main-text-container {
    padding: 0 vars.$padding-sm;
  }
}
</style>
