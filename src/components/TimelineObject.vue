<script lang="ts" setup>
interface TimelineObjectInfo {
  year: string;
  title: string;
  description: string;
  imgUrl: string;
}
const props = defineProps<{ objectInfo: TimelineObjectInfo }>();
</script>
<template>
  <div class="timeline-object">
    <div class="active-line"></div>
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
  flex-direction: column-reverse;
  padding: vars.$padding-xs 0 vars.$padding-md;
  padding-left: vars.$padding-sm;
  gap: vars.$gap-lg;
  width: 100%;
  .active-line {
    width: vars.$active-line-width;
    height: 100%;
    position: absolute;
    top: vars.$padding-xxs;
    left: 0;
    right: 0;
    background: vars.$gradient-1;
  }
  &:nth-of-type(even) .active-line {
    background: vars.$gradient-2;
  }
  .dot-container {
    width: fit-content;
    height: fit-content;
    position: absolute;
    top: 0;
    left: calc(vars.$dot-size / -2 + vars.$line-width / 2);
    right: 0;
    padding: vars.$padding-xs 0;
    background: vars.$background;
  }
  .dot {
    width: vars.$dot-size;
    height: vars.$dot-size;
    border-radius: 50%;
    outline: vars.$border-width solid vars.$secondary;
  }
  .timeline-image {
    width: 100%;
    height: 50vh;
    // border: vars.$border-width solid vars.$black;
    // box-shadow: 5px 5px 0 rgb(171, 220, 255);
    opacity: 0;
    scale: 0.8;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: vars.$border-radius-sm;
    }
  }
  .timeline-text {
    h3 {
      margin: vars.$padding-sm 0 vars.$padding-xxs;
      font-size: vars.$font-h2;
      line-height: 1;
    }
    h4 {
      font-size: vars.$font-h3;
      line-height: 1;
      opacity: 0.8;
      font-weight: 600;
      background: rgb(vars.$primary, 0.1);
      width: fit-content;
      padding: vars.$padding-xxxs vars.$padding-xxs;
      border-radius: vars.$border-radius-sm;
    }
    p {
      font-size: vars.$font-h4;
    }
  }

  &.active .timeline-text {
    h3,
    h4 {
      color: vars.$primary;
    }
  }
}

@media screen and (min-width: vars.$breakpoint-md) {
  .timeline-object {
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-start;
    padding-left: 0;
    // gap: 10rem;
    // &:nth-of-type(even) {
    //   flex-direction: row-reverse;
    // }
    .active-line {
      margin: 0 auto;
    }
    .dot-container {
      left: 0;
      margin: 0 auto;
      padding: vars.$padding-xs 0;
    }
    .timeline-image {
      height: 40vh;
      flex-basis: 45%;
      scale: 1;
    }
    .timeline-text {
      flex-basis: 45%;
    }
  }
}
</style>
