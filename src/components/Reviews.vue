<script lang="ts" setup>
import Review from "./Review.vue";
import data from "../assets/data";
const rows = 3;
const reviews = data?.reviews;
const reviewRows: any[] = [];
const columns = Math.floor(reviews?.length / rows);

for (let index = 0; index < rows; index++) {
  reviewRows?.push(
    reviews?.slice(
      columns * index,
      index === rows - 1 ? reviews?.length : columns * (index + 1)
    )
  );
}
</script>
<template>
  <section id="testimonials">
    <h2 class="section-title">
      Our <span class="extra">Customer</span> Experiences
    </h2>
    <div class="reviews-container">
      <div class="reviews-row" v-for="reviewRow in reviewRows">
        <Review v-for="review in reviewRow" :review-info="review" />
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use "../vars";
#testimonials {
  padding: vars.$padding-md 0;
  .section-title {
    text-align: center;
    padding: 0 vars.$padding-lg;
  }
}
.reviews-container {
  padding: vars.$padding-xs 0;
  display: flex;
  flex-direction: column;
  gap: vars.$gap-lg;
  overflow-x: hidden;
}

.reviews-row {
  display: flex;
  justify-content: space-between;
  flex-flow: nowrap;
  gap: vars.$gap-lg;
  padding: 0 vars.$padding-sm;
}

@media screen and (max-width: vars.$breakpoint-md) {
  #testimonials {
    .section-title {
      padding: 0 vars.$padding-md;
    }
  }
}

@media screen and (max-width: vars.$breakpoint-sm) {
  #testimonials {
    .section-title {
      padding: 0 vars.$padding-sm;
    }
  }
}
</style>
