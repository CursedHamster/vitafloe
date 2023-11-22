<script lang="ts" setup>
import { onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TimelineObject from "./TimelineObject.vue";
import data from "../assets/data";
import vars from "../_vars.module.scss";
const timelineObjects = data?.timeline?.objects;
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  const objects: gsap.DOMTarget[] = gsap.utils.toArray(".timeline-object");
  gsap.timeline({
    scrollTrigger: {
      trigger: ".line",
      start: "top center",
      end: "bottom center",
      scrub: true,
      pin: ".dot-character",
      pinSpacing: false,
      invalidateOnRefresh: true,
    },
  });

  objects?.forEach((object: gsap.DOMTarget) => {
    const objectSelector = gsap.utils.selector(object);
    gsap.fromTo(
      objectSelector(".dot"),
      {},
      {
        scrollTrigger: {
          trigger: object,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reset",
          toggleClass: "active",
        },
        background: vars?.primary,
        outline: vars?.borderWidth + " solid " + vars?.primary,
        outlineOffset: "0.2rem",
        duration: 0.2,
      }
    );

    gsap.fromTo(
      objectSelector(".timeline-image"),
      { opacity: 0, scale: 0.8 },
      {
        scrollTrigger: {
          trigger: object,
          start: "top center",
          end: "bottom center",
        },
        opacity: 1,
        scale: 1,
        duration: 0.5,
      }
    );

    gsap
      .timeline({
        scrollTrigger: {
          trigger: object,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      })
      .fromTo(
        objectSelector(".active-line"),
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
        }
      );
  });
});
</script>
<template>
  <section id="timeline" class="timeline-section">
    <h2 class="section-title">
      <span class="extra">Journey</span> with Vitaem
    </h2>
    <div class="timeline-container">
      <div class="dot-character"><i class="lni lni-capsule"></i></div>
      <div class="line"></div>
      <TimelineObject v-for="object in timelineObjects" :object-info="object" />
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use "../vars";
.timeline-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .section-title {
    text-align: center;
    padding: 0 vars.$padding-sm;
    margin-bottom: vars.$padding-md;
  }
}
.timeline-container {
  position: relative;
  padding: 0 vars.$padding-sm;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.dot-character {
  position: absolute;
  display: none;
  top: 0.3rem;
  left: 0;
  right: 0;
  width: 100%;
  justify-content: center;
  z-index: 20;
  i {
    color: vars.$background;
    font-size: vars.$font-sm;
    background: vars.$accent;
    border-radius: 50%;
    border: 3px solid vars.$background;
    width: 1.8rem;
    height: 1.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.line {
  position: absolute;
  display: block;
  top: 0;
  left: vars.$padding-sm;
  right: 0;
  background-image: linear-gradient(
    180deg,
    vars.$border-color 50%,
    transparent 50%
  );
  background-size: vars.$line-width vars.$dot-size;
  background-repeat: repeat-y;
  width: vars.$line-width;
  height: 100%;
}

@media screen and (min-width: vars.$breakpoint-sm) {
  .timeline-container {
    padding: 0 vars.$padding-md;
    .section-title {
      padding: 0;
    }
  }
  .line {
    left: vars.$padding-md;
  }
}

@media screen and (min-width: vars.$breakpoint-md) {
  .timeline-container {
    padding: 0 vars.$padding-lg;
  }
  .dot-character {
    display: flex;
  }
  .line {
    left: 0;
    margin: 0 auto;
  }
}
</style>
