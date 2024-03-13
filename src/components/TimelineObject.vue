<script lang="ts" setup>
interface TimelineObjectInfo {
  year: string;
  title: string;
  description: string;
  imgUrl: string;
}
defineProps<{ objectInfo: TimelineObjectInfo }>();
</script>
<template>
  <div class="timeline-object">
    <div class="dot-container">
      <div class="dot"></div>
    </div>
    <div class="timeline-image">
      <img :src="objectInfo?.imgUrl" alt="" />
    </div>
    <div class="timeline-text">
      <h4>{{ objectInfo?.year }}</h4>
      <h3>{{ objectInfo?.title }}</h3>
      <p>{{ objectInfo?.description }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "../vars";
.timeline-object {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 vars.$padding-md;
  gap: vars.$gap-lg;
  width: 100%;
  .dot-container {
    width: vars.$dot-size;
    height: vars.$dot-size;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    margin: 0 auto;
    background: vars.$background;
    border-radius: 50%;
    padding: 0.1rem;
    border: vars.$border-width solid vars.$secondary;
  }
  .dot {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background: vars.$primary;
    scale: 0;
  }
  .timeline-image {
    position: relative;
    width: 100%;
    height: 70vh;
    height: 70svh;
    flex-basis: 45%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .timeline-text {
    flex-basis: 45%;
    opacity: 0.5;
    transition: all 0.2s ease-in-out;
    h3 {
      font-size: vars.$font-h3;
      line-height: 1;
      font-weight: 400;
    }
    h4 {
      position: absolute;
      top: 0;
      right: 0;
      line-height: 1;
      font-size: 6rem;
      font-weight: 600;
      background: vars.$gradient-1;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      opacity: 0.2;
      pointer-events: none;
      z-index: -1;
    }
    p {
      font-size: vars.$font-sm;
      margin-top: vars.$padding-xs;
    }
  }

  &.active .timeline-text {
    opacity: 1;
  }
}

@media screen and (max-width: vars.$breakpoint-md) {
  .timeline-object {
    justify-content: unset;
    flex-direction: column-reverse;
    align-items: unset;
    padding-left: vars.$padding-md;
    .dot-container {
      left: calc(vars.$dot-size / -2 + vars.$line-width / 2);
      margin: 0;
    }
    .timeline-image {
      flex-basis: unset;
      height: 50vh;
      height: 50svh;
    }
    .timeline-text {
      flex-basis: unset;
    }
  }
}

@media screen and (max-width: vars.$breakpoint-sm) {
  .timeline-object {
    padding-left: vars.$padding-sm;
  }
}
</style>
