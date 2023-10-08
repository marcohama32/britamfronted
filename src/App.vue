<template>
  <div>
    <div v-if="isAuthenticated" class="fullcontent">
      <MobileMenu />

      <div class="flex mt-[4.7rem] md:mt-0 overflow-hidden">
        <SideMenu />

        <div class="content">
          <TopBar />

          <!-- Check if the route is the reset password route -->
          <router-view
            v-if="isAuthenticated && !isLoginRoute && !isResetRoute && !isForgetRoute"
          ></router-view>
        </div>
        <!-- END: Content -->
      </div>
    </div>
    <div v-else>
      <!-- Redirect to reset password route when not authenticated -->
      <router-view v-if="isResetRoute || isForgetRoute"></router-view>

      <!-- Show login route if not accessing reset route -->
      <router-view v-else-if="isLoginRoute"></router-view>
    </div>
  </div>
</template>

<script>
import MobileMenu from "./components/MobileMenu.vue";
import SideMenu from "./components/SideMenu.vue";
import TopBar from "./components/TopBar.vue";
import Cookies from "js-cookie";

export default {
  name: "App",
  components: {
    TopBar,
    SideMenu,
    MobileMenu,
  },
  computed: {
    isAuthenticated() {
      // const token = Cookies.get("token");
      const token = Cookies.get("token");
      return !!token && this.isTokenValid(token);
    },
    isLoginRoute() {
      return this.$route.name === "Login";
    },
    isResetRoute() {
      return this.$route.name === "Reset Token";
    },
    isForgetRoute() {
      return this.$route.name === "Forget Password";
    },
  },
  methods: {
    isTokenValid(token) {
      if (!token) {
        return false;
      }

      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));

        // Check if the token is expired
        const expiration = decodedToken?.exp;
        const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds

        return currentTime < expiration;
      } catch (error) {
        console.error("Invalid token format");
        return false;
      }
    },
  },
};
</script>
