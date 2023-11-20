<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import Flip from "gsap/Flip";
import Lenis from "@studio-freight/lenis";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Loading from "./components/Loading.vue";
import { loading } from "./loadingState";

const showLoading = ref(true);

watch(loading, (val) => {
  if (val) {
    showLoading.value = true;
  }
});

const cursorState = ref("default");
const cursorStates = {
  default: "default",
  hidden: "hidden",
  link: "link",
  button: "button",
};
let setXY: any;

function hideCursor(speed: number) {
  gsap.fromTo(".cursor", {}, { scale: 0, duration: speed });
}

function showCursor(speed: number) {
  gsap.fromTo(".cursor", {}, { scale: 1, duration: speed });
}

function linkCursor() {
  gsap.fromTo(".cursor", {}, { scale: 2, duration: 0.5 });
}

function unlinkCursor() {
  gsap.fromTo(".cursor", {}, { scale: 1, duration: 0.5 });
}

onMounted(() => {
  gsap.registerPlugin(Flip);

  // const lenis = new Lenis({
  //   duration: 2,
  //   smoothWheel: true,
  //   smoothTouch: true,
  //   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  // });

  // function raf(time) {
  //   lenis.raf(time);
  //   requestAnimationFrame(raf);
  // }

  // requestAnimationFrame(raf);

  gsap.set(".cursor", { xPercent: -50, yPercent: -50 });

  const xTo = gsap.quickTo(".cursor", "x", { duration: 0.2, ease: "power3" });
  const yTo = gsap.quickTo(".cursor", "y", { duration: 0.2, ease: "power3" });
  setXY = (e: any) => {
    xTo(e?.clientX);
    yTo(e?.clientY);
  };

  window.addEventListener("mousemove", setXY);
  window.addEventListener("mouseover", (e) => {
    const target = e?.target;
    if (
      target?.id === "pill_canvas" &&
      cursorState.value !== cursorStates?.hidden
    ) {
      cursorState.value = cursorStates?.hidden;
      hideCursor(0.5);
    } else if (
      target?.id !== "pill_canvas" &&
      cursorState.value === cursorStates?.hidden
    ) {
      cursorState.value = cursorStates?.default;
      showCursor(0.5);
    } else if (
      target?.localName === "a" &&
      cursorState.value !== cursorStates?.link
    ) {
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
      hideCursor(0.1);
    } else if (
      !target?.classList?.contains("btn") &&
      cursorState.value === cursorStates?.button
    ) {
      cursorState.value = cursorStates?.default;
      showCursor(0.1);
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
  <div class="cursor"></div>
</template>

<style lang="scss" scoped>
@use "./vars";
.cursor {
  display: none;
  position: fixed;
  width: 1.5rem;
  height: 1.5rem;
  top: 0;
  left: 0;
  background: vars.$background;
  mix-blend-mode: difference;
  border-radius: 50%;
  pointer-events: none;
  transform: scale(0);
  z-index: 1500;
}

@media screen and (min-width: vars.$breakpoint-md) {
  .cursor {
    display: block;
  }
}
</style>
