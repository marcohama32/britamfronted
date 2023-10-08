<template>
  <div>
    <div v-if="loading" class="spinner" style="font-size: 18px"></div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Employer Profile</h2>
      <div>
        <button class="btn btn-secondary mt-5 mr-3" @click="goBack">
          Back
        </button>
      </div>
      <div >
      <div v-if="role === '1'">
        <div v-if="CustomerRole === 1">
          <router-link :to="`/updateadmin/${this.$route.params.id}`"
            ><button class="btn btn-secondary mt-5">Edit</button></router-link
          >
        </div>
        <div v-show="CustomerRole === 2">
          <router-link :to="`/updatemanager/${this.$route.params.id}`"
            ><button class="btn btn-secondary mt-5">Edit</button></router-link
          >
        </div>
        <div v-if="CustomerRole === 3">
          <router-link :to="`/updateeagent/${this.$route.params.id}`"
            ><button class="btn btn-secondary mt-5">Edit</button></router-link
          >
        </div>
        <div v-if="CustomerRole === 6 || CustomerRole === 9">
          <router-link :to="`/updatepartneruser/${this.$route.params.id}`"
            ><button class="btn btn-secondary mt-5">Edit</button></router-link
          >
        </div>
      </div>
    </div>
    </div>
    <!-- BEGIN: Profile Info -->
    <div class="intro-y box px-5 pt-5 mt-5">
      <div
        class="flex flex-col lg:flex-row border-b border-slate-200/60 dark:border-darkmode-400 pb-5 -mx-5"
      >
        <div
          class="flex flex-1 px-5 items-center justify-center lg:justify-start"
        >
          <div
            class="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative"
          >
            <img
              v-if="avatar"
              :src="getAvatarUrl()"
              alt="profilecustomer"
              class="rounded-full"
            />
            <img
              v-else
              src="../../../../dist/images/logow.png"
              alt="profilecustomer"
              class="rounded-full"
            />
          </div>
          <div class="ml-5">
            <div
              class="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg"
            >
              {{ firstName }} {{ lastName }}
            </div>
            <div class="font-medium" v-if="role === 6">{{ profile }}</div>
            <div class="text-slate-500">{{ getRole(CustomerRole) }}</div>
            <div class="text-slate-100 mt-1" :class="getStatusClass(status)">
              {{ status }}
            </div>
          </div>
        </div>
        <div
          class="mt-6 lg:mt-0 flex-1 px-5 border-l border-r border-slate-200/60 dark:border-darkmode-400 border-t lg:border-t-0 pt-5 lg:pt-0"
        >
          <div class="font-medium text-center lg:text-left lg:mt-3">
            Contact Details
          </div>
          <div
            class="flex flex-col justify-center items-center lg:items-start mt-4"
          >
            <div class="truncate sm:whitespace-normal flex items-center">
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
                class="lucide lucide-mail w-4 h-4 mr-2"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              {{ email }}
            </div>
            <div class="truncate sm:whitespace-normal flex items-center mt-3">
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
                class="lucide lucide-phone w-4 h-4 mr-2"
              >
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                />
              </svg>
              {{ contact1 }}
            </div>
            <div class="truncate sm:whitespace-normal flex items-center mt-3">
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
                class="lucide lucide-phone w-4 h-4 mr-2"
              >
                <path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                />
              </svg>
              {{ contact2 }}
            </div>
            <div class="truncate sm:whitespace-normal flex items-center mt-3">
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
                class="lucide lucide-map-pin w-4 h-4 mr-2"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {{ address }}
            </div>
          </div>
        </div>
        <div
          class="mt-6 lg:mt-0 flex-1 px-5 border-t lg:border-0 border-slate-200/60 dark:border-darkmode-400 pt-5 lg:pt-0"
        >
          <div class="font-medium text-center lg:text-left lg:mt-2">
            About me
          </div>
          <div class="flex items-center justify-center lg:justify-start mt-2">
            <div class="">
              Gender: <span class="ml-3 font-medium">{{ gender }}</span>
            </div>
          </div>
          <div class="flex items-center justify-center lg:justify-start mt-2">
            <div class="">
              DOB: <span class="ml-3 font-medium">{{ dob }}</span>
            </div>
          </div>
          <div class="flex items-center justify-center lg:justify-start mt-2">
            <div class="">
              Id Type:
              <span class="ml-3 font-medium">{{ idType }}</span>
            </div>
          </div>
          <div class="flex items-center justify-center lg:justify-start mt-2">
            <div class="">
              Id Number: <span class="ml-3 font-medium">{{ idNumber }}</span>
            </div>
          </div>
          <div
            v-if="role === 3"
            class="flex items-center justify-center lg:justify-start mt-2"
          >
            <div class="" v-if="manager">
              Manager:
              <span class="ml-3 font-medium"
                >{{ manager.firstName }} {{ manager.lastName }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
export default {
  data() {
    return {
      errorMessage: "",
      firstName: "",
      lastName: "",
      avatar: "",
      multipleFiles: [],
      files: [],
      loading: false,
      role: "",
      address: "",
      CustomerRole: "",
      managerFirstName: "",
      managerLastName: "",
      contact1: "",
      contact2: "",
      dob: "",
      email: "",
      gender: "",
      idNumber: "",
      idType: "",
      monthlyFee: "",
      relation: "",
      id: "",
      profile: "",
      enrolmentDate: "",
      status: "",
    };
  },
  watch: {
    id() {
      this.getProfile();
    },
  },
  created() {
    
    this.role = Cookies.get("role");
    this.getProfile();
  },
  computed: {
    // filesArray() {
    //   const filesString = this.user.multipleFiles;
    //   return filesString.split(",");
    // },
  },
  methods: {
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
    getStatusClass(status) {
      if (status === "Active") {
        return "text-success";
      } else if (status === "Inactive") {
        return "text-danger";
      } else {
        return ""; // Default class if no match
      }
    },
    getRole(CustomerRole) {
      if (CustomerRole === 1) {
        return "Admin";
      } else if (CustomerRole === 2) {
        return "Line Manager";
      } else if (CustomerRole === 3) {
        return "Agent";
      }
      {
        return ""; // Default class if no match
      }
    },
    async getProfile() {
      const id = this.$route.params.id;
      const token = Cookies.get("token");

      try {
        const response = await axios.get(`/api/userprofile/${id}`, {
          headers: {
            token: token,
          },
        });

        // Check if the response contains the expected data
        if (response.data.user) {
          const user = response.data.user;
          // this.role = user.role;
          this.firstName = user.firstName;
          this.lastName = user.lastName;
          this.contact1 = user.contact1;
          this.contact2 = user.contact2;
          this.dob = this.formatDate(response.data.user.dob);
          this.email = user.email;
          this.gender = user.gender;
          this.idNumber = user.idNumber;
          this.idType = user.idType;
          this.address = user.address;
          this.profile = user.profile;
          this.CustomerRole = response.data.user.role;

          // console.log("Customer role: ", response.data.user.role)
  
          // Check if the 'avatar' property exists and is a string
          if (response.data.user.avatar) {
            this.avatar = `${response.data.user.avatar}`; // Replace 'your-image-url' with the actual URL or path to your images
          } else {
            this.avatar = ""; // Set to empty string if there is no avatar
          }
          // Check if the 'manager' property exists and is an object
          if (user.manager && typeof user.manager === "object") {
            this.manager = {
              id: user.manager._id,
              firstName: user.manager.firstName,
              lastName: user.manager.lastName,
              // Add other properties if needed
            };
          }

          //   this.managerLastName = response.data.user.manager.lastName;
          this.status = response.data.user.status;
          // Update other properties as needed
        } else {
          throw new Error("User data not found in the response.");
        }
      } catch (error) {
        // Handle errors
        console.error("Error retrieving user:", error);
        this.errorMessage = "Error retrieving this user. Please try again.";
      }
    },
    handleFileInputChange(event) {
      const selectedFiles = event.target.files;
      const filesArray = Array.from(selectedFiles);

      // Filter out empty files
      this.files = filesArray.filter((file) => file.size > 0);

      // Validate file types
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      const invalidFiles = this.files.filter(
        (file) => !allowedTypes.includes(file.type)
      );
      if (invalidFiles.length > 0) {
        // Show Toast for invalid file types
        const invalidFileNames = invalidFiles
          .map((file) => file.name)
          .join(", ");
        this.showToast("error", `Invalid file type: ${invalidFileNames}`);
        // Clear the file input
        this.$refs.fileInput.value = "";
        this.$refs.fileInput.files = null;
        this.$refs.fileInput.dispatchEvent(new Event("change"));
        // Stop further execution
        return;
      }
    },

    showToast(icon, text) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: icon,
        text: text,
      });
    },

    uploadFiles() {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      const id = this.$route.params.id;
      const token = Cookies.get("token");

      const formData = new FormData();

      this.files.forEach((file) => {
        formData.append(`multipleFiles[]`, file);
      });

      // Check if there are any files selected
      if (this.files.length === 0) {
        Toast.fire({
          icon: "error",
          // title: "Error",
          text: "Please select at least one file",
          timer: 3000,
          // showConfirmButton: false,
          // position: "top-end",
        });
        return; // Stop further execution
      }

      // Show loading indicator
      this.loading = true;

      axios
        .put(`/api/user/uploadmultiplefiles/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        })
        .then((response) => {
          if (response.data.success) {
            // Close the modal
            this.$refs.fileInput.value = ""; // Clear the file input
            this.$refs.fileInput.files = null; // Reset the file input
            this.$refs.fileInput.dispatchEvent(new Event("change")); // Trigger change event to clear the selected files
            // Display success message using SweetAlert
            Swal.fire({
              icon: "success",
              title: "Success!",
              toast: true,
              text: "Files uploaded successfully",
              timer: 3000,
              showConfirmButton: false,
              position: "top-end",
            }).then(() => {
              // Perform any additional actions after success, if needed
              // Close the modal
            });
          }
          this.getProfile();
          // Hide loading indicator
          this.loading = false;
        })
        .catch((error) => {
          console.error("Error uploading file:", error);

          // Hide loading indicator
          this.loading = false;
        });
    },

    deleteFile(file) {
      // Show loading indicator
      this.loading = true;

      // Display a confirmation dialog using SweetAlert
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to delete the file. This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const token = Cookies.get("token");
          axios
            .delete("/api/admin/file/delete", {
              headers: {
                token: token,
              },
              data: {
                userId: this.$route.params.id,
                file: file,
              },
            })
            .then((response) => {
              console.log(response.status);
              this.getProfile();
              Swal.fire("Deleted!", "The file has been deleted.", "success");
            })
            .catch((error) => {
              console.error("Error deleting file:", error);
              Swal.fire("Error!", "Failed to delete the file.", "error");
            })
            .finally(() => {
              // Hide loading indicator
              this.loading = false;
            });
        } else {
          // Hide loading indicator if the user cancels the deletion
          this.loading = false;
        }
      });
    },

    getFilePath(file) {
      return `${axios.defaults.baseURL}/${file}`;
    },
    getFileName(file) {
      const fileName = file.split("-")[2];
      return fileName;
    },
    getFileSize(file) {
      if (!file) {
        return "";
      }
      const fileSize = file.split("-")[2];
      return fileSize ? `${fileSize} KB` : "";
    },

    getAvatarUrl() {
      if (this.avatar) {
        // Assuming the base URL is "http://localhost:8000"
        return `${axios.defaults.baseURL}/${this.avatar.replace(/\\/g, "/")}`;
      }
      // Return a default image URL if the avatar is not available
      return "../../../../dist/images/logow.png";
    },
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
