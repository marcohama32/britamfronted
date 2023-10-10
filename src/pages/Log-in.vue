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
              Sign in to your account.
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
                Sign In
              </h2>
              <div v-if="loading" class="spinner" style="font-size: 18px"></div>
              <!-- <div v-if="errors.email" class="invalid-feedback">
                {{ errors.email[0] }}
              </div> -->
              <div class="intro-x mt-2 text-slate-400 xl:hidden text-center">
                Sign in to your account..
              </div>
              <div class="intro-x mt-8">
                <input
                  type="text"
                  v-model="email"
                  :class="[
                    'intro-x login__input form-control py-3 px-4 block',
                    { 'is-invalid': errors.email },
                  ]"
                  placeholder="Email"
                />

                <input
                  type="password"
                  v-model="password"
                  :class="[
                    'intro-x login__input form-control py-3 px-4 block mt-4',
                    { 'is-invalid': errors.password },
                  ]"
                  placeholder="Password"
                />
                <div v-if="errors.password" class="invalid-feedback">
                  {{ errors.password[0] }}
                </div>
              </div>
              <div
                class="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4"
              >
                <div class="flex items-center mr-auto">
                  <!-- <input
                    id="remember-me"
                    type="checkbox"
                    class="form-check-input border mr-2"
                  />
                  <label class="cursor-pointer select-none" for="remember-me"
                    >Remember me</label
                  > -->
                </div>
                <router-link to="/forget-password"
                  >Forgot Password?</router-link
                >
              </div>
              <div class="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                <button
                  class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                  type="submit"
                  :disabled="btnloading"
                >
                  Login
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
import Cookies from "js-cookie";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";

export default {
  data() {
    return {
      email: "",
      password: "",
      btnloading: false,
      loading: false,
      errors: {},
    };
  },

  methods: {
    onLogin() {
      this.btnloading = false;
      this.errors = {}; // Reset errors object
      let user = {
        email: this.email,
        password: this.password,
      };
      this.loading = true;
      this.btnloading = true;
      axios
        .post("/api/signin", user)
        .then((res) => {
          // If success
          if (res.status === 200) {
            Cookies.set("token", res.data.token, { expires: 7 }); // Store token in a cookie
            Cookies.set("role", res.data.role, { expires: 7 }); // Store role in a cookie

            // Emit an event to notify the successful login
            this.$emit("loginSuccess");
            this.loading = false;
            this.btnloading = false;
            // Call the beforeRouteEnter navigation guard
            this.$router.go("/");
          }
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.error) {
            this.errors = { email: [err.response.data.error] }; // Set the errors object
            console.log(this.errors);
            Swal.fire({
              icon: "warning",
              title: "Warning!",
              toast: true,
              text: `${this.errors.email}`,
              timer: 3000,
              showConfirmButton: false,
              position: "top-end",
            });
          }
        });
      this.loading = false;
      this.btnloading = false;
    },
  },

  beforeRouteEnter(to, from, next) {
    const isAuthenticated = Cookies.get("token");
    if (isAuthenticated) {
      next({ name: "Dashboard" }); // Redirect to dashboard if already authenticated
    } else {
      next(); // Continue with the login page
    }
  },
};
</script>
<style>
.spinner {
  width: 2em;
  height: 2em;
  border-top: 1em solid #99a0ac;
  border-right: 1em solid transparent;
  border-radius: 100%;
  margin: auto;
  animation: spinner 0.9s linear infinite;
}
@keyframes spinner {
  100% {
    transform: rotate(360deg);
  }
}
</style>
