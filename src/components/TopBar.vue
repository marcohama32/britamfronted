<template>
     <notification-component />
  <div class="notification-container">
    <router-link
      v-for="notification in notifications"
      :key="notification.id"
      class="alert alert-primary alert-dismissible show flex items-center mb-2 notification"
      role="alert"
      :to="`/customertransactiondetail/${notification.transactionId}`"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-alert-circle w-6 h-6 mr-2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
      </svg>
      {{ notification.message }}
      <button
        type="button"
        class="btn-close text-white"
        data-tw-dismiss="alert"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-x w-4 h-4"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </router-link>
  </div>

  <!-- Alert component for notifications -->
  <div v-if="notifications.length > 0" class="notification-container">
    <div
      v-for="(notification, index) in reversedNotifications"
      :key="index"
      class="alert alert-success alert-dismissible show flex items-center mb-2"
      role="alert"
    >
      <i data-lucide="alert-triangle" class="w-6 h-6 mr-2"></i>
      <div class="notification-content">{{ notification }}</div>
      <button
        type="button"
        class="btn-close"
        data-tw-dismiss="alert"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-4 h-4 lucide lucide-x"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
  </div>

  <div>
    <div class="top-bar -mx-4 px-4 md:mx-0 md:px-0">
      <!-- BEGIN: Breadcrumb -->
      <nav aria-label="breadcrumb" class="-intro-x mr-auto hidden sm:flex">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><a href="#">Application</a></li>
          <li class="breadcrumb-item active" aria-current="page">
            <!-- pagar dinamicamente o nome da rota -->
            {{ currentRouteName }}
          </li>
        </ol>
      </nav>
      <!-- END: Breadcrumb -->

      <div class="intro-x dropdown w-8 h-8">
        <div
          class="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in"
          role="button"
          aria-expanded="false"
          data-tw-toggle="dropdown"
        >
          <img
            v-if="avatar"
            :src="getAvatarUrl()"
            alt="profilecustomer"
            class="rounded-full"
          />
          <img
            v-else
            src="../dist/images/logo.png"
            alt="profilecustomer"
            class="rounded-full"
          />
        </div>
        <div class="dropdown-menu w-56">
          <ul class="dropdown-content bg-primary text-white">
            <li class="p-2">
              <div class="font-medium">{{ firstName }} {{ lastName }}</div>
              <div class="text-xs text-white/70 mt-0.5 dark:text-slate-500">
                {{ getRole(role) }}
              </div>
            </li>
            <li>
              <hr class="dropdown-divider border-white/[0.08]" />
            </li>
            <li v-if="role === 1 || role === 2 || role === 3 || role === 6">
              <router-link :to="`/employerprofile/${userID}`">
                <a class="dropdown-item hover:bg-white/5">
                  <i data-lucide="user" class="w-4 h-4 mr-2"></i> Profile
                </a>
              </router-link>
            </li>
            <li v-if="role === 4 || role === 5">
              <router-link :to="`/customerprofile/${userID}`">
                <a class="dropdown-item hover:bg-white/5">
                  <i data-lucide="user" class="w-4 h-4 mr-2"></i> Profile
                </a>
              </router-link>
            </li>
            <li v-if="role === 7 || role === 8">
              <router-link :to="`/dependentprofile/${userID}`">
                <a class="dropdown-item hover:bg-white/5">
                  <i data-lucide="user" class="w-4 h-4 mr-2"></i> Profile
                </a>
              </router-link>
            </li>
            <!-- <li>
              <a class="dropdown-item hover:bg-white/5">
                <i data-lucide="lock" class="w-4 h-4 mr-2"></i> Reset Password
              </a>
            </li> -->
            <!-- <li>
              <router-link to="/faq">
                <a class="dropdown-item hover:bg-white/5">
                  <i data-lucide="help-circle" class="w-4 h-4 mr-2"></i> Help
                </a>
              </router-link>
            </li> -->
            <li>
              <hr class="dropdown-divider border-white/[0.08]" />
            </li>
            <li>
              <a
                href="#"
                class="dropdown-item hover:bg-white/5"
                @click="logout"
              >
                <i data-lucide="toggle-right" class="w-4 h-4 mr-2"></i>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!-- END: Account Menu -->
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      avatar: null,
      routeName: null,
      firstName: "",
      lastName: "",
      role: "",
      ogv: null,
      userID: "",
      notifications: [], // Array to hold notifications
      showNotificationsDropdown: false, // Control the visibility of the dropdown
    };
  },
  computed: {
    reversedNotifications() {
      // Reverse the order of notifications
      return this.notifications.slice().reverse();
    },
    currentRouteName() {
      return this.$route.name;
    },
    filteredRoutes() {
      try {
        const isAuthenticated = Cookies.get("token");
        const userRole = Cookies.get("role");

        // Filter routes based on authentication and user role
        const routes = this.$router.options.routes;
        const filteredRoutes = routes.filter((route) => {
          if (route.meta && route.meta.requiresAuth && !isAuthenticated) {
            return false;
          }
          if (
            route.meta &&
            route.meta.roles &&
            !route.meta.roles.includes(userRole)
          ) {
            return false;
          }
          return true;
        });
        return filteredRoutes;
      } catch (error) {
        console.error("Error in filteredRoutes:", error);
        return [];
      }
    },
  },
  methods: {
    getProfile() {
      const token = Cookies.get("token");
      axios
        .get("/api/me", {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          const profile = response.data.user;

          this.firstName = profile.firstName;
          this.lastName = profile.lastName;
          this.idType = profile.idType;
          this.idNumber = profile.idNumber;
          this.avatar = profile.avatar;

          this.dob = this.formatDate(profile.dob);

          this.gender = profile.gender;
          this.role = profile.role;

          this.password = profile.password;
          this.email = profile.email;
          this.address = profile.address;
          this.contact1 = profile.contact1;
          this.contact2 = profile.contact2;
          this.userID = profile._id;

          //  console.log("resposta avatar---------------------",this.avatar)

          this.status = profile.status;
        })
        .catch((error) => {
          this.errorMessage =
            "Error retrieving this profile. Please try again.";
          console.error("Error retrieving profile:", error);
        });
    },
    formatDate(dateString) {
      const date = new Date(dateString); // Create a Date object from the ISO 8601 date string
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1 and pad with '0' if needed
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`; // Return the formatted date as a string
    },
    getStatusClass(status) {
      if (status === "Active") {
        return "text-success";
      } else if (status === "Inactive") {
        return "text-danger";
      } else {
        return ""; // Default class if no match
      }
    },
    async logout() {
      // alert("Logout")
      Cookies.remove("token");
      Cookies.remove("role");
      // When the user logs out
      sessionStorage.removeItem("visitedBefore");
      // Clear other session data as needed
      // Redirect the user to the login page or any desired route
      this.$router.go("/login");
      // try {
      //   const response = await axios.get("/logout");
      //   if (response.data.success) {
      //     // Clear any user-related data or tokens from your frontend
      //     // For example, you can clear local storage or session storage
      //     // localStorage.removeItem("token");
      //     Cookies.remove("token");
      //     Cookies.remove("role");
      //     // Redirect the user to the login page or any desired route
      //     this.$router.go("/login");
      //   } else {
      //     throw new Error("Failed to logout");
      //   }
      // } catch (error) {
      //   console.error("Error logging out:", error);
      //   // Show error message or handle the error in your desired way
      // }
    },
    getAvatarUrl() {
      if (this.avatar) {
        // Use the configured base URL and ensure forward slashes in the avatar path
        return `${axios.defaults.baseURL}/${this.avatar.replace(/\\/g, "/")}`;
      }
      // Use an absolute path or root-relative path for the default image URL
      return `${axios.defaults.baseURL}/path/to/default/image/logow.png`; // Replace with your default image path
    },
    hasRoute(routeName) {
      const hasRoute = this.filteredRoutes.some(
        (route) => route.name === routeName
      );
      return hasRoute;
    },
    getRole(role) {
      if (role === 1) {
        return "Admin";
      } else if (role === 2) {
        return "Line Manager";
      } else if (role === 3) {
        return "Agent";
      } else if (role === 4) {
        return "Customer";
      } else if (role === 5) {
        return "Customer";
      } else if (role === 6) {
        return "Partner";
      } else if (role === 7) {
        return "Dependent";
      } else if (role === 8) {
        return "Dependent";
      }
      {
        return ""; // Default class if no match
      }
    },
  },
  created() {
    this.getProfile();
    // Listen for the "notification" event
    this.$socket.on("transactionnotifications", (notificationMessage) => {
      console.log("Received transaction notification:", notificationMessage);
      this.notifications.push(notificationMessage);
    });

    // Connect to the SSE endpoint on the server
    // const source = new EventSource("https://localhost/api/notifications");
    const source = new EventSource("/api/notifications");


    // Listen for SSE events
    source.addEventListener("message", (event) => {
      // Parse the event data
      const data = JSON.parse(event.data);

      // Update the notifications array with the received notification data
      this.notifications.push(data);
    });
  },
  mounted() {
    const token = Cookies.get("token");

    axios
      .get(`/api/me`, {
        headers: {
          token: token,
          withCredentials: true,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.success) {
          const user = data.user;
          // Use the user data as needed
          this.response = user;
          // alert(user._id)
          this.userID = user._id;
          this.$socket.emit("user-online", this.userID);
          // console.log(user);
          // console.log("response", response);
        } else {
          console.error("Failed to retrieve user profile");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
};
</script>
<style scoped>
.notification-container {
  width: 500px; /* Adjust the width as needed */
}

.notification-content {
  flex-grow: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
