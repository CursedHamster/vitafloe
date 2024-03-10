<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
// import Hero from "./Hero.vue";
import Main from "./Main.vue";
import Timeline from "./Timeline.vue";
import Numbers from "./Numbers.vue";
import Reviews from "./Reviews.vue";
import Advert from "./Advert.vue";
import Join from "./Join.vue";
// import vars from "../_vars.module.scss";

// let windowHeight: number;
let ctx: gsap.Context;

function resize() {
  // resizeMain();
}

// function resizeMain() {
//   windowHeight = window?.innerHeight;
//   const scrollT = ScrollTrigger?.getById("main");
//   scrollT?.disable(true, true);
//   scrollT?.refresh();
//   scrollT?.enable(true, true);
// }

function addMainAnimation() {
  const mainCards: any[] = gsap.utils.toArray(".main-card");

  // resizeMain();

  ScrollTrigger?.create({
    id: "main",
    trigger: ".main-container",
    start: () => document.querySelector(".main-container")?.clientTop + " top",
    end: () => `+=${mainCards?.length * window.innerHeight} top`,
    pin: ".main-container",
    invalidateOnRefresh: true,
  });

  gsap.fromTo(
    mainCards[0],
    { scale: 0 },
    {
      scale: 1,
      scrollTrigger: {
        trigger: ".main-container",
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,
      },
    }
  );

  mainCards?.forEach((mainCard, i) => {
    if (i > 0) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".pin-spacer-main",
            start: () => "+=" + (i - 1) * window?.innerHeight,
            end: () => "+=" + window?.innerHeight,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })
        .fromTo(
          mainCard,
          {
            xPercent: 100,
            yPercent: -100,
            // filter: "blur(2px)",
            autoAlpha: 0,
          },
          {
            xPercent: 2 * i,
            yPercent: -2 * i,
            // filter: "blur(0px)",
            autoAlpha: 1,
            duration: 2,
          }
        );
      // .to(mainCards[i - 1], {
      //   filter: `blur(${3 / i}px)`,
      //   autoAlpha: 0.3 + 0.2 * i,
      //   duration: 0.1,
      // });
    }
  });
}

// function addTimelineAnimation() {
//   const objects: gsap.DOMTarget[] = gsap.utils.toArray(".timeline-object");
//   // ScrollTrigger?.create({
//   //   id: "timeline_line",
//   //   trigger: ".line",
//   //   start: "top center",
//   //   end: "bottom center",
//   //   pin: ".dot-character",
//   //   pinSpacing: false,
//   //   invalidateOnRefresh: true,
//   // });

//   gsap
//     .timeline({
//       defaults: {
//         duration: 1,
//       },
//       scrollTrigger: {
//         id: "timeline_line",
//         trigger: ".line",
//         start: "top center",
//         end: "bottom center",
//         scrub: true,
//         invalidateOnRefresh: true,
//       },
//     })
//     .fromTo(
//       ".active-line",
//       { scaleY: 0 },
//       { scaleY: 1, ease: "none", duration: 1 },
//       0
//     )
//     .to(
//       ".dot-character",
//       {
//         y: document.querySelector(".line")?.clientHeight,
//         ease: "none",
//         duration: 1,
//       },
//       0
//     );

//   // gsap.from(".active-line", {
//   //   scrollTrigger: {
//   //     id: "timeline_line",
//   //     trigger: ".line",
//   //     start: () => "top center",
//   //     end: () => "bottom center",
//   //     pin: ".dot-character",
//   //     pinSpacing: false,
//   //     scrub: 0,
//   //     invalidateOnRefresh: true,
//   //   },
//   //   scaleY: 0,
//   //   ease: "none",
//   // });

//   objects?.forEach((object: gsap.DOMTarget) => {
//     const objectSelector = gsap.utils.selector(object);
//     gsap
//       .timeline({
//         scrollTrigger: {
//           trigger: object,
//           start: () => "top center",
//           end: () => "bottom center",
//           toggleActions: "play none none reset",
//           toggleClass: "active",
//           invalidateOnRefresh: true,
//         },
//       })
//       .to(objectSelector(".dot-container"), {
//         borderColor: vars?.primary,
//         duration: 0.2,
//       })
//       .fromTo(
//         objectSelector(".dot"),
//         { scale: 0 },
//         {
//           scale: 1,
//           duration: 0.2,
//         },
//         0
//       );

//     gsap
//       .timeline({
//         scrollTrigger: {
//           trigger: object,
//           start: () => "top center",
//           end: () => "center center",
//           scrub: 1,
//           invalidateOnRefresh: true,
//         },
//       })
//       .fromTo(
//         objectSelector(".timeline-image>img"),
//         {
//           autoAlpha: 0,
//           scale: 1.1,
//         },
//         {
//           autoAlpha: 1,
//           scale: 1,
//           duration: 0.5,
//         }
//       );

//     // gsap.fromTo(
//     //   objectSelector(".active-line"),
//     //   { scaleY: 0 },
//     //   {
//     //     scrollTrigger: {
//     //       trigger: object,
//     //       start: "top center",
//     //       end: "bottom center",
//     //       scrub: 0.1,
//     //       invalidateOnRefresh: true,
//     //     },
//     //     scaleY: 1,
//     //     transformOrigin: "top center",
//     //     ease: "none",
//     //   }
//     // );
//   });
// }

function addNumbersAnimation() {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".numbers-container",
        start: "top 80%",
        end: "bottom 80%",
        toggleActions: "restart none none none",
      },
    })
    .from(".number-title", {
      innerText: 0,
      snap: {
        innerText: 1,
      },
      stagger: 0.1,
    });
}

// function addReviewsAnimation() {
//   const reviewObjects: any[] = gsap.utils.toArray(".reviews-row");
//   const reviewsContainer: Element | null =
//     document.querySelector(".reviews-container");

//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: ".reviews-container",
//       start: () => "bottom bottom",
//       end: () => "+=" + reviewObjects[reviewObjects?.length - 1].scrollWidth,
//       invalidateOnRefresh: true,
//       scrub: 1,
//       pin: ".numbers-and-reviews",
//     },
//   });

//   reviewObjects?.forEach((object) => {
//     tl?.to(
//       object,
//       {
//         x: () => getScrollWidth(object?.scrollWidth),
//       },
//       0
//     );
//   });

//   const resizeObserver = new ResizeObserver(() => tl?.scrollTrigger?.refresh());

//   if (reviewsContainer) {
//     resizeObserver.observe(reviewsContainer);
//   }

//   function getScrollWidth(width: number) {
//     const containerWidth: number =
//       document.querySelector(".reviews-container")?.clientWidth || 100;
//     const rowWidth: Element | null = document.querySelector(".reviews-row");
//     return (
//       -width +
//       containerWidth -
//       (rowWidth ? parseFloat(getComputedStyle(rowWidth)?.paddingRight) : 0)
//     );
//   }
// }

function addAdvertAnimation() {
  gsap.set(".phone", { rotate: -10 });
  gsap.from(".pros-item", {
    scrollTrigger: {
      trigger: ".pros-list",
      start: "top bottom",
      end: "bottom bottom",
    },
    opacity: 0,
    x: -50,
    duration: 0.3,
    stagger: 0.2,
  });
}

function addJoinAnimation() {
  ScrollTrigger?.create({
    trigger: "#join",
    start: "50% bottom",
    end: "100% bottom",
    onEnter: () => flipPhone(true),
    onLeaveBack: () => flipPhone(false),
  });

  function flipPhone(isJoin: boolean) {
    Flip?.fit(".phone", isJoin ? ".phone-image-container" : ".phone-image", {
      simple: true,
      rotate: isJoin ? 0 : -10,
      duration: 0.5,
      ease: "power1.inOut",
    });
  }
}

function addFooterAnimation() {
  gsap.fromTo(
    ".header",
    { autoAlpha: 1 },
    {
      scrollTrigger: {
        trigger: ".footer",
        start: () => "0% bottom",
        end: "bottom bottom",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
      autoAlpha: 0,
      duration: 0.2,
    }
  );
}

onMounted(() => {
  gsap?.registerPlugin(ScrollTrigger, Flip);
  ctx = gsap.context(() => {
    addMainAnimation();
    // addTimelineAnimation();
    addNumbersAnimation();
    // addReviewsAnimation();
    addAdvertAnimation();
    addJoinAnimation();
    addFooterAnimation();
  });
  window.addEventListener("resize", resize);
});

onUnmounted(() => {
  ctx?.revert();
  window.removeEventListener("resize", resize);
});
</script>

<template>
  <!-- <Hero /> -->
  <Main />
  <Timeline />
  <div class="full-height numbers-and-reviews">
    <Numbers />
    <Reviews />
  </div>
  <div class="full-height advert-and-join">
    <Advert />
    <Join />
  </div>
</template>

<style lang="scss" scoped>
@use "../vars";
.numbers-and-reviews {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: vars.$padding-md 0;
}
</style>
