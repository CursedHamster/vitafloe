<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import Hero from "./Hero.vue";
import Main from "./Main.vue";
import Timeline from "./Timeline.vue";
import Numbers from "./Numbers.vue";
import Reviews from "./Reviews.vue";
import Advert from "./Advert.vue";
import Join from "./Join.vue";
import vars from "../_vars.module.scss";

let mm = gsap.matchMedia();
let ctx: gsap.Context;

function resize() {
  ScrollTrigger.refresh();
}

function addHeaderAnimation() {
  mm.add(
    { isDesktop: `(min-width: ${vars?.breakpointMd})` },
    ({ conditions }) => {
      const isDesktop: any = conditions?.isDesktop;
      gsap
        .timeline({
          scrollTrigger: {
            id: "hero_header",
            trigger: "body",
            start: () => window.innerHeight,
            end: () => "+=" + window.innerHeight,
            toggleActions: "play none none reverse",
          },
        })
        .from(
          ".header .nav",
          {
            yPercent: isDesktop ? -100 : 0,
            autoAlpha: isDesktop ? 0 : 1,
            duration: isDesktop ? 0.3 : 0,
          },
          0
        )
        .from(".header", {
          background: "transparent",
          borderBottomColor: "transparent",
          // boxShadow: "none",
          duration: isDesktop ? 0.2 : 0,
        });
    }
  );
}

function addHeroAnimation(object: any) {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".hero-container",
        start: "5% start",
        end: "bottom start",
        scrub: 1,
      },
    })
    .fromTo(
      ".hero-text-animation .extra",
      {},
      {
        yPercent: -50,
        // rotateZ: -5,
        duration: 0.2,
        // stagger: 0.05,
      }
    )
    .fromTo("#pill_container", {}, { autoAlpha: 0.2 }, 0)
    .fromTo(object?.position, {}, { x: -3, y: 1 }, 0)
    .fromTo(object?.rotation, {}, { z: -0.8}, 0);

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".timeline-section",
        start: "-100% start",
        end: "0% start",
        scrub: 1,
      },
    })
    .fromTo("#pill_container", {}, { autoAlpha: 0 }, 0)
    .fromTo(object?.position, {}, { x: 0, z: 1 }, 0)
    // .fromTo(object?.rotation, {}, { x: -2, z: -2 }, 0);

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".numbers-container",
        start: "start center",
        end: "bottom center",
        scrub: 1,
      },
    })
    .fromTo("#pill_container", {}, { autoAlpha: 0.5 }, 0)
    .fromTo(object?.position, {}, { y: 0, z: 0 }, 0)
    .fromTo(object?.rotation, {}, { x: 2, z: -3 }, 0);

  gsap
    .timeline({
      scrollTrigger: {
        trigger: "#advert",
        start: "start center",
        end: "bottom center",
        scrub: 1,
      },
    })
    .fromTo("#pill_container", {}, { autoAlpha: 0.2 }, 0)
    .fromTo(object?.position, {}, { x: -3, y: 1 }, 0)
    .fromTo(object?.rotation, {}, { y: -5.5 }, 0);
}

function addMainAnimation() {
  const mainCards: any[] = gsap.utils.toArray(".main-card");

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

function addTimelineAnimation() {
  const objects: gsap.DOMTarget[] = gsap.utils.toArray(".timeline-object");

  gsap
    .timeline({
      defaults: {
        duration: 1,
      },
      scrollTrigger: {
        id: "timeline_line",
        trigger: ".line",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })
    .fromTo(
      ".active-line",
      { scaleY: 0 },
      { scaleY: 1, ease: "none", duration: 1 },
      0
    )
    .to(
      ".dot-character",
      {
        y: <gsap.TweenValue>(
          (() => document.querySelector(".line")?.clientHeight)
        ),
        ease: "none",
        duration: 1,
      },
      0
    );

  objects?.forEach((object: gsap.DOMTarget) => {
    const objectSelector = gsap.utils.selector(object);
    gsap.timeline({
      scrollTrigger: {
        trigger: object,
        start: () => "top center",
        end: () => "bottom center",
        toggleClass: "active",
        invalidateOnRefresh: true,
      },
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: object,
          start: () => "top center",
          end: () => "center center",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
      .fromTo(
        objectSelector(".timeline-image>img"),
        {
          autoAlpha: 0,
          scale: 1.1,
        },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.5,
        }
      )
      .to(
        objectSelector(".dot-container"),
        {
          borderColor: vars?.primary,
          duration: 0.2,
        },
        0
      )
      .fromTo(
        objectSelector(".dot"),
        { scale: 0 },
        {
          scale: 1,
          duration: 0.2,
        },
        0
      );
  });
}

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

function addReviewsAnimation() {
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
      // markers: true,
    },
  });

  reviewObjects?.forEach((object) => {
    tl?.to(
      object,
      {
        x: () => getScrollWidth(object?.scrollWidth),
      },
      0
    );
  });

  const resizeObserver = new ResizeObserver(() => tl?.scrollTrigger?.refresh());

  if (reviewsContainer) {
    resizeObserver.observe(reviewsContainer);
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
}

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
  ScrollTrigger.normalizeScroll(true);
  ctx = gsap.context(() => {
    addHeaderAnimation();
    addMainAnimation();
    addTimelineAnimation();
    addNumbersAnimation();
    addReviewsAnimation();
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
  <Hero @add-hero-animation="addHeroAnimation" />
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
