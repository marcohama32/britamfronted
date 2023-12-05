<template>
  <div>
    <div class="intro-y flex items-center mt-8">
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
      <h2 class="text-lg font-medium mr-auto">Customer Invoice</h2>
      <button
        type="button"
        class="btn btn-outline-secondary w-24 mr-1 mt-5"
        @click="goBack"
      >
        Back
      </button>
      <div>
        <button class="btn btn-primary mt-5" @click="DonloadInvoice" :disabled="loading">
          Download
          
        </button>
      </div>
    </div>

    <!-- BEGIN: Invoice -->
    <div id="print-content" class="intro-y box overflow-hidden mt-5">
      <div
        class="border-b border-slate-200/60 dark:border-darkmode-400 text-center sm:text-left"
      >
        <div class="px-5 py-10 sm:px-20 sm:py-20">
          <div class="text-primary font-semibold text-3xl">INVOICE</div>
          <div class="mt-2">
            Receipt: <span class="font-medium">{{ invoiceNumber }}</span>
          </div>
          <div class="mt-1">{{ updatedAt }}</div>
        </div>
        <div
          class="flex flex-col lg:flex-row px-5 sm:px-20 pt-10 pb-10 sm:pb-20"
        >
          <div>
            <div class="text-base text-slate-500">Client Details</div>
            <div class="text-lg font-medium text-primary mt-2">
              {{ firstName }} {{ lastName }}
            </div>
            <div class="mt-1">{{ email }}</div>
            <div class="mt-1">{{ address }}</div>
            <div class="mt-1">{{ contact1 }} , {{ contact2 }}</div>
            <div class="mt-1"></div>
          </div>
          <div class="lg:text-right mt-10 lg:mt-0 lg:ml-auto">
            <div class="text-base text-slate-500">Payment to</div>
            <div class="text-lg font-medium text-primary mt-2">
              {{ partnerName }}
            </div>
            <div class="mt-1">{{ partnerEmail }}</div>
            <div class="mt-1">
              {{ partnerContact1 }} , {{ partnerContact2 }}
            </div>
          </div>
        </div>
      </div>
      <div class="px-5 sm:px-16 py-10 sm:py-20">
        <div class="overflow-x-auto">
          <table class="table">
            <thead>
              <tr>
                <th
                  class="border-b-2 dark:border-darkmode-400 whitespace-nowrap"
                >
                  Service
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border-b dark:border-darkmode-400">
                  <div class="font-medium whitespace-nowrap">
                    {{ service }}
                  </div>
                  <div class="text-slate-500 text-sm mt-0.5 whitespace-nowrap">
                    {{ serviceAreaOfCover }}
                  </div>
                  <div class="text-slate-500 text-sm mt-0.5 whitespace-nowrap">
                    {{ serviceDescription }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        class="px-5 sm:px-20 pb-10 sm:pb-20 flex flex-col-reverse sm:flex-row"
      >
        <div class="text-center sm:text-left mt-10 sm:mt-0">
          <div class="text-base text-slate-500">Processed by</div>
          <div class="text-lg text-primary font-medium mt-2">
            {{ agentPartnerFirstName }} {{ agentPartnerLastName }}
          </div>
          <div class="mt-1">
            {{ agentPartnerContact1 }} , {{ agentPartnerContact2 }}
          </div>
          <div class="mt-1"></div>
        </div>
        <div class="text-center sm:text-right sm:ml-auto">
          <div class="text-base text-slate-500">Amount</div>
          <div class="text-xl text-primary font-medium mt-2">
            {{ formatCurrency(amount) }}
          </div>
          <div class="mt-1">Taxes included</div>
        </div>
      </div>
    </div>
    <!-- END: Invoice -->
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
      plan: "",
      errorMessage: "",

      transactions: "",
      firstName: "",
      lastName: "",
      invoiceNumber: "",
      transactionStatus: "",
      email: "",
      amount: "",
      contact1: "",
      contact2: "",
      updatedAt: "",
      address: "",
      service: "",
      serviceAreaOfCover: "",
      serviceDescription: "",
      agentPartnerFirstName: "",
      agentPartnerLastName: "",
      agentPartnerContact1: "",
      agentPartnerContact2: "",
      partnerName: "",
      partnerEmail: "",
      partnerContact1: "",
      partnerContact2: "",

      status: "",
    };
  },
  watch: {
    id() {
      this.getProfile();
    },
  },
  created() {
    this.getProfile();
  },
  computed: {
    // filesArray() {
    //   const filesString = this.user.multipleFiles;
    //   return filesString.split(",");
    // },
  },
  methods: {
    async DonloadInvoice() {
      this.loading = true;
      const transactionId = this.$route.params.id;
      const token = Cookies.get("token");

      try {
        const response = await axios.get(
          `/api/get/britamcustomerinvoice/${transactionId}`,
          {
            headers: {
              token: token,
            },
            responseType: "blob", // Set the response type to 'blob' to handle binary data
          }
        );

        this.loading = false;

        // Check if the response is an error
        if (response.data.type === "application/json") {
          const reader = new FileReader();
          reader.onload = (e) => {
            const errorResponse = JSON.parse(e.target.result);
            this.errorMessage = errorResponse.error;
            console.error("Error retrieving plan:", this.errorMessage);
          };
          reader.readAsText(response.data);
        } else {
          // Create a Blob object with the binary data
          const blob = new Blob([response.data], { type: "application/pdf" });

          // Create a temporary URL for the Blob object
          const url = window.URL.createObjectURL(blob);

          // Create a link element to trigger the download
          const link = document.createElement("a");
          link.href = url;
          link.download = `invoice_${transactionId}.pdf`;

          // Trigger a click event on the link to start the download
          link.click();

          // Release the URL object
          window.URL.revokeObjectURL(url);
        }
      } catch (error) {
        this.errorMessage = "Error retrieving this plan. Please try again."; // Set the error message
        console.error("Error retrieving plan:", error);
      }
    },

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
    getStatusClass(status) {
      if (status === "Done") {
        return "text-success";
      } else if (status === "Pending") {
        return "text-pending";
      } else if (status === "Canceled") {
        return "text-danger";
      } else if (status === "Under_approval") {
        return "text-warning";
      } else if (status === "Under_assessment") {
        return "text-muted";
      } else if (status === "Received") {
        return "text-primary";
      } else if (status === "Completed") {
        return "text-success";
      } else if (status === "Revoked") {
        return "text-danger";
      }
      {
        return ""; // Default class if no match
      }
    },

    getRole(role) {
      if (role === 1) {
        return "Admin";
      } else if (role === 2) {
        return "Line Manager";
      } else if (role === 3) {
        return "Agent";
      }
      {
        return ""; // Default class if no match
      }
    },
    getProfile() {
      this.loading = true;
      const id = this.$route.params.id;
      const token = Cookies.get("token");
      axios
        .get(`/api/ctransation/get/transaction/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          this.loading = false;
          // Update the component's data with the received response
          // console.log("NAme", transactions.user.partnerUser.contact2 );

          const transactions = response.data.transaction;
          this.firstName = transactions.customerId.firstName;
          this.lastName = transactions.customerId.lastName;
          this.invoiceNumber = transactions.invoiceNumber;
          this.transactionStatus = transactions.transactionStatus;
          this.email = transactions.customerId.email;
          this.amount = transactions.amount;
          this.contact1 = transactions.customerId.contact1;
          this.contact2 = transactions.customerId.contact2;
          this.address = transactions.customerId.address;
          this.updatedAt = this.formatDate(transactions.updatedAt);
          this.service = transactions.serviceIds[0].serviceName;
          this.serviceAreaOfCover =
            transactions.serviceIds[0].serviceAreaOfCover;
          this.serviceDescription =
            transactions.serviceIds[0].serviceDescription;
          this.agentPartnerFirstName = transactions.user.firstName;
          this.agentPartnerLastName = transactions.user.lastName;
          this.agentPartnerContact1 = transactions.user.contact1;
          this.agentPartnerContact2 = transactions.user.contact2;
          this.partnerName = transactions.user.partnerUser.partnerName;
          this.partnerEmail = transactions.user.partnerUser.email;
          this.partnerContact1 = transactions.user.partnerUser.contact1;
          this.partnerContact2 = transactions.user.partnerUser.contact2;

          if (transactions.multipleFiles) {
            this.multipleFiles = transactions.multipleFiles.split(",");
          } else {
            this.multipleFiles = [];
          }
        })
        .catch((error) => {
          this.errorMessage = "Error retrieving this plan. Please try again."; // Set the error message
          console.error("Error retrieving plan:", error);
        });
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
            .delete("api/admin/file/delete", {
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

    getAvatarUrl() {
      if (this.avatar) {
        // Assuming the base URL is "http://localhost:8000"
        return `${axios.defaults.baseURL}/${this.avatar.replace("\\", "/")}`;
      }
      // Return a default image URL if the avatar is not available
      return "../../../../dist/images/logow.png";
    },
  },
};
</script>
<style></style>
