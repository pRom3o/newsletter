<script setup>
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import { onBeforeUnmount, onMounted, ref, reactive } from 'vue';
// import Thanks from '@/components/Thanks.vue';
import list from '@/components/icons/list.vue';
import success from '@/components/icons/success.vue';

//creates state
const state = reactive({
  contact: {
    email: '',
  },
});

//matches state
const rules = {
  contact: {
    email: {
      required: helpers.withMessage('Email is required', required),
      email: helpers.withMessage('Please enter a valid email', email),
    },
  },
};

const v$ = useVuelidate(rules, state);
const subscribed = ref(false);

//handles form submission
const submit = () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    console.log('not subscribed');
    return;
  }
  subscribed.value = !subscribed.value;
  console.log('subscribed to news letter: ', state);

  //   state.contact.email = ''; // Reset email field
  v$.value.$reset(); // Reset validation states
};
const mobile = ref(false);
const checkScreenSize = () => {
  // 768px is a common mobile screen size breakpoint
  mobile.value = window.innerWidth <= 768;
};

// Check screen size when component is mounted
onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize); // Update on window resize
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<template>
  <div class="h-screen flex md:items-center justify-center bg-charcoal-grey font-Roboto">
    <div
      class="md:min-h-20 md:h-96 h-full md:w-96 flex flex-col md:justify-center justify-between gap-5 p-8 bg-gray-200 md:rounded-2xl"
      v-if="subscribed"
    >
      <div class="flex flex-col gap-3 h-2/3 justify-center">
        <success class="" />
        <h1 class="md:text-4xl text-6xl font-semibold md:font-medium">Thanks for subscribing!</h1>
        <p class="text-lg md:text-base">
          A confirmation email has been sent to <strong>{{ state.contact.email }}</strong
          >. Please open it and click the button inside to confirm your subscription
        </p>
      </div>
      <button
        @click="subscribed = false"
        class="bg-slate-grey w-full p-3 rounded-md text-white hover:bg-tomato-orange hover:transition-background"
      >
        Dismiss message
      </button>
    </div>
    <div
      class="md:flex flex-col md:flex-row md:items-center bg-grey md:rounded-3xl md:p-4 shadow-sm md:justify-between md:max-w-4xl md:h-[65vh] min-h-96"
      v-else
    >
      <img
        src="@/assets/illustration-sign-up-mobile.svg"
        alt="#"
        v-if="mobile"
        class="rounded-b-xl mb-10 w-full"
      />
      <img
        src="@/assets/illustration-sign-up-desktop.svg"
        alt="#"
        v-else
        class="order-2 h-[65vh] py-4"
      />
      <form @submit.prevent="submit" class="flex flex-col md:w-1/2 px-4 order-1">
        <div class="flex flex-col gap-4 w-full md:py-8 px-4">
          <div class="">
            <h1 class="font-bold text-5xl mb-5">Stay Updated!</h1>
            <p class="md:mb-4 mb-2 md:test-base text-para">
              Join 60,000+ product managers receiving monthly updates on:
            </p>
          </div>
          <ul class="flex flex-col gap-3 md:mb-5 mb-2 md:text-base text-para">
            <li class="flex items-center gap-3">
              <list />Product discovery and building what matters
            </li>
            <li class="flex items-center gap-3">
              <list />Measuring to ensure updates are a success
            </li>
            <li class="flex items-center gap-3"><list />And much more!</li>
          </ul>
          <div class="flex flex-col w-full">
            <div class="flex justify-between">
              <label for="email" class="md:text-sm">Email address</label>
              <span class="text-red-500 text-sm" v-if="v$.contact.email.$error">
                {{ v$.contact.email.$errors[0]?.$message }}
              </span>
            </div>
            <input
              type="text"
              id="email"
              name="email"
              v-model="state.contact.email"
              class="md:py-3 mt-1 p-3 md:pl-6 w-full rounded-lg bg-transparent border-[1.5px] border-black outline-none"
              :class="{
                'bg-[#FBDCD9] bg-opacity-80 border-[#fa7b6f] text-[#fa7b6f]':
                  v$.contact.email.$error,
              }"
            />
          </div>
          <button
            @click="submit"
            class="w-full rounded-lg md:bg-tomato bg-slate-grey text-white text-center md:p-3 p-5 md:mt-3 hover:bg-tomato-orange hover:transition-background"
          >
            Subscribe to monthly newsletter
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
