<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Create Transactions</h2>
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
      @submit.prevent="onCreateTransaction"
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
                <label for="crud-form-18" class="form-label">Service *</label>
                <div class="input-group">
                  <select
                    v-model="serviceId"
                    class="form-control mt-2 sm:mr-2"
                    aria-label="Default select example"
                  >
                    <option
                      v-for="planItem in plans"
                      :key="planItem._id"
                      :value="planItem._id"
                    >
                      {{ planItem.serviceName }}
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <label for="crud-form-21" class="form-label">Amount*</label>
                <div class="input-group">
                  <input
                    v-model="amount"
                    id="crud-form-21"
                    type="number"
                    min="1" step="0.01"
                    class="form-control mt-2 sm:mr-2"
                    placeholder="amount"
                    aria-describedby="input-group-1"
                  />
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
                  />
                </div>
              </div>
            </div>
            <div class="mt-5">
              <input type="text" v-model="planId" desabled hidden/>
              <input type="text" v-model="paymentMethod" disabled hidden/>
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
      planId: "",
      paymentMethod: "monthly fee",
      amount: "",
      serviceId: "",
      plans: [],
      loading: false,
      btnloading: false,
      customerCompany: "",
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
      const id = this.$route.params.id;
      this.loading = true;
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          `/api/user/${id}`,

          {
            headers: {
              token: token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.success) {
          this.plans = response.data.user.plan[0].planService;

          this.planId = response.data.user.plan[0]._id;
            console.log("Company: ",response.data.user.company)
          this.loading = false;
        } else {
          throw new Error("Failed to fetch services");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        this.loading = false;
      }
    },

    async onCreateTransaction() {
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
      const requiredFields = ["amount"];

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
          formData.append(`multipleFiles[]`, file);
        });
        
        formData.append("amount", this.amount);
        formData.append("serviceId", this.serviceId);
        formData.append("customerId", this.customerId = this.$route.params.id);
        formData.append("planId", this.planId);
        formData.append("paymentMethod", this.paymentMethod);
        formData.append("customerName", this.customerName);
        formData.append("customerCompany", this.customerCompany);

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

        const response = await axios.post("/api/ctransation/create", formData, {
          headers: {
            token: token,
            "Content-Type": "multipart/form-data",
          },
        });
        Toast.fire({
          icon: "success",
          title: "Success!",
          // title: "Error",
          text: "Transaction created successfully",
          timer: 3000,
        });

        this.btnloading = false;
        this.loading = false;
        this.$router.push("/mytransactions");
        this.isSuccess = true;
        console.log(response);
        this.$emit("postcreated");
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
    this.fetch();
  },
};
</script>
