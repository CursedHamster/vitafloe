<script lang="ts" setup>
import gsap from "gsap";
import vars from "../_vars.module.scss";

const defaultSize = "md"
const defaultStyle = "standard"
const props = defineProps({
  buttonSize: {
    type: String,
    default: defaultSize,
  },
  buttonStyle: {
    type: String,
    default: defaultStyle
  }
});
const emit = defineEmits(["click"]);
const buttonSizes = [defaultSize, "lg"];
const buttonStyles = [defaultStyle, "static"];
const size = buttonSizes?.includes(props?.buttonSize)
  ? props?.buttonSize
  : defaultSize;
  const style = buttonStyles?.includes(props?.buttonStyle)
  ? props?.buttonStyle
  : defaultStyle;

const tl = gsap.timeline();

function hoverButton(e: MouseEvent) {
  const target = e?.target;
  if (tl.isActive()) {
    tl.clear();
  }

  if (props?.buttonStyle === defaultStyle) {
  tl.fromTo(
    target,
    { y: -3, x: -3 },
    {
      y: 0,
      x: 0,
      color: vars?.background,
      background: vars?.text,
      yoyo: true,
      duration: 0.3,
    }
  );}
}

function leaveButton(e: MouseEvent) {
  const target = e?.target;
  if (tl.isActive()) {
    tl.clear();
  }
  if (props?.buttonStyle === defaultStyle) {
    tl.fromTo(
    target,
    {},
    {
      color: vars?.text,
      background: "none",
      duration: 0.2,
    }
  );
  }
}

function clickButton(e: MouseEvent) {
  leaveButton(e);
  emit("click");
}
</script>
<template>
  <button
    class="btn"
    :class="size, style"
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
  padding: vars.$padding-xxs vars.$padding-md;
  cursor: none;
  border-radius: vars.$border-radius-lg;
  border: vars.$border-width solid vars.$text;
  background: none;
  color: vars.$text;
  font-size: 1em;
  font-weight: 700;
  line-height: 1;
  &.static {
    transition: all 0.2s ease-in-out;
    &:hover {
      background: vars.$text;
      color: vars.$background;
    }
  }
  &.lg {
    padding: vars.$padding-xs vars.$padding-md;
    font-size: vars.$font-h3;
  }
}

@media screen and (max-width: vars.$breakpoint-md) {
  .btn {
    &.lg {
      font-size: vars.$font-h4;
    }
  }
}

@media screen and (max-width: vars.$breakpoint-sm) {
  .btn {
    width: 100%;
    padding: vars.$padding-xxs vars.$padding-sm;
  }
}
</style>
