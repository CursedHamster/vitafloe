<script lang="ts" setup>
interface ReviewObjectInfo {
  name: string;
  jobTitle: string;
  description: string;
}
const props = defineProps<{ reviewInfo: ReviewObjectInfo }>();
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
  flex-shrink: 0;
  width: fit-content;
  padding: vars.$padding-xs vars.$padding-sm;
  border: 1px solid vars.$border-color;
  border-radius: vars.$border-radius-sm;
  box-shadow: vars.$border-shadow;
  background: rgb(vars.$background, .5);
  backdrop-filter: blur(5px);
  .job-title {
    line-height: 1;
    color: vars.$text-light;
    font-size: vars.$font-xs;
  }
  .description {
    margin-top: vars.$gap-sm;
  }
}
</style>
