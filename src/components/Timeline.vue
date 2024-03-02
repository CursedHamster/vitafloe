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
  ScrollTrigger?.create({
    trigger: ".line",
    start: "top center",
    end: "bottom center",
    pin: ".dot-character",
    pinSpacing: false,
    invalidateOnRefresh: true,
  });

  objects?.forEach((object: gsap.DOMTarget) => {
    const objectSelector = gsap.utils.selector(object);
    const dotTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: object,
        start: "top center",
        end: "bottom center",
        toggleActions: "play none none reset",
        toggleClass: "active",
      },
    });
    dotTimeline.fromTo(
      objectSelector(".dot-container"),
      {},
      {
        borderColor: vars?.primary,
        duration: 0.2,
      }
    );
    dotTimeline.fromTo(
      objectSelector(".dot"),
      { scale: 0 },
      {
        scale: 1,
        duration: 0.2,
      },
      0
    );

    gsap.fromTo(
      objectSelector(".timeline-image>img"),
      { filter: "blur(50px)", opacity: 0.5, scale: 1.05 },
      {
        scrollTrigger: {
          trigger: object,
          start: "top center",
          end: "bottom center",
        },
        filter: "blur(0px)",
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
      <div class="dot-character">
        <div class="dot-object"><i class="ti ti-pill"></i></div>
      </div>
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
}
.timeline-container {
  position: relative;
  padding: 0 vars.$padding-lg;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.dot-character {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  justify-content: center;
  z-index: 20;
  .dot-object {
    position: relative;
    width: calc(vars.$dot-size * 1.5);
    height: calc(vars.$dot-size * 1.5);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background: vars.$background;
    box-shadow: vars.$gradient-shadow;
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      margin: auto;
      background: vars.$gradient-3;
      border-radius: 50%;
      scale: 1.1;
      z-index: -1;
    }
  }
  i {
    font-size: vars.$font-h4;
    background: vars.$gradient-2;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
.line {
  position: absolute;
  display: block;
  top: 0;
  right: 0;
  left: 0;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.07);
  width: vars.$line-width;
  height: 100%;
  border-radius: vars.$line-width;
}

@media screen and (max-width: vars.$breakpoint-md) {
  .timeline-container {
    padding: 0 vars.$padding-md;
  }
  .dot-character {
    display: none;
  }
  .line {
    left: vars.$padding-md;
    margin: 0;
  }
}

@media screen and (max-width: vars.$breakpoint-sm) {
  .timeline-container {
    padding: 0 vars.$padding-sm;
  }
  .section-title {
    text-align: center;
    padding: 0 vars.$padding-sm;
  }
  .line {
    left: vars.$padding-sm;
  }
}
</style>
