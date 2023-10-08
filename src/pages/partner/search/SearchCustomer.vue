<template>
  <div>
    <div class="">
      <div
        class="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2"
      >
        <div class="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0 ml-2">
          <div class="w-56 relative text-slate-500 ml-2">
            <input
              v-model="memberShipID"
              type="text"
              class="form-control w-56 box pr-10"
              placeholder="Insert MembershipID..."
            />
            <i
              class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
              data-lucide="search"
              @click="searchUser"
            ></i>
          </div>
        </div>
        <button class="btn btn-primary shadow-md ml-2" @click="searchUser">
          Search
        </button>
        <div v-if="loading">
          <div class="spinner-border text-primary" role="status">
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
              class="lucide lucide-loader"
            >
              <line x1="12" x2="12" y1="2" y2="6" />
              <line x1="12" x2="12" y1="18" y2="22" />
              <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
              <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
              <line x1="2" x2="6" y1="12" y2="12" />
              <line x1="18" x2="22" y1="12" y2="12" />
              <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
              <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
          <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        </div>
      </div>
      <!-- BEGIN: Profile Info -->
      <div v-if="this.userData" class="intro-y box px-5 pt-5 mt-5">
        <!-- BEGIN: Daily Sales -->
        <div class="">
          <div class="">
            <div class="dropdown ml-auto sm:hidden">
              <a
                class="dropdown-toggle w-5 h-5 block"
                href="javascript:;"
                aria-expanded="false"
                data-tw-toggle="dropdown"
              >
                <i
                  data-lucide="more-horizontal"
                  class="w-5 h-5 text-slate-500"
                ></i>
              </a>
              <div class="dropdown-menu w-40"></div>
            </div>
          </div>
          <div class="p-5">
            <div class="relative flex items-center">
              <div class="w-12 h-12 flex-none image-fit">
                <img
                  v-if="userData.avatar"
                  :src="`${axios.defaults.baseURL}/${userData.avatar}`"
                  alt="profilecustomer"
                  class="rounded-full"
                />
                <img
                  v-else
                  src="../../../dist/images/logow.png"
                  alt="profilecustomer"
                  class="rounded-full"
                />
              </div>
              <div class="ml-4 mr-auto">
                <a href="#" class="font-medium">
                  {{ this.userData.firstName }} {{ this.userData.lastName }}</a
                >
                <div class="text-slate-500 mr-5 sm:mr-5">
                  {{ this.userData.memberShipID }} *
                  {{ this.userData.contact1 }} * {{ this.userData.relation }} *
                  {{ this.userData.email }}
                </div>
              </div>
              <div class="font-medium text-slate-600 dark:text-slate-500">
                <router-link :to="`/createtransaction/${this.userData._id}`">
                  <button class="btn btn-primary shadow-md ml-5 mt-3 mb-3">
                    Proccess transaction
                  </button>
                </router-link>
              </div>
            </div>

            <div
              v-for="member in myMembers"
              :key="member._id"
              class="relative flex items-center mt-5"
            >
              <div class="w-12 h-12 flex-none image-fit">
                <img
                  v-if="member.avatar"
                  class="tooltip rounded-full"
                  :title="
                    member.avatarUploadDate
                      ? 'Uploaded at ' + member.avatarUploadDate
                      : 'Avatar Image'
                  "
                  alt="partner logo"
                  :src="`${axios.defaults.baseURL}/${member.avatar}`"
                  @error="handleAvatarError"
                  @load="handleAvatarLoad"
                />
                <img
                  v-else
                  src="../../../dist/images/logow.png"
                  alt="profilecustomer"
                  class="rounded-full"
                />
              </div>
              <div class="ml-4 mr-auto">
                <a href="#" class="font-medium">
                  {{ member.firstName }} {{ member.lastName }}</a
                >
                <div class="text-slate-500 mr-5 sm:mr-5">
                  {{ member.memberShipID }} * {{ member.contact1 }} *
                  {{ member.relation }} * {{ member.email }}
                </div>
              </div>

              <router-link :to="`/createtransaction/${member._id}`">
                <button class="btn btn-primary shadow-md ml-5 mt-3 mb-3">
                  Proccess transaction
                </button>
              </router-link>
            </div>
            <div class="row mt-3">
              <div class="col-md-12 bg-light text-right">
                <button
                  class="btn btn-secondary shadow-md ml-5 mt-3 mb-3"
                  @click="cancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Daily Sales -->
      </div>
      <!-- END: Profile Info -->
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import Swal from "sweetalert2"; // Import SweetAlert
import axios from "axios";

// ...

export default {
  data() {
    return {
      memberShipID: "",
      userData: null,
      avatar: "",
      loading: null,
      myMembers: [],
    };
  },
  methods: {
    getStatusClass(status) {
      if (status === "Active") {
        return "text-success";
      } else if (status === "Inactive") {
        return "text-danger";
      } else {
        return ""; // Default class if no match
      }
    },
    cancel() {
      this.userData = null;
    },
    goBack() {
      this.$router.go(-1);
    },
    formatDate(dateString) {
      const date = new Date(dateString); // Create a Date object from the ISO 8601 date string
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1 and pad with '0' if needed
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`; // Return the formatted date as a string
    },
    async searchUser() {
      try {
        this.loading = true;
        const token = Cookies.get("token");
        const memberShipID = this.memberShipID;

        // Validate input
        if (!memberShipID) {
          // Use SweetAlert to display the notification
          Swal.fire({
            icon: "warning",
            title: "Empty Input",
            text: "Please provide a valid membership ID.",
          });
          return; // Stop further processing since input is empty
        }

        // Make an API call to search for the user using the membership ID
        const response = await axios.get(
          `/api/membershipid?memberShipID=${memberShipID}`,
          {
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
          }
        );

        const data = response.data;
        this.myMembers = data.thisuser.myMembers;

        if (response.status === 200) {
          this.loading = false;
          // User found, store the user data
          this.userData = data.thisuser;
        } else if (response.status === 404) {
          // User not found
          console.log("User not found:", data.error);
          // Display the error message to the user
          Swal.fire({
            icon: "error",
            title: "User Not Found",
            text: "The user with the given membership ID was not found.",
          });
        } else {
          // Other unexpected errors
          console.log("Unexpected error:", data.error);
          // Display a generic error message to the user
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred while searching for the user.",
          });
        }
      } catch (error) {
        console.error("Error in searchUser:", error.response.data.error);
        this.userData = null;
        if (error.response.data.error === "Not authorized: Invalid token") {
          this.$router.push("/login");
        }

        // Display a generic error message to the user
        Swal.fire({
          icon: "info",
          title: "Error",
          text: `${error.response.data.error}.`,
        });
      }
    },
    getAvatarUrl() {
      if (this.avatar) {
        // Assuming the base URL is "http://localhost:8000"
        return `${axios.defaults.baseURL}/${this.avatar.replace("\\", "/")}`;
      }
      // Return a default image URL if the avatar is not available
      return "../../../dist/images/logow.png";
    },
  },
};
</script>
