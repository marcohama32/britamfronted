<template>
  <div>
    <div v-if="loading" class="spinner" style="font-size: 18px"></div>

    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Update service</h2>

      <!-- <div v-if="loading">
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
      </div> -->
    </div>
    <form @submit.prevent="onUpdateService">
      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="intro-y col-span-12 lg:col-span-6">
          <!-- BEGIN: Form Layout -->
          <div class="intro-y box p-5">
            <div class="grid grid-cols-2 gap-6 mt-3">
              <div>
                <label for="crud-form-15" class="form-label"
                  >Area of cover *</label
                >
                <div class="input-group">
                  <input
                    v-model="serviceAreaOfCover"
                    id="crud-form-16"
                    type="text"
                    class="form-control"
                    placeholder="area of cover"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
              <div>
                <label for="crud-form-4" class="form-label">Access *</label>
                <div class="input-group">
                  <input
                    v-model="serviceName"
                    id="crud-form-5"
                    type="text"
                    class="form-control"
                    placeholder="access"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-6 mt-3">
              <div>
                <label for="crud-form-4" class="form-label">Price *</label>
                <div class="input-group">
                  <input
                    v-model="servicePrice"
                    id="crud-form-6"
                    type="number"
                    class="form-control"
                    placeholder="price"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
              <div>
                <label for="crud-form-19" class="form-label"
                  >Need authorization *</label
                >
                <div class="input-group">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    v-model="preAuthorization"
                  >
                    <option selected>no</option>
                    <option>yes</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-6 gap-6 mt-3">
              <div>
                <label for="crud-form-4" class="form-label"
                  >Description *</label
                >
                <div class="input-group">
                  <textarea
                    v-model="serviceDescription"
                    id="crud-form-6"
                    rows="5"
                    class="form-control"
                    placeholder="description"
                    aria-describedby="input-group-1"
                  ></textarea>
                </div>
              </div>
            </div>

            <div>
              <label for="crud-form-18" class="form-label">Status</label>
              <div class="input-group">
                <select
                  v-model="status"
                  class="form-control"
                  aria-label="Default select example"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
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
                Update
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
      serviceName: "",
      servicePrice: "",
      serviceDescription: "",
      serviceAreaOfCover: "",
      preAuthorization: "",
      planId: "",

      status: "",
      plans: [],
      btnloading: false,
      loading: false,
    };
  },

  watch: {
    id() {
      this.getUser();
    },
  },
  created() {
    this.axios = axios; // Create a reference to axios
    this.fetchData();
    this.getPlans();
  },
  methods: {
    formatCurrency(value) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      return formatter.format(value);
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
    async getPlans() {
      try {
        const token = Cookies.get("token");
        const response = await axios.get("/api/allplans", {
          headers: {
            token: token,
          },
        });

        if (response.data.success) {
          this.plans = response.data.plan;
        } else {
          throw new Error("Failed to fetch plans");
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    },
    async fetchData() {
      try {
        this.loading = true;
        this.btnloading = true;
        const id = this.$route.params.id;
        const token = Cookies.get("token");
        const response = await axios.get(`/api/service/${id}`, {
          headers: {
            token: token,
          },
        });

        this.serviceName = response.data.service.serviceName;
        this.servicePrice = response.data.service.servicePrice;
        this.serviceDescription = response.data.service.serviceDescription;
        this.serviceAreaOfCover = response.data.service.serviceAreaOfCover;
        this.preAuthorization = response.data.service.preAuthorization;
        this.status = response.data.service.status;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
        this.btnloading = false;
      }
    },

    onFileChange(event) {
      const file = event.target.files[0]; // Get the selected file
      // Set the file object to the avatar property
      this.avatar = file;
    },
    validateContacts() {
      if (isNaN(this.contact1) || isNaN(this.contact2)) {
        return false;
      }
      return true;
    },
    async onUpdateService() {
      const id = this.$route.params.id;
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

      const requiredFields = [
        "serviceName",
        "servicePrice",
        "serviceDescription",
        "serviceAreaOfCover",
        "preAuthorization",
        "status",
      ];
      const token = Cookies.get("token");
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
        // Create FormData object

        const formData = new FormData();
        formData.append("serviceName", this.serviceName);
        formData.append("servicePrice", this.servicePrice);
        formData.append("serviceDescription", this.serviceDescription);
        formData.append("serviceAreaOfCover", this.serviceAreaOfCover);
        formData.append("preAuthorization", this.preAuthorization);
        formData.append("status", this.status);
        formData.append("planId", this.planId);

        this.btnloading = true;
        const response = await axios.put(
          `/api/service/update/${id}`,
          formData,
          {
            headers: {
              token: token,
              "Content-Type": "application/json",
            },
          }
        );

        Toast.fire({
          icon: "success",
          title: "Success!",
          text: "Service updated successfully",
          timer: 3000,
        });

        this.btnloading = false;
        // this.$router.push("/viewcustomer");
        this.$router.go(-1);
        this.isSuccess = true;
        console.log(response);
        this.$emit("Updated successfully");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          const errorMessage = error.response.data.error;
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: errorMessage,
          });
          this.btnloading = false;
          console.error("Error updating service:", errorMessage);
          setTimeout(() => {
            // window.location.reload();
          }, 3000);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "An error occurred. Please try again.",
          });
          console.error("Error updating service:", error.message);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
        this.btnloading = false;
      }
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
