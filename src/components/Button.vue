<script lang="ts" setup>
import gsap from "gsap";

const props = defineProps({
  buttonSize: {
    type: String,
    default: "md",
  },
  buttonStyle: { type: String, default: "dark" },
});
const emit = defineEmits(["click"]);
const buttonSizes = ["sm", "md", "lg"];
const buttonStyles = ["dark", "light"];
const size = buttonSizes?.includes(props?.buttonSize)
  ? props?.buttonSize
  : "md";
const style = buttonStyles?.includes(props?.buttonStyle)
  ? props?.buttonStyle
  : "dark";

const tl = gsap.timeline();

function hoverButton(e: MouseEvent) {
  const target = e?.target;
  if (tl.isActive()) {
    tl.clear();
  }

  tl.fromTo(
    target,
    { y: -3, x: -3 },
    {
      y: 0,
      x: 0,
      color: props?.buttonStyle === "dark" ? "white" : "black",
      background: props?.buttonStyle === "dark" ? "black" : "white",
      yoyo: true,
      duration: 0.3,
    }
  );
}

function leaveButton(e: MouseEvent) {
  const target = e?.target;
  if (tl.isActive()) {
    tl.clear();
  }
  tl.fromTo(
    target,
    {},
    {
      color: props?.buttonStyle === "dark" ? "black" : "white",
      background: "none",
      duration: 0.2,
    }
  );
}

function clickButton(e: MouseEvent) {
  leaveButton(e);
  emit("click");
}
</script>
<template>
  <button
    class="btn"
    :class="[props?.buttonSize, props?.buttonStyle]"
    @mouseover="hoverButton"
    @mouseleave="leaveButton"
    @click="clickButton"
  >
    <slot></slot>
  </button>
</template>
<style lang="scss" scoped>
@use "../vars";

.btn {
  width: 100%;
  padding: vars.$padding-xxs vars.$padding-xs;
  cursor: none;
  border-radius: vars.$border-radius-lg;
  border: none;
  background: none;
  color: vars.$text;
  font-size: 1em;
  font-weight: 600;
  &.light {
    color: vars.$background;
    border: 2px solid vars.$background;
  }
  &.dark {
    border: 2px solid vars.$text;
  }
  &.lg {
    padding: vars.$padding-xxs vars.$padding-md;
    font-size: vars.$font-h2;
  }
}

@media screen and (min-width: vars.$breakpoint-sm) {
  .btn {
    width: fit-content;
  }
}

@media screen and (min-width: vars.$breakpoint-md) {
  .btn {
    &.lg {
    padding: vars.$padding-xxs vars.$padding-md;
    font-size: vars.$font-h1;
  }
  }
}
</style>
