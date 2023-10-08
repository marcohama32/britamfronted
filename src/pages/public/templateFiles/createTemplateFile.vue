<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Create Template File</h2>
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
    <form
      @submit.prevent="onCreateTemplateFile"
      enctype="multipart/form-data"
      data-single="true"
      action="/file-upload"
    >
      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="intro-y col-span-12 lg:col-span-6">
          <!-- BEGIN: Form Layout -->
          <div class="intro-y box p-5">
            <div class="grid grid-cols-6 gap-6 mt-3">
              <div>
                <label for="crud-form-15" class="form-label"
                  >Description *</label
                >
                <div class="input-group">
                  <input
                    v-model="description"
                    id="crud-form-16"
                    type="text"
                    class="form-control"
                    placeholder="description"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-6 gap-6 mt-5">
              <div>
                <label for="crud-form-4" class="form-label">Select file</label>

                <div class="fallback mt-4">
                  <input
                    id="fileInput"
                    ref="fileInput"
                    type="file"
                    accept=".jpg, .jpeg, .png, .pdf"
                    @change="onFileChange"
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
                :disabled="btnloading"
              >
                Save
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
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import Cookies from "js-cookie";
import axios from "axios";

export default {
  data() {
    return {
      description: "",

      fileTemplate: null,

      loading: false,
      btnloading: false,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
   
    onFileChange(event) {
      const file = event.target.files[0]; // Get the selected file

      // Set the file object to the avatar property
      this.fileTemplate = file;
    },
   
    async getMagers() {
      this.loading = true;
      const token = Cookies.get("token");
      try {
        const response = await axios.get("/api/user/employer/agent/active/get", {
          headers: {
            token: token,
          },
        });
        if (response.data.success) {
          this.managers = response.data.employer;
          this.loading = false;
        } else {
          throw new Error("Failed to fetch plans");
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        this.loading = false;
      }
    },
    async onCreateTemplateFile() {
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
      const requiredFields = ["description", "fileTemplate"];

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
        formData.append("description", this.description);
        formData.append("fileTemplate", this.fileTemplate);

        this.btnloading = true;
        this.loading = true;

        const response = await axios.post("/api/filestemplate/create", formData, {
          headers: {
            token: token,
            "Content-Type": "multipart/form-data",
          },
        });
        Toast.fire({
          icon: "success",
          title: "Success!",
          // title: "Error",
          text: "Template created successfully",
          timer: 3000,
        });

        this.btnloading = false;
        this.loading = false;
        this.$router.push("/viewtemplatefiles"); // Redirect to other page
        this.isSuccess = true;
        console.log(response);
        this.$emit("templatecreated");
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
          console.error("Error creating template:", this.errorMessage);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          this.errorMessage = "An error occurred. Please try again.";
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: this.errorMessage,
          });

          console.error("Error creating template:", error.message);
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
  
  },
};
</script>
