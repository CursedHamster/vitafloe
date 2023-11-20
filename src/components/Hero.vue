<script lang="ts" setup>
import { onMounted, onUnmounted } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

const handRange = 50;
let scene: any,
  camera: any,
  renderer: any,
  controls: any,
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

function addHeroAnimation() {
  gsap.fromTo(
    ".header",
    { autoAlpha: 0 },
    {
      scrollTrigger: {
        trigger: "body",
        start: () => "+=" + window.innerHeight,
        toggleActions: "play none none reverse",
      },
      autoAlpha: 1,
      duration: 0.2,
    }
  );
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".hero-container",
        start: "5% start",
        end: "center start",
        scrub: 1,
      },
    })
    .fromTo(
      ".hero-text-animation",
      {},
      {
        scale: 4,
        translateX: "-200%",
        translateY: "100vh",
        opacity: 0,
        duration: 0.2,
        stagger: 0.1,
      }
    )
    .fromTo("#pill_container", {}, { duration: 0.3, autoAlpha: 0 }, 0)
    .fromTo(object?.rotation, {}, { x: 2, y: 2, duration: 0.3 }, 0)
    .fromTo(object?.position, {}, { x: 5, duration: 0.3 }, 0);

  gsap.fromTo(
    ".hand-grab",
    {},
    {
      motionPath: {
        path: [
          { x: 0, y: 0 },
          { x: -0.8 * handRange, y: 0.2 * handRange },
          { x: -1.8 * handRange, y: 1.2 * handRange },
          { x: -2 * handRange, y: 2 * handRange },
        ],
        type: "cubic",
      },
      opacity: 0,
      duration: 1,
      repeat: 2,
      repeatDelay: 0.2,
      delay: 2,
    }
  );
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  canvasContainer = document.getElementById("pill_canvas");
  canvasSize = document.getElementById("pill_container");
  aspect = () => canvasSize?.offsetWidth / canvasSize?.offsetHeight;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, aspect(), 0.1, 1000);

  const loader = new GLTFLoader();
  loader.load(
    "/pill/scene.glb",
    (gltf: any) => {
      object = gltf.scene;
      scene.add(object);
      addHeroAnimation();
    },
    (xhr: any) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error: any) => {
      console.error(error);
    }
  );
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    canvas: canvasContainer,
  });
  renderer.setSize(canvasSize?.offsetWidth, canvasSize?.offsetHeight);
  canvasSize?.appendChild(renderer?.domElement);
  camera.position.set(3, -3, 4);

  controls = new OrbitControls(camera, renderer?.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.autoRotate = true;
  controls.addEventListener("change", render);

  const topLight = new THREE.DirectionalLight(0xfff1f5, 3);
  topLight.position.set(20, 20, 20);
  topLight.castShadow = true;
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
  controls.removeEventListener("change", render);
});
</script>
<template>
  <section id="home" class="hero-container">
    <div class="text">
      <h1 class="hero-text-animation">vitaem.</h1>
      <p class="hero-text-animation">
        Vitamins Reasearch Center open for sponsorship and pre-orders
      </p>
    </div>
    <div id="pill_container">
      <canvas id="pill_canvas"></canvas>
    </div>
    <div class="bottom-link">
      <RouterLink to="#join"
        ><p>Join Us</p>
        <i class="lni lni-arrow-down"></i
      ></RouterLink>
    </div>
    <i class="hand-grab lni lni-hand"></i>
  </section>
</template>
<style scoped lang="scss">
@use "../vars";
.hero-container {
  padding: vars.$padding-sm;
  height: 100vh;
  position: relative;
  h1 {
    width: fit-content;
    padding: vars.$padding-xxs vars.$padding-xs;
    margin-bottom: vars.$gap-md;
    line-height: 1;
    color: vars.$background;
    background: vars.$text;
    border-radius: vars.$border-radius-sm;
  }
  .text {
    margin-top: 5vh;
    font-size: vars.$font-h3;
    max-width: 100%;
  }

  .hand-grab {
    position: absolute;
    right: 0;
    bottom: 50%;
    font-size: vars.$font-ult;
    opacity: 0.8;
    z-index: 10;
  }
}
#pill_container {
  display: block;
  position: fixed;
  width: 150%;
  height: 120%;
  bottom: -20%;
  left: 0;
  z-index: 1;
  &:active {
    cursor: grabbing;
  }
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
    font-weight: 500;
    font-size: vars.$font-h3;
    transition: all 0.2s ease-in-out;
    p {
      position: relative;
      line-height: 1;
      &::after {
        content: "";
        position: absolute;
        bottom: - vars.$gap-sm;
        left: 0;
        right: 0;
        width: 100%;
        height: vars.$gap-sm;
        background: vars.$gradient-3;
        border-radius: vars.$border-radius-xs;
        opacity: 0.3;
        z-index: -1;
        transition: all 0.2s ease-in-out;
      }
    }
    &:hover {
      gap: calc(vars.$gap-md + vars.$gap-sm);
      padding-bottom: calc(vars.$padding-xs - vars.$gap-xxs);
      p::after {
        bottom: 0;
      }
    }
  }
}

@media screen and (min-width: vars.$breakpoint-sm) {
  .hero-container {
    padding: vars.$padding-md;
    .text {
      font-size: vars.$font-h1;
    }
  }
  .bottom-link {
    a {
      font-size: vars.$font-h1;
    }
  }
}

@media screen and (min-width: vars.$breakpoint-md) {
  .hero-container {
    padding: vars.$padding-lg;
    .text {
      max-width: 50vw;
    }
  }
}

@media screen and (min-width: vars.$breakpoint-md) and (max-height: vars.$breakpoint-w-md) {
  .hero-container {
    padding: vars.$padding-md vars.$padding-lg;
  }
}
</style>
