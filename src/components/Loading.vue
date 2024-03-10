<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import gsap from "gsap";

const props = defineProps({ loading: { type: Boolean } });
const emit = defineEmits(["setShowLoading"]);

let progress = ref(0);

const animatedText = "VITAEM".split("");
const tlDuration = 2;
const progressTimeline: GSAPTimeline = gsap.timeline();
const letterTimeline = gsap.timeline({
  repeat: -1,
  repeatDelay: 0.2,
});

watch(
  () => props?.loading,
  (val) => {
    if (!val) {
      addUnmountAnimation();
    }
  }
);

function addUnmountAnimation() {
  letterTimeline.pause();
  gsap.fromTo(
    ".loading-container",
    {},
    {
      autoAlpha: 0,
      duration: 0.2,
      onComplete: () => {
        const html: HTMLHtmlElement | null = document.querySelector("html");
        if (html) {
          html.style.overflowY = "auto";
        }
        emit("setShowLoading", false);
        progressTimeline?.restart(true);
        progressTimeline?.kill();
        letterTimeline?.restart(true);
        letterTimeline?.kill();
      },
    }
  );
}

onMounted(() => {
  progressTimeline
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
      0
    )
    .fromTo("html", {}, { overflowY: "hidden" }, 0);

  animatedText?.forEach((ch) => {
    letterTimeline.to(".loading-animation", {
      innerText: ch,
      duration: tlDuration / animatedText.length,
    });
  });
});
</script>
<template>
  <div class="loading-container full-height">
    <div class="loading-animation">V</div>
    <div class="loading-progress">
      Loading . . .
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
    font-size: 40vw;
    font-weight: 300;
    &::before {
      content: "";
      position: absolute;
      max-width: 40vw;
      max-height: 40vh;
      max-height: 40svh;
      aspect-ratio: 1/1;
      background: vars.$gradient-3;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      opacity: 0.3;
      z-index: -1;
    }
  }
  .loading-progress {
    position: absolute;
    right: vars.$padding-sm;
    bottom: vars.$padding-sm;
  }
  .loading-progress-number {
    font-weight: 500;
  }
}
</style>
