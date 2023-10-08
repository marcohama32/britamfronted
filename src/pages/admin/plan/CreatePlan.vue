<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Create plan</h2>
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
      @submit.prevent="onCreatePlan"
      
    >
      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="intro-y col-span-12 lg:col-span-6">
          <!-- BEGIN: Form Layout -->
          <div class="intro-y box p-5">
            <div class="grid grid-cols-2 gap-6 mt-3">
              <div>
                <label for="crud-form-15" class="form-label"
                  >Name *</label
                >
                <div class="input-group">
                  <input
                    v-model="planName"
                    id="crud-form-16"
                    type="text"
                    class="form-control"
                    placeholder="name"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
              <div>
                <label for="crud-form-4" class="form-label">Price *</label>
                <div class="input-group">
                  <input
                    v-model="planPrice"
                    id="crud-form-5"
                    type="number"
                    class="form-control"
                    placeholder="price"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-6 gap-6 mt-3">
              <div>
                <label for="crud-form-4" class="form-label">Area of cover *</label>
                <div class="input-group">
                  <input
                    v-model="areaOfCover"
                    id="crud-form-6"
                    type="text"
                    class="form-control"
                    placeholder="area of cover"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
             
            </div>

            <div class="grid grid-cols-6 gap-6 mt-3">
              <div>
                <label for="crud-form-4" class="form-label">Description *</label>
                <div class="input-group">
                  <textarea
                    v-model="planDescription"
                    id="crud-form-6"
                    rows="5"
                    class="form-control"
                    placeholder="description"
                    aria-describedby="input-group-1"
                  ></textarea>
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
import Cookies from "js-cookie";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";

import axios from "axios";

export default {
  data() {
    return {
      planName: "",
      planPrice: "",
      planDescription: "",
      areaOfCover: "",

      loading: false,
      btnloading: false,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    formatCurrency(value) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      return formatter.format(value);
    },
    onFileChange(event) {
      const file = event.target.files[0]; // Get the selected file

      // Set the file object to the avatar property
      this.avatar = file;
    },
   
    async onCreatePlan() {
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
      const requiredFields = [
        "planName",
        "planPrice",
        "planDescription",
        "areaOfCover",
       
      ];

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
        formData.append("planName", this.planName);
        formData.append("planPrice", this.planPrice);
        formData.append("planDescription", this.planDescription);
        formData.append("areaOfCover", this.areaOfCover);
       
        this.btnloading = true;
        this.loading = true;

        const response = await axios.post("/api/plan/create", formData, {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        });
        Toast.fire({
          icon: "success",
          title: "Success!",
          // title: "Error",
          text: "Plan created successfully",
          timer: 3000,
        });

        this.btnloading = false;
        this.loading = false;
        this.$router.go(-1);
        this.isSuccess = true;
        console.log(response);
        this.$emit("Plan created successfully");
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
          console.error("Error creating post:", this.errorMessage);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 3000);
        } else {
          this.errorMessage = "An error occurred. Please try again.";
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: this.errorMessage,
          });

          console.error("Error creating post:", error.message);
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
