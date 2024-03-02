<script lang="ts" setup>
import Button from "./Button.vue";
</script>
<template>
  <div class="error-container full-height">
    <h1 class="section-title">
        404 - Page <span class="extra">Not Found</span>
      </h1>
      <p>
        Sorry, the page you are looking for is not found. Meanwhile, you can go
        back to the home page.
      </p>
      <Button @click="$router.push('/')">Go to the home page</Button>
  </div>
</template>
<style lang="scss" scoped>
@use "../vars";
.error-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: vars.$gap-lg;
  text-align: center;
  padding: vars.$padding-md vars.$padding-lg;
  h1 {
    margin-bottom: 0;
  }
}

@media screen and (max-width: vars.$breakpoint-md) {
  .error-container {
    padding: vars.$padding-md vars.$padding-md;
  }
}

@media screen and (max-width: vars.$breakpoint-sm) {
  .error-container {
    padding: vars.$padding-md vars.$padding-sm;
  }
}
</style>
