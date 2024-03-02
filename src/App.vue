<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Loading from "./components/Loading.vue";
import { loading } from "./loadingState";
import vars from "./_vars.module.scss";

const showLoading = ref(true);

watch(loading, (val) => {
  if (val) {
    showLoading.value = true;
  }
});

const cursorRadius = 80;
const cursorState = ref("default");
const cursorStates = {
  default: "default",
  clickable: "clickable",
  link: "link",
  button: "button",
};
let setXY: any;

const cursorRotation = gsap.timeline({ repeat: -1, paused: true });

function cursorSetup() {
  const cursorText = document.querySelectorAll(".cursor-char");
  for (let i = 0; i < cursorText.length; i++) {
    let rotation = i * (360 / cursorText.length);
    gsap.set(cursorText[i], {
      transformOrigin: `0px ${cursorRadius}px`,
      x: cursorRadius,
      rotate: rotation,
    });
  }
  gsap.set(".cursor", {
    transformOrigin: "center center",
    rotation: 0,
    width: cursorRadius * 2,
    height: cursorRadius * 2,
  });
  cursorRotation.fromTo(
    ".cursor-text",
    {},
    {
      rotation: 360,
      duration: 5,
      ease: "none",
    }
  );
}

function hideCursor() {
  gsap.fromTo(".cursor", {}, { autoAlpha: 0, duration: 0.1 });
}

function showCursor() {
  gsap.fromTo(".cursor", {}, { autoAlpha: 1, duration: 0.1 });
}

function enlargeCursor() {
  gsap.fromTo(".cursor-inner", {}, { scale: 2, duration: 0.3 });
}

function shrinkCursor() {
  gsap.fromTo(".cursor-inner", {}, { scale: 1, duration: 0.3 });
}

function linkCursor() {
  gsap.fromTo(
    ".cursor-inner",
    {},
    {
      scale: 3,
      background: vars.background,
      outlineWidth: 5,
      duration: 0.3,
    }
  );
  gsap.fromTo(
    ".cursor-inner i",
    {},
    {
      autoAlpha: 1,
      duration: 0.3,
    }
  );
  gsap.fromTo(
    ".cursor-text",
    {},
    {
      autoAlpha: 1,
      duration: 0.3,
    }
  );
  cursorRotation?.play(0);
}

function unlinkCursor() {
  gsap.fromTo(
    ".cursor-inner",
    {},
    {
      scale: 1,
      background: "transparent",
      outlineWidth: 0,
      duration: 0.3,
    }
  );
  gsap.fromTo(
    ".cursor-inner i",
    {},
    {
      autoAlpha: 0,
      duration: 0.3,
    }
  );
  gsap.fromTo(
    ".cursor-text",
    {},
    {
      autoAlpha: 0,
      duration: 0.3,
    }
  );
  cursorRotation?.pause();
}

onMounted(() => {
  cursorSetup();

  const xTo = gsap.quickTo(".cursor", "x", { duration: 0.2, ease: "power3" });
  const yTo = gsap.quickTo(".cursor", "y", { duration: 0.2, ease: "power3" });
  setXY = (e: any) => {
    xTo(e?.clientX - cursorRadius);
    yTo(e?.clientY - cursorRadius);
  };

  window.addEventListener("mousemove", setXY);
  window.addEventListener("mouseover", (e) => {
    const target: any = e?.target;
    if (target?.localName === "a" && cursorState.value !== cursorStates?.link) {
      cursorState.value = cursorStates?.link;
      linkCursor();
    } else if (
      target?.localName !== "a" &&
      cursorState.value === cursorStates?.link
    ) {
      cursorState.value = cursorStates?.default;
      unlinkCursor();
    } else if (
      target?.classList?.contains("btn") &&
      cursorState.value !== cursorStates?.button
    ) {
      cursorState.value = cursorStates?.button;
      hideCursor();
    } else if (
      !target?.classList?.contains("btn") &&
      cursorState.value === cursorStates?.button
    ) {
      cursorState.value = cursorStates?.default;
      showCursor();
    } else if (
      target?.classList?.contains("clickable") &&
      cursorState.value !== cursorStates?.clickable
    ) {
      cursorState.value = cursorStates?.clickable;
      enlargeCursor();
    } else if (
      !target?.classList?.contains("clickable") &&
      cursorState.value === cursorStates?.clickable
    ) {
      cursorState.value = cursorStates?.default;
      shrinkCursor();
    }
  });
});

onUnmounted(() => window.removeEventListener("mousemove", setXY));
</script>

<template>
  <Header />
  <RouterView></RouterView>
  <Footer />
  <Loading
    v-if="showLoading"
    :loading="loading"
    @set-show-loading="(val: boolean) => (showLoading = val)"
  />
  <div class="cursor">
    <div class="cursor-inner"><i class="ti ti-arrow-up-right"></i></div>
    <div class="cursor-text">
      <span v-for="char in 'CLICK-TO-VIEW-'" class="cursor-char">{{
        char
      }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "./vars";
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1500;
  &-inner {
    width: 0.8rem;
    height: 0.8rem;
    border: 1px solid vars.$text;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: 0 solid rgba(vars.$primary, 0.2);
    i {
      line-height: 1;
      color: vars.$text;
      font-size: 0.5em;
      opacity: 0;
      visibility: hidden;
    }
  }
  &-text {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: vars.$text;
    opacity: 0;
    visibility: hidden;
    font-size: vars.$font-xs;
  }
  &-char {
    position: absolute;
  }
}

@media screen and (max-width: vars.$breakpoint-md) {
  .cursor {
    display: none;
  }
}
</style>
