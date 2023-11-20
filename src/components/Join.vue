<script lang="ts" setup>
import { reactive, onMounted, onUnmounted, watch } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import data from "../assets/data";
import Button from "./Button.vue";
import Joined from "./Joined.vue";
const qualities = data?.join?.qualities;
const state = reactive({
  formData: {
    email: "",
    consent: false,
  },
  invalidEmail: false,
  joined: false,
});
var phoneTimeline: any;
function resetFormData() {
  state.formData = { email: "", consent: false };
}
function changeJoined(val: boolean) {
  state.joined = val;
}
function validateEmail(email: string) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}
watch(
  () => state.formData.email,
  (val) => {
    if (state.invalidEmail) {
      if (validateEmail(val)) {
        state.invalidEmail = false;
      }
    }
  }
);
function submitForm() {
  if (!validateEmail(state.formData.email)) {
    state.invalidEmail = true;
  } else {
    changeJoined(true);
    state.invalidEmail = false;
  }
}
function flipPhone() {
  return Flip.fit(".phone", ".phone-image-container", {
    // scale: true,
    simple: true,
    duration: 2,
    ease: "power1.inOut",
  });
}
function updateFlip() {
  const flip: any = flipPhone();
  const progress = phoneTimeline?.progress();
  phoneTimeline?.seek(0).clear();
  phoneTimeline?.add(flip);
  phoneTimeline?.progress(progress);
}
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger, Flip);

  phoneTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#join",
      start: "20% bottom",
      end: "70% bottom",
      scrub: 1,
    },
  });
  const flip: any = flipPhone();
  phoneTimeline?.add(flip);

  var movingText: any = document.querySelector(".moving-text")?.cloneNode(true);
  document.querySelector(".moving-text-container")?.appendChild(movingText);

  const movingTextTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#join",
      start: "top center",
      end: "center top",
      toggleActions: "play pause resume pause",
      invalidateOnRefresh: true,
    },
  });
  movingTextTimeline?.fromTo(
    ".moving-text",
    {},
    { x: -movingText?.offsetWidth, ease: "none", repeat: -1, duration: 20 }
  );
  window.addEventListener("resize", updateFlip);
});

onUnmounted(() => window.removeEventListener("resize", updateFlip));
</script>
<template>
  <section id="join">
    <div class="moving-text-container">
      <div class="moving-text">
        <p class="quality" v-for="quality in qualities">
          <i class="lni" :class="[quality?.icon]"></i>
          {{ quality?.text }}
        </p>
      </div>
    </div>
    <div class="join-container">
      <div class="phone-image-container"></div>
      <div class="text-container">
        <h2 class="section-title"><span class="extra">Join us</span></h2>
        <form @submit.prevent="submitForm">
          <div class="inputs">
            <div class="email-group" :class="{ invalid: state?.invalidEmail }">
              <input
                v-model.trim="state.formData.email"
                id="email"
                name="email"
                type="text"
                placeholder="Email"
              />
              <div class="email-tooltip">
                <div class="icon">!</div>
                <p>Invalid email</p>
              </div>
            </div>
            <div class="checkbox-group">
              <input
                v-model="state.formData.consent"
                id="consent"
                name="consent"
                type="checkbox"
              />
              <label for="consent"></label>
              <p>
                subscribe to receiving exclusive updates and offers from the
                newsletter
              </p>
            </div>
          </div>

          <Button>Send</Button>
          <p class="extra">
            * By subscribing, you agree to receive occasional promotional emails
            from Vitaem, including updates on new product launches, exclusive
            offers, and wellness insights. Rest assured, we prioritize the
            security of your information and adhere to our privacy policy. You
            can unsubscribe at any time by clicking the link in the email
            footer.
          </p>
        </form>
      </div>
    </div>
    <Joined
      v-if="state?.joined"
      @change-joined="changeJoined"
      @reset-data="resetFormData"
    />
  </section>
</template>
<style lang="scss" scoped>
@use "../vars";
.moving-text-container {
  width: 100%;
  background: vars.$gradient-3;
  color: white;
  overflow-x: hidden;
  display: flex;
  flex-wrap: nowrap;
  .moving-text {
    padding: vars.$padding-xs vars.$padding-sm;
    display: flex;
    align-items: center;
    gap: vars.$gap-lg;
    flex-wrap: nowrap;
    width: fit-content;
    .quality {
      font-size: vars.$font-h1;
      text-transform: uppercase;
      font-weight: bold;
      display: flex;
      align-items: center;
      text-align: center;
      gap: vars.$gap-md;
      flex-wrap: nowrap;
      text-wrap: nowrap;
      white-space: nowrap;
    }
  }
}
.join-container {
  display: flex;
  flex-direction: column-reverse;
  flex-wrap: wrap;
  width: 100%;
  padding: vars.$padding-md 0;
  .phone-image-container {
    position: relative;
    width: 100%;
    height: 50vh;
  }
  .text-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: vars.$padding-sm;
    .section-title {
      text-align: center;
    }
    form {
      width: 100%;
      padding: vars.$padding-sm 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      gap: vars.$gap-lg;
      .inputs {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: vars.$gap-md;
      }
      .email-group {
        display: flex;
        flex-direction: column;
        gap: vars.$gap-xs;
        position: relative;
        input {
          transition: all 0.1s ease-in-out;
        }

        .email-tooltip {
          position: absolute;
          bottom: calc(100% + (vars.$checkbox-height / 3));
          right: 0;
          background: vars.$secondary;
          border-radius: vars.$border-radius-sm;
          padding: vars.$padding-xxs vars.$padding-xs;
          display: flex;
          gap: vars.$gap-sm;
          font-size: vars.$font-xs;
          transform: translateY(0.5rem);
          opacity: 0;
          transition: all 0.2s ease-in-out;
          &::before {
            content: "";
            position: absolute;
            top: 100%;
            right: 1rem;
            margin-left: calc(vars.$checkbox-height / -3);
            border-width: calc(vars.$checkbox-height / 3);
            border-style: solid;
            border-color: vars.$secondary transparent transparent transparent;
          }
          .icon {
            background: vars.$red;
            color: vars.$secondary;
            border-radius: 50%;
            aspect-ratio: 1/1;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1.5em;
            font-weight: bold;
          }
          p {
            color: vars.$text;
            font-weight: 500;
          }
        }

        &.invalid {
          input {
            border-color: vars.$red;
          }
          .email-tooltip {
            transform: translateY(0);
            opacity: 1;
          }
        }
      }
      .checkbox-group {
        display: flex;
        gap: vars.$gap-md;
        label {
          flex-shrink: 0;
        }
        p {
          display: inline;
        }
      }
      button {
        width: 100%;
      }
      .extra {
        margin-top: vars.$padding-sm;
        font-size: vars.$font-xs;
        color: vars.$text-light;
      }
    }
  }
}

@media screen and (min-width: vars.$breakpoint-sm) {
  .join-container {
    flex-direction: row;
    padding: 5rem vars.$padding-md;
    .phone-image-container {
      flex-basis: 50%;
      max-width: 50vw;
      height: 70vh;
    }
    .text-container {
      flex-basis: 50%;
      padding-right: 0;
    }
  }
}

@media screen and (min-width: vars.$breakpoint-md) {
  .join-container {
    padding: 5rem vars.$padding-lg;
  }
}
</style>
