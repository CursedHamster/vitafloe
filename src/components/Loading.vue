<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import gsap from "gsap";
import vars from "../_vars.module.scss";

const props = defineProps({ loading: { type: Boolean } });
const emit = defineEmits(["setShowLoading"]);

let progress = ref(0);

const tlDuration = 1;
let tl: GSAPTimeline = gsap.timeline();

watch(
  () => props?.loading,
  (val) => {
    if (!val) {
      addUnmountAnimation();
    }
  }
);

function addUnmountAnimation() {
  tl.fromTo(".loading-title", {}, { autoAlpha: 0, duration: 0.5 })
    .fromTo(".loading-progress", {}, { autoAlpha: 0, duration: 0.5, }, "<")
    .fromTo(
      ".loading-container",
      {},
      { background: "transparent", duration: 0.5 },
    )
    .fromTo(
      ".loading-half-shell--left",
      {},
      {
        borderWidth: vars?.borderWidth,
        xPercent: -100,
        autoAlpha: 0,
        duration: 0.5,
      },
      "<"
    )
    .fromTo(
      ".loading-half-shell--right",
      {},
      {
        borderWidth: vars?.borderWidth,
        xPercent: 100,
        autoAlpha: 0,
        duration: 0.5,
      },
      "<"
    )
    .fromTo(
      "html",
      {},
      {
        overflowY: "auto",
        onComplete: () => {
          emit("setShowLoading", false);
          tl?.restart(true);
          tl?.kill();
        },
      },
    );
}

onMounted(() => {
  tl.fromTo(
    ".loading-half--left",
    { scaleX: 0, autoAlpha: 0 },
    {
      scaleX: 1,
      autoAlpha: 1,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      duration: tlDuration,
    }
  ).fromTo(
    ".loading-half--right",
    { scaleX: 0, autoAlpha: 1 },
    {
      scaleX: 1,
      borderTopRightRadius: vars?.borderRadiusLg,
      borderBottomRightRadius: vars?.borderRadiusLg,
      duration: tlDuration,
    },
    ">+=.2"
  );
  tl.fromTo(
    progress,
    {},
    {
      value: 50,
      snap: {
        value: 1,
      },
      duration: tlDuration,
    },
    0
  )
    .fromTo(
      progress,
      {},
      {
        value: 100,
        snap: {
          value: 1,
        },
        duration: tlDuration,
      },
      ">+=.2"
    )
    .fromTo("html", {}, { overflowY: "hidden" }, 0);
});
</script>
<template>
  <div class="loading-container full-height">
    <h1 class="loading-title">vitaem.</h1>
    <div class="loading-animation">
      <div class="loading-half-shell loading-half-shell--left">
        <div class="loading-half loading-half--left"></div>
      </div>

      <div class="loading-half-shell loading-half-shell--right">
        <div class="loading-half loading-half--right"></div>
      </div>
    </div>
    <div class="loading-progress">
      <span class="loading-progress-number">{{ progress }}</span
      >%
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "../vars";
.loading-container {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 vars.$padding-sm;
  gap: vars.$gap-lg;
  background: vars.$background;
  z-index: 1500;
  .loading-animation {
    width: 100%;
    max-width: vars.$breakpoint-w-md;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .loading-half-shell {
      position: relative;
      width: 50%;
      height: 100%;
      border-radius: vars.$border-radius-lg;
      border: vars.$border-width solid vars.$text;
      overflow: hidden;
      &--left {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-right-width: calc(vars.$border-width - 1px);
      }
      &--right {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-left-width: 1px;
      }
    }
    .loading-half {
      position: absolute;
      width: 100%;
      height: calc(100% - vars.$border-width);
      bottom: 0;
      transform-origin: 0 0;
      z-index: -1;
      &--left {
        left: 0;
        border-radius: vars.$border-radius-lg;
        background: rgb(vars.$accent, 0.4);
      }
      &--right {
        right: 0;
        background: vars.$gradient-5;
      }
    }
  }

  .loading-progress,
  .loading-title {
    font-size: vars.$font-h1;
    font-weight: 500;
  }
}
</style>
