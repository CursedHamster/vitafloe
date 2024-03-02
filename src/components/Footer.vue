<script lang="ts" setup>
import Button from "./Button.vue";
import data from "../assets/data";
const contents = data?.sections;
const socials = data?.socials;
</script>
<template>
  <footer class="footer">
    <div class="title-container">
      <h2>vitaem</h2>
      <div class="btn-container">
        <Button button-size="lg" @click="$router.push('#join')">Join</Button>
        <div class="socials">
          <a
            v-for="social in socials"
            class="social"
            :href="social?.url"
            :aria-label="social?.title"
            ><i class="ti" :class="[social?.icon]"></i
          ></a>
        </div>
      </div>
    </div>
    <div class="contents">
      <RouterLink v-for="content in contents" :to="'#' + content?.id">{{
        content?.title
      }}</RouterLink>
    </div>
    <p class="c">©2023 vitaem., Inc. All rights reserved.</p>
  </footer>
</template>
<style lang="scss" scoped>
@use "../vars";
.footer {
  background: vars.$background;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: vars.$gap-lg;
  padding: vars.$padding-sm vars.$padding-lg;
  .title-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: vars.$gap-lg;
    flex-wrap: wrap;
    h2 {
      font-size: vars.$font-h1;
      line-height: 1;
      font-weight: 300;
    }
    .btn-container {
      display: flex;
      align-items: center;
      gap: vars.$gap-md;
      flex-wrap: wrap-reverse;
      .btn {
        width: fit-content;
        flex: 1;
        margin-right: vars.$padding-sm;
      }
    }
  }
  .contents {
    flex-grow: 1;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    gap: vars.$gap-lg;
    row-gap: vars.$gap-lg;
    flex-wrap: wrap;
    text-transform: capitalize;
    height: fit-content;
  }
  .socials {
    display: flex;
    gap: vars.$gap-md;
    justify-content: center;
    align-items: center;
    font-size: vars.$font-h3;
    .social {
      width: 3rem;
      height: 3rem;
      color: vars.$background;
      background: vars.$text;
      line-height: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      i {
        pointer-events: none;
      }
    }
  }
  .c {
    color: vars.$text-light;
    font-size: vars.$font-xs;
  }
}

@media screen and (max-width: vars.$breakpoint-md) {
  .footer {
    padding: vars.$padding-sm vars.$padding-md;
    border: none;
  }
}

@media screen and (max-width: vars.$breakpoint-sm) {
  .footer {
    padding: vars.$padding-sm;
    .title-container {
      .btn-container {
        gap: vars.$gap-lg;
        .btn {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
