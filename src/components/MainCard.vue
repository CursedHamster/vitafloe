<script lang="ts" setup>
interface MainCardInfo {
  title: string;
  description: string;
  imgUrl: string;
}
defineProps<{ cardInfo: MainCardInfo }>();
</script>
<template>
  <div class="main-card-container">
    <div class="image">
      <img :src="cardInfo?.imgUrl" />
    </div>
    <div class="text">
      <h3>{{ cardInfo?.title }}</h3>
      <p>{{ cardInfo?.description }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "../vars";
.main-card-container {
  position: relative;
  width: 80%;
  max-width: 500px;
  height: 70svh;
  background: vars.$background;
  padding: vars.$padding-sm;
  border-radius: vars.$border-radius-lg;
  box-shadow: vars.$gradient-shadow;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: vars.$border-radius-lg;
  }
  .image {
    position: relative;
    width: 100%;
    height: 50%;
    overflow: hidden;
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      box-shadow: inset 0px -2.5rem 3rem #ffffff, inset 0px -1rem 1rem #ffffff;
      border-radius: vars.$border-radius-lg;
    }
  }
  .text {
    padding: 0 vars.$padding-xs;
    text-align: center;
    transform: translateY(-(vars.$padding-xs));
    h3 {
      font-size: vars.$font-h3;
      line-height: 1;
      margin-bottom: vars.$padding-xs;
      font-weight: 400;
    }
    p {
      font-size: vars.$font-sm;
    }
  }
  &::before {
    content: "";
    position: absolute;
    width: calc(100% + vars.$border-width * 2);
    height: calc(100% + vars.$border-width * 2);
    top: -(vars.$border-width);
    left: -(vars.$border-width);
    background: vars.$gradient-2;
    border-radius: vars.$border-radius-lg;
    z-index: -1;
  }
}

@media screen and (max-width: vars.$breakpoint-sm) {
  .main-card-container {
    padding: vars.$padding-xs;
    border-radius: vars.$border-radius-md;
    .image {
      border-radius: vars.$border-radius-md;
      height: 40%;
      img {
        border-radius: vars.$border-radius-md;
      }
      &::after {
        border-radius: vars.$border-radius-md;
      }
    }
    .text {
      padding: vars.$padding-xs vars.$padding-xxs;
      p {
        font-size: 1em;
      }
    }
    &::before {
      border-radius: vars.$border-radius-md;
    }
  }
}

@media screen and (max-height: vars.$breakpoint-h-md) {
  .main-card-container {
    .image {
      height: 40%;
      &::after {
        box-shadow: inset 0px -1.5rem 2rem #ffffff,
          inset 0px -0.5rem 0.5rem #ffffff;
      }
    }
    .text {
      font-size: vars.$font-sm;
    }
  }
}

@media screen and (max-width: vars.$breakpoint-xs) {
  .main-card-container {
    padding: vars.$padding-xxs;
    .text {
      font-size: vars.$font-xs;
      p {
        font-size: vars.$font-sm;
      }
    }
  }
}
</style>
