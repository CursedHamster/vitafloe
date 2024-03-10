<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Button from "./Button.vue";
import data from "../assets/data";
import vars from "../_vars.module.scss";

const sections = data?.sections;
const openMenu = ref(false);
const menuBurger = ref(isMenuBurger());
var menuToggle = gsap.timeline({ paused: true, reversed: true });
var iconWidth: number;
const html: HTMLHtmlElement | null = document.querySelector("html");

function isMenuBurger() {
  return window.innerWidth <= parseFloat(vars.breakpointMd);
}

function updateWidth() {
  const iconMenu = document.querySelector(".icon-menu")?.clientHeight;
  iconWidth = iconMenu ? iconMenu : 0;
  menuBurger.value = isMenuBurger();
}

watch(menuBurger, (val) => {
  if (val && menuToggle.getChildren()?.length === 0) {
    addMenuToggleAnimation();
  } else if (!val && menuToggle.getChildren()?.length !== 0) {
    menuToggle.clear();
    gsap.set(".header-background, .nav, .nav-link, .join-button, .top, .bot", {
      clearProps: "all",
    });
    openMenu.value = false;
  }
});

watch(openMenu, (val) => {
  if (html) {
    html.style.overflowY = val ? "hidden" : "auto";
  }
  if (menuBurger.value) {
    menuToggle?.reversed() ? menuToggle?.restart() : menuToggle?.reverse();
  }
});

function addMenuToggleAnimation() {
  menuToggle
    .to(".header-background", { top: 0, duration: 0.5 }, 0)
    .to(
      ".top",
      {
        y: iconWidth / -22,
        rotationZ: -45,
        transformOrigin: "right",
        duration: 0.5,
      },
      0
    )
    .to(
      ".bot",
      {
        y: iconWidth / 22,
        rotationZ: 45,
        transformOrigin: "right",
        duration: 0.5,
      },
      0
    )
    .to(".nav", { display: "flex" }, 0)
    .from(".nav-link", { y: -50, autoAlpha: 0, duration: 0.2, stagger: 0.2 }, 0)
    .from(".join-button", { x: -20, autoAlpha: 0, duration: 0.2 }, ">");
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  updateWidth();
  if (menuBurger?.value) {
    addMenuToggleAnimation();
  }
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => window.removeEventListener("resize", updateWidth));
</script>
<template>
  <header class="header" :class="{ 'full-size': !menuBurger }">
    <div class="menu">
      <RouterLink to="/#home" class="logo">vitaem</RouterLink>
      <button class="btn-icon clickable" @click="openMenu = !openMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-menu icon-menu"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path class="top" d="M4 8l16 0" />
          <path class="bot" d="M4 16l16 0" />
        </svg>
      </button>
    </div>
    <nav class="nav">
      <RouterLink
        class="nav-link"
        v-for="section in sections"
        :to="'#' + section?.id"
        @click="openMenu = false"
        ><p>{{ section?.title }}</p>
        <i class="ti ti-arrow-right"></i
      ></RouterLink>
      <Button
        class="join-button"
        @click="
          () => {
            openMenu = false;
            $router.push('#join');
          }
        "
        >Join</Button
      >
    </nav>
    <div class="header-background"></div>
  </header>
</template>
<style lang="scss" scoped>
@use "../vars";
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  padding: vars.$padding-xs vars.$padding-lg;
  background: vars.$background;
  z-index: 1000;
  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      font-size: vars.$font-h3;
      font-weight: 600;
      background: vars.$gradient-3;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .btn-icon {
      display: none;
      line-height: 1;
      background: none;
      border: none;
      color: vars.$text;
      padding: 0;
      svg {
        width: 1.5rem;
        height: 1.5rem;
        fill: vars.$text;
      }
    }
  }
  .nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: vars.$gap-lg;
    text-transform: capitalize;
    font-size: vars.$font-sm;
    z-index: 0;
    &-link {
      i {
        display: none;
        font-size: vars.$font-h4;
      }
    }
  }
  .header-background {
    display: none;
    position: fixed;
    width: 100%;
    height: 100svh;
    top: -100svh;
    left: 0;
    right: 0;
    background: vars.$background;
    z-index: -1;
  }
}

@media screen and (max-width: vars.$breakpoint-md) {
  .header {
    padding: 0;
    justify-items: flex-start;
    flex-direction: column;
    background: none;
    border: none;
    max-height: 100svh;
    overflow-y: auto;
    .menu {
      width: 100%;
      background: vars.$background;
      padding: vars.$padding-xs vars.$padding-md;
      .btn-icon {
        display: block;
      }
    }
    .nav {
      display: none;
      font-size: 1em;
      flex-direction: column;
      margin: vars.$padding-sm 0;
      padding: vars.$padding-xs vars.$padding-md;
      &-link {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: vars.$padding-xs;
        border-bottom: vars.$border-width solid vars.$text;
        i {
          display: block;
        }
      }
    }
    .header-background {
      display: block;
    }
  }
}

@media screen and (max-width: vars.$breakpoint-sm) {
  .header {
    .menu {
      padding: vars.$padding-xs vars.$padding-sm;
    }
    .nav {
      padding: vars.$padding-xs vars.$padding-sm;
    }
  }
}
</style>
