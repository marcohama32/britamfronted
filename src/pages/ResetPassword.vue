<template>
  <div class="login">
    <div class="sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Login Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <a href="#" class="-intro-x flex items-center pt-5">
            <img
              alt="Midone - HTML Admin Template"
              class="w-6"
              src="../logo.png"
            />
            <span class="text-white text-lg ml-3"> Mediplus </span>
          </a>
          <div class="my-auto">
            <img
              alt="Midone - HTML Admin Template"
              class="-intro-x w-1/2 -mt-16"
              src="../illustration2.svg"
            />
            <div
              class="-intro-x text-white font-medium text-4xl leading-tight mt-10"
            >
              <br />
              Create a new password
            </div>
            <div
              class="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400"
            >
              <!-- Manage all your customers -->
            </div>
          </div>
        </div>
        <!-- END: Login Info -->
        <!-- BEGIN: Login Form -->
        <form @submit.prevent="onLogin">
          <div
            class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0 container sm:px-10"
          >
            <div
              class="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
            >
              <h2
                class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left"
              >
                Create new password
              </h2>
              <div class="invalid-feedback"></div>
              <div
                class="intro-x mt-2 text-slate-400 xl:hidden text-center"
              ></div>
              <div class="intro-x mt-8">
                <input
                  type="text"
                  v-model="newPassword"
                  class="intro-x login__input form-control py-3 px-4 block"
                  placeholder="insert a new password"
                />

                <input
                  type="password"
                  v-model="retrynewPassword"
                  class="intro-x login__input form-control py-3 px-4 block mt-4"
                  placeholder="insert password again"
                />
                <div class="invalid-feedback"></div>
              </div>

              <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                <button
                  class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                  type="submit"
                >
                  Create
                </button>
              </div>
              <div
                class="intro-x mt-10 xl:mt-24 text-slate-600 dark:text-slate-500 text-center xl:text-left"
              >
                By signin up, you agree to our
                <a class="text-primary dark:text-slate-200" href="#"
                  >Terms and Conditions</a
                >
                &
                <a class="text-primary dark:text-slate-200" href="#"
                  >Privacy Policy</a
                >
              </div>
            </div>
          </div>
        </form>
        <!-- END: Login Form -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      newPassword: "",
      retrynewPassword: "",
      token: null,
    };
  },
  methods: {
    resetPassword() {

      this.errors = {}; // Reset errors object
      let user = {
        newPassword: this.newPassword,
        retrynewPassword: this.retrynewPassword,
        token: this.$route.params.token
      };

      axios
        .post("/reset-password", user)
        .then((res) => {
          // If success
          if (res.status === 200) {
            
            // Emit an event to notify the successful login
            this.$emit("loginSuccess");

            // Call the beforeRouteEnter navigation guard
            this.$router.go("/");
          }
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.error) {
            this.errors = { email: [err.response.data.error] }; // Set the errors object
            console.log(this.errors);
          }
        });
    },
  },
  //   created(){

  //   }
};
</script>

<style scoped>
/* Your CSS styles here */
</style>
