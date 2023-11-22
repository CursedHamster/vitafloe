import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import Lenis from "@studio-freight/lenis";
import "./style.scss";
import App from "./App.vue";
import Home from "./components/Home.vue";
import { setLoading } from "./loadingState";

const app = createApp(App);

const lenis = new Lenis({
  duration: 2,
  smoothWheel: true,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time: any) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const routes = [
  { path: "/", name: "home", component: Home },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("./components/Error.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from) {
    if (to.path === from.path && to.hash) {
      lenis.scrollTo(to?.hash, {
        offset: to?.hash === "advert" || "timeline" ? -200 : 0,
        duration: 5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        immediate: false,
      });
    }
  },
});
router.beforeEach((to, from, next) => {
  if (to?.path !== from?.path) {
    setLoading(true);
  }
  next();
});
router.afterEach(() => {
  setTimeout(() => {
    setLoading(false);
  }, 2000);
});
app.use(router);
app.mount("#app");
