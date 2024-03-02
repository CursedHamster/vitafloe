<script lang="ts" setup>
import { reactive, onMounted, onUnmounted, watch } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import Button from "./Button.vue";
import Joined from "./Joined.vue";
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
      start: "50% bottom",
      end: "100% bottom",
      scrub: 1,
    },
  });
  const flip: any = flipPhone();
  phoneTimeline?.add(flip);

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".footer",
        start: () => "0% bottom",
        end: "bottom bottom",
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
      },
    })
    .fromTo(".header", { opacity: 1 }, { opacity: 0, duration: 0.2 });

  window.addEventListener("resize", updateFlip);
});

onUnmounted(() => window.removeEventListener("resize", updateFlip));
</script>
<template>
  <section id="join">
    <div class="join-container">
      <div class="phone-image-container"></div>
      <div class="text-container">
        <h2 class="section-title"><span class="extra">Join us</span></h2>
        <form @submit.prevent="submitForm">
          <div class="inputs">
            <div class="form-group" :class="{ invalid: state?.invalidEmail }">
              <div class="email-group">
                <input
                  v-model.trim="state.formData.email"
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter your email..."
                />
                <div class="email-tooltip">
                  <div class="icon">!</div>
                  <p>Invalid email</p>
                </div>
              </div>
              <Button button-style="static">Send</Button>
            </div>
            <div class="checkbox-group">
              <input
                v-model="state.formData.consent"
                id="consent"
                name="consent"
                type="checkbox"
              />
              <label class="clickable" for="consent"></label>
              <p>
                subscribe to receiving exclusive updates and offers from the
                newsletter
              </p>
            </div>
          </div>

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
.join-container {
  display: flex;
  width: 100%;
  padding: vars.$padding-md 0;
  .phone-image-container {
    position: relative;
    flex-basis: 50%;
    max-width: 50vw;
    height: 70vh;
  }
  .text-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-basis: 50%;
    padding: vars.$padding-lg;
    padding-left: vars.$padding-md;
    .section-title {
      text-align: center;
    }
    form {
      width: 100%;
      padding-bottom: vars.$padding-sm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      gap: vars.$gap-lg;
      .inputs {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: vars.$gap-lg;
      }
      .form-group {
        position: relative;
        display: flex;
        width: 100%;
        input {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          border-right: none;
        }
        .btn {
          max-width: fit-content;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
        &.invalid {
          input {
            border-color: vars.$red;
          }
          .email-tooltip {
            transform: translateY(0);
            opacity: 1;
          }
          .btn {
            border-color: vars.$red;
            &:hover {
              background: vars.$red;
            }
          }
        }
      }
      .email-group {
        flex: 1;
        input {
          transition: all 0.1s ease-in-out;
        }
        .email-tooltip {
          position: absolute;
          bottom: calc(100% + vars.$gap-sm);
          left: 0;
          background: vars.$red;
          border-radius: vars.$border-radius-md;
          padding: vars.$padding-xxs vars.$padding-sm;
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
            left: 2rem;
            margin-left: calc(vars.$checkbox-height / -4);
            border-width: calc(vars.$checkbox-height / 4);
            border-style: solid;
            border-color: vars.$red transparent transparent transparent;
          }
          .icon {
            background: vars.$background;
            color: vars.$red;
            border-radius: 50%;
            aspect-ratio: 1/1;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1.5em;
            font-weight: bold;
          }
          p {
            color: vars.$background;
            font-weight: 500;
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
      .extra {
        font-size: vars.$font-xs;
        color: vars.$text-light;
      }
    }
  }
}

@media screen and (max-width: vars.$breakpoint-md) {
  .join-container {
    flex-direction: column-reverse;
    .phone-image-container {
      flex-basis: unset;
      width: 100%;
      height: 60vh;
    }
    .text-container {
      flex-basis: unset;
      padding: vars.$padding-md;
    }
    form {
      .email-group {
        .email-tooltip {
          padding: vars.$padding-xxs vars.$padding-xs;
        }
      }
    }
  }
}

@media screen and (max-width: vars.$breakpoint-sm) {
  .join-container {
    padding: vars.$padding-md 0;
    .text-container {
      padding: vars.$padding-sm vars.$padding-sm;
    }
  }
}
</style>
