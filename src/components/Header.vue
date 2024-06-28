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
let headerElement: HTMLElement | null;
let touchStartY: number;
var menuToggle = gsap.timeline({
  paused: true,
  reversed: true,
});

function isMenuBurger() {
  return window.innerWidth <= parseFloat(vars.breakpointMd);
}

function updateWidth() {
  menuBurger.value = isMenuBurger();
}

watch(menuBurger, (val) => {
  if (val && menuToggle.getChildren()?.length === 0) {
    addMenuToggleAnimation();
  } else if (!val && menuToggle.getChildren()?.length !== 0) {
    menuToggle.clear();
    gsap.set(
      ".header-background, .menu, .nav, .nav-link, .join-button, .top, .bot",
      {
        clearProps: "all",
      }
    );
    openMenu.value = false;
  }
});

function scrollHeader(e: any) {
  e.preventDefault();
  e.stopPropagation();
  headerElement?.scrollBy({ top: e.deltaY });
  return false;
}

function touchStart(e: any) {
  e.preventDefault();
  e.stopPropagation();
  touchStartY = e.touches[0]?.clientY;
  return false;
}

function touchEnd(e: any) {
  if (e.changedTouches[0]?.clientY !== touchStartY) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
}

function touchMove(e: any) {
  e.preventDefault();
  e.stopPropagation();
  headerElement?.scrollBy({ top: touchStartY - e.changedTouches[0]?.clientY });
  return false;
}

watch(openMenu, (val) => {
  if (val) {
    document.documentElement.style.overflowY = "hidden";
    headerElement?.addEventListener("wheel", scrollHeader, { passive: false });
    headerElement?.addEventListener("touchstart", touchStart, {
      passive: false,
    });
    headerElement?.addEventListener("touchend", touchEnd, {
      passive: false,
    });
    headerElement?.addEventListener("touchmove", touchMove, {
      passive: false,
    });
  } else {
    document.documentElement.style.overflowY = "auto";
    headerElement?.removeEventListener("wheel", scrollHeader);
    headerElement?.removeEventListener("touchstart", touchStart);
    headerElement?.removeEventListener("touchend", touchEnd);
    headerElement?.removeEventListener("touchmove", touchMove);
  }
  if (menuBurger.value) {
    menuToggle?.reversed() ? menuToggle?.restart() : menuToggle?.reverse();
  }
});

function addMenuToggleAnimation() {
  menuToggle
    .to(
      ".menu",
      {
        borderBottomColor: "transparent",
        // boxShadow: "none",
        duration: 0.2,
      },
      0
    )
    .fromTo(
      ".header-background",
      { top: "-100vh" },
      { top: 0, duration: 0.5 },
      0
    )
    .to(
      ".top",
      {
        y: 4,
        rotationZ: -45,
        transformOrigin: "center center",
        duration: 0.5,
      },
      0
    )
    .to(
      ".bot",
      {
        y: -4,
        rotationZ: 45,
        transformOrigin: "center center",
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
  headerElement = document.querySelector(".header");
  updateWidth();
  if (menuBurger?.value) {
    addMenuToggleAnimation();
  }
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
  headerElement?.removeEventListener("wheel", scrollHeader);
  headerElement?.removeEventListener("touchstart", touchStart);
  headerElement?.removeEventListener("touchend", touchEnd);
  headerElement?.removeEventListener("touchmove", touchMove);
});
</script>
<template>
  <header class="header" :class="{ 'full-size': !menuBurger }">
    <div class="menu">
      <RouterLink to="/#home" class="logo">vitafloe</RouterLink>
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
  // border-bottom: vars.$border-width solid vars.$text;
  // box-shadow: vars.$light-shadow;
  border-bottom: vars.$border-width solid vars.$transparent-text;
  z-index: 1000;
  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      font-size: vars.$font-h3;
      font-weight: 500;
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
    height: 100vh;
    height: 100svh;
    top: -100vh;
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
    max-height: 100vh;
    max-height: 100svh;
    overflow-y: hidden;
    .menu {
      width: 100%;
      background: vars.$background;
      padding: vars.$padding-xs vars.$padding-md;
      // border-bottom: vars.$border-width solid vars.$text;
      // box-shadow: vars.$light-shadow;
      border-bottom: vars.$border-width solid vars.$transparent-text;
      .btn-icon {
        display: block;
      }
    }
    .nav {
      width: 100%;
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
