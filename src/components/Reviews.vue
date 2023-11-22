<script lang="ts" setup>
import { onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
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

function getScrollWidth(width: number) {
  const containerWidth: number =
    document.querySelector(".reviews-container")?.clientWidth || 100;
  const rowWidth: Element | null = document.querySelector(".reviews-row");
  return (
    -width +
    containerWidth -
    (rowWidth ? parseFloat(getComputedStyle(rowWidth)?.paddingRight) : 0)
  );
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  const reviewObjects: any[] = gsap.utils.toArray(".reviews-row");
  const reviewsContainer: Element | null =
    document.querySelector(".reviews-container");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".reviews-container",
      start: () => "bottom bottom",
      end: () => "+=" + reviewObjects[reviewObjects?.length - 1].scrollWidth,
      invalidateOnRefresh: true,
      scrub: 1,
      pin: ".numbers-and-reviews",
    },
  });

  reviewObjects?.forEach((object) => {
    tl?.fromTo(
      object,
      {},
      {
        x: () => getScrollWidth(object?.scrollWidth),
      },
      0
    );
  });

  const resizeObserver = new ResizeObserver(() => tl.scrollTrigger?.refresh());

  if (reviewsContainer) {
    resizeObserver.observe(reviewsContainer);
  }
});
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
    padding: 0 vars.$padding-sm;
  }
}
.reviews-container {
  padding: vars.$padding-xs 0;
  display: flex;
  flex-direction: column;
  gap: vars.$gap-md;
  overflow-x: hidden;
}

.reviews-row {
  display: flex;
  justify-content: space-between;
  flex-flow: nowrap;
  gap: vars.$gap-md;
  padding: 0 vars.$padding-xs;
}

@media screen and (min-width: vars.$breakpoint-sm) {
  #testimonials {
    .section-title {
      padding: 0 vars.$padding-md;
    }
  }
}

@media screen and (min-width: vars.$breakpoint-md) {
  #testimonials {
    .section-title {
      padding: 0 vars.$padding-lg;
    }
  }
}
</style>
