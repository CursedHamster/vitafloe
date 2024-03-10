<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import vars from "../_vars.module.scss";

let mm = gsap.matchMedia();

let scene: any,
  camera: any,
  renderer: any,
  canvasContainer: any,
  canvasSize: any,
  aspect: Function;
let object: any = null;

function render() {
  renderer?.render(scene, camera);
}

function updateObject() {
  camera.aspect = aspect();
  camera?.updateProjectionMatrix();
  renderer?.setSize(canvasSize?.offsetWidth, canvasSize?.offsetHeight);
}

// function addHeroAnimation() {
//   mm.add(
//     { isDesktop: `(min-width: ${vars?.breakpointMd})` },
//     ({ conditions }) => {
//       const isDesktop: any = conditions?.isDesktop;
//       const heroHeaderAnimation = gsap.timeline({
//         scrollTrigger: {
//           id: "hero_header",
//           trigger: "body",
//           start: () => window.innerHeight,
//           end: () => "+=" + window.innerHeight,
//           toggleActions: "play none none reverse",
//           invalidateOnRefresh: true,
//         },
//       });
//       heroHeaderAnimation
//         .fromTo(
//           ".header .nav",
//           { yPercent: isDesktop ? -100 : 0, autoAlpha: isDesktop ? 0 : 1 },
//           { yPercent: 0, autoAlpha: 1, duration: isDesktop ? 0.3 : 0 },
//           0
//         )
//         .fromTo(
//           ".header",
//           { background: "transparent" },
//           {
//             background: isDesktop ? vars?.background : "transparent",
//             duration: isDesktop ? 0.2 : 0,
//           }
//         );
//     }
//   );

//   gsap
//     .timeline({
//       scrollTrigger: {
//         trigger: ".hero-container",
//         start: "5% start",
//         end: "bottom start",
//         scrub: 1,
//       },
//     })
//     .fromTo(
//       ".hero-text-animation .extra",
//       {},
//       {
//         y: -20,
//         rotateZ: -5,
//         duration: 0.2,
//         stagger: 0.05,
//       }
//     )
//     .fromTo("#pill_container", {}, { autoAlpha: 0.2 }, 0)
//     .fromTo(camera?.position, {}, { x: 4, y: -3, z: -1 }, 0)
//     .fromTo(object?.rotation, {}, { x: -1, y: 1.5 }, 0);

//   gsap
//     .timeline({
//       scrollTrigger: {
//         trigger: ".timeline-section",
//         start: "-100% start",
//         end: "0% start",
//         scrub: 1,
//       },
//     })
//     .fromTo("#pill_container", {}, { autoAlpha: 0 }, 0)
//     .fromTo(camera?.position, {}, { x: 4, y: -2, z: 1 }, 0)
//     .fromTo(object?.rotation, {}, { x: 1, y: 2 }, 0);
//   gsap
//     .timeline({
//       scrollTrigger: {
//         trigger: ".numbers-container",
//         start: "start center",
//         end: "bottom center",
//         scrub: 1,
//       },
//     })
//     .fromTo("#pill_container", {}, { autoAlpha: 0.5 }, 0)
//     .fromTo(camera?.position, {}, { x: 3, y: -3, z: 2 }, 0)
//     .fromTo(object?.position, {}, { x: 3, y: -1, z: -1 }, 0)
//     .fromTo(object?.rotation, {}, { x: 0.5, y: 1, z: 0.5 }, 0);
//   gsap
//     .timeline({
//       scrollTrigger: {
//         trigger: "#advert",
//         start: "start center",
//         end: "bottom center",
//         scrub: 1,
//       },
//     })
//     .fromTo("#pill_container", {}, { autoAlpha: 0.2 }, 0)
//     .fromTo(object?.position, {}, { x: 2, y: -1, z: 2 }, 0)
//     .fromTo(object?.rotation, {}, { x: 0.5, y: 0.5, z: 0.5 }, 0);
// }

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  canvasContainer = document.getElementById("pill_canvas");
  canvasSize = document.getElementById("pill_container");
  aspect = () => canvasSize?.offsetWidth / canvasSize?.offsetHeight;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, aspect(), 0.1, 1000);

  const loader = new GLTFLoader();
  loader.load("/pill/scene.glb", (gltf: any) => {
    object = gltf.scene;
    // object.position.set(1, 0.5, -4);
    object.rotation.set(0, -6, 1.1)
    scene.add(object);
    // addHeroAnimation();
  });
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: canvasContainer,
  });
  renderer.setSize(canvasSize?.offsetWidth, canvasSize?.offsetHeight);
  canvasSize?.appendChild(renderer?.domElement);
  // camera.position.set(3, -3, 2);
  camera.position.set(-1, 0.5, 2.5);

  const topLight = new THREE.DirectionalLight(0xfff1f5, 3);
  topLight.position.set(20, 20, 50);
  scene.add(topLight);

  const pointLightA = new THREE.PointLight(0x0c58d1, 10);
  pointLightA.position.set(-2, -2, -3);
  scene.add(pointLightA);

  const pointLightB = new THREE.PointLight(0x0c58d1, 10);
  pointLightB.position.set(2, 2, 3);
  scene.add(pointLightB);

  window.addEventListener("resize", updateObject);
  animate();

  function animate() {
    requestAnimationFrame(animate);
    render();
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", updateObject);
});
</script>
<template>
  <section id="home" class="hero-container">
    <h1 class="text hero-text-animation">
      Vitamins Reasearch Center open for
      <span class="extra">sponsorship</span> and
      <span class="extra">pre-orders</span>
    </h1>
    <div id="pill_container">
      <canvas id="pill_canvas"></canvas>
    </div>
    <div class="white-screen"></div>
    <div class="bottom-link">
      <RouterLink to="#join"
        ><p>Join Us</p>
        <i class="ti ti-arrow-narrow-down"></i
      ></RouterLink>
    </div>
  </section>
</template>
<style scoped lang="scss">
@use "../vars";
.hero-container {
  padding: 0 vars.$padding-lg;
  width: 100%;
  height: 100vh;
  position: relative;
  h1.text {
    padding-top: 15vh;
    max-width: 70vw;
    font-size: vars.$font-h1;
    font-weight: 400;
    position: relative;
    z-index: 1;
  }
}
#pill_container {
  display: block;
  position: fixed;
  width: 100vw;
  height: 100vh;
  opacity: 0.5;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
}

.white-screen {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  backdrop-filter: blur(7.5px);
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  bottom: -50%;
  z-index: -1;
}

.bottom-link {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  width: fit-content;
  z-index: 5;
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: vars.$padding-xs 0;
    gap: vars.$gap-md;
    font-size: vars.$font-h3;
    transition: all 0.2s ease-in-out;
    p {
      position: relative;
      line-height: 1;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 40%;
        background: vars.$gradient-3;
        opacity: 0.5;
        z-index: -1;
        transition: all 0.2s ease-in-out;
      }
    }
    &:hover {
      gap: calc(vars.$gap-md + vars.$gap-sm);
      p::after {
        height: 100%;
        scale: 1.5;
        border-radius: vars.$border-radius-md;
      }
    }
  }
}

@media screen and (max-width: vars.$breakpoint-md) {
  .hero-container {
    padding: 0 vars.$padding-md;
    h1.text {
      font-size: vars.$font-h2;
    }
  }
}

@media screen and (max-width: vars.$breakpoint-sm) {
  .hero-container {
    padding: 0 vars.$padding-sm;
    h1.text {
      font-size: vars.$font-h3;
    }
  }
}
</style>
