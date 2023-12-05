<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Create Request</h2>
      <label v-if="loading" class="shadow-md">
      <div class="spinner" style="font-size: 18px"></div>
    </label>
    </div>
    <form
      @submit.prevent="onCreateRequest"
      enctype="multipart/form-data"
      data-single="true"
      action="/file-upload"
    >
      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="intro-y col-span-12 lg:col-span-6">
          <!-- BEGIN: Form Layout -->
          <div class="intro-y box p-5">
            <div class="grid grid-cols-2 gap-6 mt-3">
              <div>
                <label for="crud-form-21" class="form-label">Agent</label>
                <div class="input-group">
                  <div class="form-control">
                    <strong>{{ agentFirstName }}</strong>
                    {{}}
                    <strong>{{ agentLastName }}</strong>
                  </div>
                </div>
              </div>
              <div>
                <label for="crud-form-18" class="form-label">Subject *</label>
                <div class="input-group">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    v-model="title"
                    :disabled="loading"
                  >
                    <option>Add New Member/ Dependent</option>
                    <option>Surgery</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-6 gap-6 mt-3">
              <div>
                <label for="crud-form-4" class="form-label">Message</label>
                <div class="input-group">
                  <textarea
                    v-model="comment"
                    id="crud-form-6"
                    rows="5"
                    class="form-control"
                    placeholder="comment"
                    aria-describedby="input-group-1"
                    :disabled="loading"
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-6 mt-5">
              <div>
                <label for="crud-form-4" class="form-label"
                  >Select attachments</label
                >

                <div class="fallback mt-4">
                  <input
                    ref="fileInput"
                    type="file"
                    multiple
                    accept=".jpg, .jpeg, .png, .pdf"
                    required
                    @change="handleFileInputChange"
                    :disabled="loading"
                  />
                </div>
              </div>
            </div>

            <div class="text-right mt-8">
              <button
                type="button"
                class="btn btn-outline-secondary w-24 mr-1"
                @click="goBack"
              >
                Cancel
              </button>

              <button
                type="submit"
                class="btn btn-primary w-24"
                :disabled="loading"
              >
                Create
              </button>
            </div>
          </div>
          <!-- END: Form Layout -->
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";

import axios from "axios";

export default {
  data() {
    return {
      agentFirstName: "",
      agentLastName: "",
      comment: "",
      title: "",
      serviceId: "",

      loading: false,
      btnloading: false,
    };
  },
  methods: {
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

    goBack() {
      this.$router.go(-1);
    },

    async fetch() {
      //   const id = this.$route.params.id;
      this.loading = true;
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          `/api/me`,

          {
            headers: {
              token: token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.user && typeof response.data.user === "object") {
          this.loading = false;
          if (response.data.user.manager) {
            this.agentFirstName = response.data.user.manager.firstName;
            this.agentLastName = response.data.user.manager.lastName;
            // console.log("If (Manager):", this.agentFirstName);
          } else if (
            response.data.user.accountOwner &&
            typeof response.data.user.accountOwner === "object"
          ) {
            this.agentFirstName = response.data.user.accountOwner.firstName;
            this.agentLastName = response.data.user.accountOwner.lastName;
            // console.log("Else (Account Owner):", this.agentFirstName);
          }
        } else {
          throw new Error("Failed to fetch services");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        this.loading = false;
      }
    },

    async onCreateRequest() {
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
      const token = Cookies.get("token");
      const requiredFields = ["title"];

      for (const field of requiredFields) {
        if (this[field] === "") {
          Swal.fire({
            icon: "warning",
            title: "Warning!",
            toast: true,
            text: `${field} cannot be empty`,
            timer: 3000,
            showConfirmButton: false,
            position: "top-end",
          });
          return;
        }
      }

      try {
        const formData = new FormData();
        this.files.forEach((file) => {
          formData.append(`files[]`, file);
        });

        formData.append("title", this.title);
        formData.append("comment", this.comment);

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

        this.btnloading = true;
        this.loading = true;

        const response = await axios.post("/api/request/createnew", formData, {
          headers: {
            token: token,
            "Content-Type": "multipart/form-data",
          },
        });
        Toast.fire({
          icon: "success",
          title: "Success!",
          // title: "Error",
          text: "Request created successfully",
          timer: 3000,
        });

        this.btnloading = false;
        this.loading = false;
        this.$router.push("/viewrequest");
        this.isSuccess = true;
        console.log(response);
        this.$emit("requestcreated");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          this.errorMessage = error.response.data.error;
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: this.errorMessage,
          });
          console.error("Error creating request:", this.errorMessage);
          //   setTimeout(() => {
          //     window.location.reload();
          //   }, 3000);
        } else {
          this.errorMessage = "An error occurred. Please try again.";
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: this.errorMessage,
          });

          console.error("Error creating request:", error.message);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 3000);
        }
        this.btnloading = false;
        this.loading = false;
      }
    },
  },
  created() {
    this.fetch();
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
.custom-date-input {
  width: 150px; /* Adjust the width as needed */
  padding: 5px; /* Adjust the padding as needed */
  font-size: 12px; /* Adjust the font size as needed */
  /* Add any other styles you want to customize the appearance */
}
</style>
