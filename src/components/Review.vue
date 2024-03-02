<script lang="ts" setup>
interface ReviewObjectInfo {
  name: string;
  jobTitle: string;
  description: string;
}
defineProps<{ reviewInfo: ReviewObjectInfo }>();
</script>
<template>
  <div class="review-container">
    <h4>{{ reviewInfo?.name }}</h4>
    <p class="job-title">{{ reviewInfo?.jobTitle }}</p>
    <p class="description">{{ reviewInfo?.description }}</p>
  </div>
</template>
<style lang="scss" scoped>
@use "../vars";
.review-container {
  position: relative;
  flex-shrink: 0;
  width: fit-content;
  padding: vars.$padding-sm vars.$padding-sm;
  background: vars.$background;
  border: vars.$border-width solid vars.$text;
  box-shadow: vars.$gradient-shadow;
  border-radius: vars.$border-radius-md;
  font-size: vars.$font-xs;
  h4 {
    font-weight: 700;
  }
  .job-title {
    position: absolute;
    top: -1em;
    right: 2rem;
    line-height: 1;
    padding: vars.$padding-xxs vars.$padding-xs;
    color: vars.$background;
    background: vars.$text;
    border-radius: vars.$border-radius-lg;
    font-size: vars.$font-xs;
  }
  .description {
    margin-top: vars.$gap-xxs;
  }
}
</style>
