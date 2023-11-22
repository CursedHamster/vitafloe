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
    <img :src="cardInfo?.imgUrl" />
    <div>
      <h3>{{ cardInfo?.title }}</h3>
      <p>{{ cardInfo?.description }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "../vars";
.main-card-container {
  max-width: 80%;
  max-height: 70vh;
  aspect-ratio: 3/5;
  background: vars.$background;
  border: 1px solid vars.$border-color;
  padding: vars.$padding-xxs;
  border-radius: vars.$border-radius-md;
  img {
    width: 100%;
    aspect-ratio: 5/4;
    object-fit: cover;
    border-radius: vars.$border-radius-md vars.$border-radius-md
      vars.$border-radius-xs vars.$border-radius-xs;
  }
  div {
    padding: vars.$padding-sm vars.$padding-xxs;
    h3 {
      font-size: vars.$font-h3;
      line-height: 1.25;
      margin-bottom: vars.$padding-xs;
    }
  }
}

@media screen and (min-width: vars.$breakpoint-sm) {
  .main-card-container {
    max-width: 100%;
  }
}

@media screen and (max-height: vars.$breakpoint-w-md) {
  .main-card-container {
    img {
      aspect-ratio: 1/1;
    }
    div {
      padding: vars.$padding-xs vars.$padding-xxs;
      h3 {
        margin-bottom: vars.$padding-xxs;
      }
      p {
        font-size: vars.$font-sm;
      }
    }
  }
}
</style>
