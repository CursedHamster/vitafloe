<script lang="ts" setup>
import data from "../assets/data";
const contents = data?.sections;
const socials = data?.socials;
</script>
<template>
  <footer class="footer">
    <div class="title-container">
      <p>vitaem.</p>
    </div>
    <div class="details-container">
      <div class="contents">
        <RouterLink v-for="content in contents" :to="'#' + content?.id">{{
          content?.title
        }}</RouterLink>
      </div>
      <p class="c">©2023 vitaem., Inc. All rights reserved.</p>
    </div>
    <div class="socials">
      <a
        v-for="social in socials"
        class="social"
        :href="social?.url"
        :aria-label="social?.title"
        ><i class="lni" :class="[social?.icon]"></i
      ></a>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
@use "../vars";
.footer {
  background: vars.$secondary;
  width: 100%;
  display: flex;
  .title-container {
    background: vars.$text;
    color: vars.$background;
    writing-mode: vertical-rl;
    text-orientation: sideways-right;
    transform: rotate(180deg);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: vars.$padding-sm vars.$padding-xs;
    font-size: vars.$font-h0;
    line-height: 1;
    font-weight: 500;
  }
  .details-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: vars.$padding-xs vars.$padding-sm;
    gap: vars.$gap-lg;
    width: 100%;
    .contents {
      flex-grow: 1;
      width: 100%;
      box-sizing: border-box;
      display: flex;
      gap: vars.$gap-lg;
      row-gap: vars.$gap-md;
      flex-wrap: wrap;
      font-weight: 500;
      text-transform: capitalize;
      height: fit-content;
      a {
        font-size: vars.$font-h4;
        display: block;
      }
    }
  }
  .socials {
    background: vars.$text;
    display: flex;
    flex-direction: column;
    gap: vars.$gap-md;
    align-items: center;
    padding: vars.$padding-sm vars.$padding-xs;
    font-size: vars.$font-h0;
    .social {
      color: vars.$background;
      line-height: 1;
      i {
        pointer-events: none;
      }
    }
  }
}

@media screen and (min-width: vars.$breakpoint-sm) {
  .footer {
    .details-container {
      padding: vars.$padding-sm vars.$padding-md;
    }
  }
}
</style>
