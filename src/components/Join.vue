<script lang="ts" setup>
import { reactive, watch } from "vue";
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
</script>
<template>
  <section id="join">
    <div class="join-container">
      <div class="phone-image-container"></div>
      <div class="text-container">
        <h2 class="section-title"><span class="extra">Join us</span></h2>
        <form
          @submit.prevent="submitForm"
          :class="{ invalid: state?.invalidEmail }"
        >
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
          <Button>Send <i class="ti ti-mail"></i></Button>

          <p class="secondary">
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
  padding: vars.$padding-md 0 vars.$padding-lg;
  .phone-image-container {
    position: relative;
    flex-basis: 50%;
    max-width: 50vw;
    height: 70vh;
    height: 70svh;
  }
  .text-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-basis: 50%;
    padding: 0 vars.$padding-lg 0 vars.$padding-sm;
    .section-title {
      text-align: center;
    }
    form {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: vars.$gap-lg;
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
    .email-group {
      width: 100%;
      position: relative;
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
          font-weight: 700;
        }
      }
    }
    .checkbox-group {
      width: 100%;
      display: flex;
      gap: vars.$gap-md;
      font-size: vars.$font-xs;
      label {
        flex-shrink: 0;
      }
      p {
        display: inline;
      }
    }
    .secondary {
      font-size: vars.$font-xs;
      color: vars.$text-light;
    }
  }
}

@media screen and (max-width: vars.$breakpoint-md) {
  .join-container {
    flex-direction: column-reverse;
    .phone-image-container {
      flex-basis: unset;
      width: 100%;
    }
    .text-container {
      flex-basis: unset;
      padding: 0 vars.$padding-md vars.$padding-lg;
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
      padding: 0 vars.$padding-sm vars.$padding-md;
    }
  }
}
</style>
