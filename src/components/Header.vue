<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import gsap from "gsap";
import data from "../assets/data";

const sections = data?.sections;
const socials = data?.socials;
const openMenu: any = ref(false);
var menuToggle: gsap.core.Timeline;
var iconWidth: number;
const html: HTMLHtmlElement | null = document.querySelector("html");

function updateWidth() {
  const iconMenu = document.querySelector(".icon-menu")?.clientWidth;
  iconWidth = iconMenu ? iconMenu : 0;
}

watch(openMenu, (val) => {
  if (html) {
    html.style.overflowY = val ? "hidden" : "auto";
  }
  menuToggle?.reversed() ? menuToggle?.restart() : menuToggle?.reverse();
});

onMounted(() => {
  updateWidth();
  menuToggle = gsap.timeline({ paused: true, reversed: true });
  menuToggle
    .fromTo(".header", {}, { height: "100vh", duration: 0.5 }, 0)
    .fromTo(
      ".nav",
      { height: 0, opacity: 0 },
      { height: "100%", opacity: 1, duration: 0.5 },
      0
    )
    .fromTo(
      ".top",
      {},
      { y: (iconWidth - iconWidth / 3.5) / 2, duration: 0.5 },
      0
    )
    .fromTo(
      ".bot",
      {},
      { y: (iconWidth - iconWidth / 3.5) / -2, duration: 0.5 },
      0
    )
    .fromTo(
      ".mid",
      {},
      { scale: 0, transformOrigin: "center", duration: 0.5 },
      0
    )
    .fromTo(
      ".top",
      {},
      {
        rotationZ: 45,
        transformOrigin: "center",
        duration: 0.5,
      },
      0
    )
    .fromTo(
      ".bot",
      {},
      {
        rotationZ: -45,
        transformOrigin: "center",
        duration: 0.5,
      },
      0
    );

  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => window.removeEventListener("resize", updateWidth));
</script>
<template>
  <header class="header">
    <div class="menu">
      <RouterLink to="/#home" class="logo">vitaem.</RouterLink>
      <button class="icon" @click="openMenu = !openMenu">
        <!-- <i class="lni lni-menu"></i> -->
        <svg
          class="icon-menu"
          version="1.1"
          id="lni_lni-menu"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 64 64"
          style="enable-background: new 0 0 64 64"
          xml:space="preserve"
        >
          <g>
            <path
              class="top"
              d="M4,17.2h56c1.2,0,2.3-1,2.3-2.3s-1-2.3-2.3-2.3H4c-1.2,0-2.3,1-2.3,2.3S2.8,17.2,4,17.2z"
            />
            <path
              class="mid"
              d="M60,29.8H4c-1.2,0-2.3,1-2.3,2.3c0,1.2,1,2.3,2.3,2.3h56c1.2,0,2.3-1,2.3-2.3C62.3,30.8,61.2,29.8,60,29.8z"
            />
            <path
              class="bot"
              d="M60,46.8H4c-1.2,0-2.3,1-2.3,2.3s1,2.3,2.3,2.3h56c1.2,0,2.3-1,2.3-2.3S61.2,46.8,60,46.8z"
            />
          </g>
        </svg>
      </button>
    </div>
    <nav class="nav">
      <div class="sections">
        <RouterLink
          v-for="section in sections"
          :to="'#' + section?.id"
          @click="openMenu = false"
          >{{ section?.title }}</RouterLink
        >
      </div>
      <div class="socials">
        <a v-for="social in socials" :href="social?.url"
          ><i
            class="lni"
            :class="[social?.icon]"
            :aria-label="social?.title"
          ></i
        ></a>
      </div>
    </nav>
  </header>
</template>
<style lang="scss" scoped>
@use "../vars";
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: vars.$background;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid vars.$secondary;
  z-index: 1000;
  .menu {
    width: 100%;
    padding: vars.$padding-xs vars.$padding-sm;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      font-size: vars.$font-h1;
      font-weight: 500;
    }
    .icon {
      line-height: 1;
      background: none;
      border: none;
      color: vars.$text;
      cursor: pointer;
      svg {
        width: 2rem;
        height: 2rem;
        fill: vars.$text;
      }
    }
  }
  nav {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: vars.$font-h2;
    height: 0;
    overflow-y: hidden;
    gap: vars.$gap-md * 1.5;
    .sections {
      display: flex;
      flex-direction: column;
      width: 100%;
      align-items: center;
      gap: vars.$gap-md;
      text-transform: capitalize;
      overflow-y: hidden;
    }
    .socials {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: vars.$font-h1;
      gap: vars.$gap-md;
      i {
        pointer-events: none;
        line-height: 1;
      }
    }
  }
}

@media screen and (min-width: vars.$breakpoint-sm) {
  .header {
    .menu {
      padding: vars.$padding-xs vars.$padding-md;
      .icon {
        svg {
          width: 2.5rem;
          height: 2.5rem;
        }
      }
    }
  }
}

@media screen and (min-width: vars.$breakpoint-md) {
  .header {
    .menu {
      padding: vars.$padding-xs vars.$padding-lg;
    }
  }
}
</style>
