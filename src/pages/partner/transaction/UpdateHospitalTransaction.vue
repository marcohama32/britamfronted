<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Update Transactions</h2>
    </div>
    <label v-if="loading" class="shadow-md">
      <div class="spinner" style="font-size: 18px"></div>
    </label>
    <form
      @submit.prevent="onUpdateTransaction"
      enctype="multipart/form-data"
      data-single="true"
      action="/file-upload"
    >
      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="intro-y col-span-12 lg:col-span-6">
          <!-- BEGIN: Form Layout -->
          <div class="intro-y box p-5">
            <div class="grid grid-cols-2 gap-6 mb-5 mt-3">
              <div>
                <!-- <label for="crud-form-21" class="form-control fs-15 mt-2 mb-5 sm:mr-2"><strong>{{ firstName }} {{ lastName }}</strong></label> -->
              </div>
              <div></div>
            </div>
            <div class="grid grid-cols-2 gap-6 mt-3">
              <div>
                <label for="crud-form-18" class="form-label">Service *</label>
                <div class="input-group">
                  <select
                    v-model="serviceId"
                    class="form-control mt-2 sm:mr-2"
                    aria-label="Default select example"
                    disabled
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
                    min="1"
                    step="0.01"
                    class="form-control mt-2 sm:mr-2"
                    placeholder="amount"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-6 mt-5">
              <div>
                <label for="crud-form-17" class="form-label">Current status</label>
                <div class="input-group">
                  <input
                    v-model="transactionStatus"
                    id="crud-form-21"
                    type="text"
                    class="form-control mt-2 sm:mr-2"
                    aria-describedby="input-group-1"
                    disabled
                  />
                </div>
              </div>
              <div>
                <label for="crud-form-17" class="form-label">Update status</label>
                <div class="input-group">
                  <select class="form-select mt-2 sm:mr-2" aria-label="Default select example" v-model="transactionStatus">
                    <option value="In progress">In progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="mt-5">
              <input type="text" v-model="planId" desabled hidden />
              <input type="text" v-model="paymentMethod" disabled hidden />
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
    <div class="grid grid-cols-12 gap-6 mt-5">
      <!-- BEGIN: Latest Uploads -->
      <div class="intro-y box col-span-6 lg:col-span-6">
        <div
          class="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400"
        >
          <h2 class="font-medium text-base mr-auto"></h2>
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
          </div>
          <button
            data-tw-toggle="modal"
            data-tw-target="#new-order-modal"
            class="btn btn-outline-secondary hidden sm:flex"
          >
            Add files
          </button>
        </div>
        <div class="p-5" v-if="multipleFiles && multipleFiles.length > 0">
          <!-- Iterate over the files array and display each file -->
          <div
            v-for="file in multipleFiles"
            :key="file"
            class="flex items-center mt-5"
          >
            <div class="file">
              <a
                :href="getFilePath(file)"
                target="_blank"
                class="w-12 file__icon file__icon--directory"
              ></a>
            </div>
            <div class="ml-4">
              <a :href="getFilePath(file)" target="_blank" class="font-medium">
                {{ file }}</a
              >
              <div class="text-slate-500 text-xs mt-0.5">
                {{ getFileSize(file) }}
              </div>
            </div>
            <!-- delete icon -->
            <div class="dropdown ml-auto mouser" style="cursor: pointer">
              <a class="flex items-center text-danger" href="javascript:;">
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
                  class="lucide lucide-trash-2"
                  @click="deleteFile(file)"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  <line x1="10" x2="10" y1="11" y2="17"></line>
                  <line x1="14" x2="14" y1="11" y2="17"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div
          v-else
          class="intro-y w-full block text-center rounded-md py-4 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
        >
          No files available. Add customer documents
          <a href="#"></a>
        </div>
      </div>
    </div>

    <!-- END: Latest Uploads -->

    <!-- Your form code here -->
    <div id="new-order-modal" class="modal" tabindex="-1" aria-hidden="true">
      <!-- Modal content -->
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal header -->
          <div class="modal-header">
            <h2 class="font-medium text-base mr-auto">
              Upload file <span>.jpeg .png .pdf</span>
            </h2>
          </div>
          <div
            v-if="loading"
            class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center"
          ></div>
          <!-- Modal body -->
          <div class="modal-body grid grid-cols-6 gap-4 gap-y-3">
            <div class="col-span-12">
              <label for="pos-form-1" class="form-label">Name</label>
              <div class="fallback">
                <input
                  ref="fileInput"
                  type="file"
                  multiple
                  @change="handleFileInputChange"
                />
              </div>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer text-right">
            <button
              type="button"
              data-tw-dismiss="modal"
              class="btn btn-outline-secondary w-32 mr-1"
            >
              Cancel
            </button>
            <button
              type="button"
              data-tw-dismiss="modal"
              class="btn btn-primary w-32"
              @click="uploadFiles"
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Content -->
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
      firstName: "",
      lastName: "",
      serviceId: "",
      updateStatus: "",
      transactionStatus: "",
      plans: [],
      multipleFiles: [],
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
      const id = this.$route.params.id;
      this.loading = true;
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          `/api/ctransation/get/transaction/${id}`,

          {
            headers: {
              token: token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.success) {
          const transaction = response.data.transaction;
          //   this.firstName = transaction.customerId.firstName
          //   this.lastName = transaction.customerId.lastName
          this.planId = transaction.planId._id;
          // console.log("Resultado da consola: ", transaction.customerId._id);
          this.transactionStatus = transaction.transactionStatus
          this.customerId = transaction.customerId._id;

          this.amount = transaction.amount;
          this.serviceId = transaction.serviceIds[0]._id;
          this.plans = transaction.planId.planService;
          //   console.log("Service ID", transaction.serviceIds[0]._id);

          if (transaction.multipleFiles) {
            this.multipleFiles = transaction.multipleFiles.split(",");
          } else {
            this.multipleFiles = [];
          }

          //   this.planId = response.data.user.plan[0]._id;

          this.loading = false;
        } else {
          throw new Error("Failed to fetch services");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        this.loading = false;
      }
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
        .put(`/api/transaction/uploadmultiplefiles/${id}`, formData, {
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
          this.fetch();
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
            .delete("/api/transaction/file/delete", {
              headers: {
                token: token,
              },
              data: {
                userId: this.$route.params.id,
                file: file,
              },
            })
            .then((response) => {
              console.log(response);
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
    async onUpdateTransaction() {
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

      if (this.transactionStatus === "") {
        Toast.fire({
          icon: "warning",
          title: "warning!",
          // title: "Error",
          text: "Please update status to 'In Progress' our 'Completed'",
          timer: 3000,
        });
      } else {
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

        formData.append("amount", this.amount);
        formData.append("serviceId", this.serviceId);
        formData.append("customerId", this.customerId);
        formData.append("transactionStatus", this.transactionStatus)

        formData.append("planId", this.planId);
        formData.append("paymentMethod", this.paymentMethod);

        this.btnloading = true;
        this.loading = true;
        const transactionId = this.$route.params.id;

        const response = await axios.put(
          `/api/update/transaction/${transactionId}`,
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
          // title: "Error",
          text: "Transaction updated successfully",
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
          //   console.error("Error creating post:", this.errorMessage);
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
</style>
