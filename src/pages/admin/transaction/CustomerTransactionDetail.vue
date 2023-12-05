<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Aprove our Revoke Transaction</h2>
      <label v-if="loading" class="shadow-md">
        <div class="spinner" style="font-size: 18px"></div>
      </label>
    </div>
    <form @submit.prevent="" enctype="multipart/form-data" data-single="true">
      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="intro-y col-span-12 lg:col-span-6">
          <!-- BEGIN: Form Layout -->
          <div class="intro-y box p-5">
            <div class="grid grid-cols-2 gap-6 mt-3">
              <div>
                <label for="crud-form-15" class="form-label">Name:</label>
                <div class="mt-2"></div>
                <label for="" class="form-control"
                  ><strong>{{ firstName }} {{ lastName }}</strong></label
                >
              </div>
              <div>
                <label for="crud-form-4" class="form-label mt-2">Date:</label>
                <div class="mt-2"></div>
                <label for="" class="form-control"
                  ><strong>{{ updatedAt }}</strong></label
                >
              </div>
            </div>

            <div class="grid grid-cols-2 gap-6 mt-3">
              <div>
                <label for="crud-form-4" class="form-label mt-2"
                  >Partner:</label
                >
                <div class="mt-2"></div>
                <label for="" class="form-control"
                  ><strong>{{ partnerName }}</strong></label
                >
              </div>
              <div>
                <label for="crud-form-18" class="form-label">Amount:</label>
                <div class="mt-2"></div>
                <label for="" class="form-control"
                  ><strong>{{ formatCurrency(amount) }}</strong></label
                >
              </div>
            </div>
            <div class="grid grid-cols-2 gap-6 mt-3">
              <div>
                <label for="crud-form-18" class="form-label">Service:</label>
                <div class="mt-2"></div>
                <label for="" class="form-control"
                  ><strong>{{ service }}</strong></label
                >
              </div>
              <div>
                <label for="crud-form-21" class="form-label"
                  >Area of Cover:</label
                >
                <div class="mt-2"></div>
                <label for="" class="form-control"
                  ><strong>{{ serviceAreaOfCover }}</strong></label
                >
              </div>
            </div>

            <div class="grid grid-cols-6 gap-12 mt-3">
              <div>
                <label for="crud-form-4" class="form-label"
                  >Service Description</label
                >
                <div class="mt-1"></div>
                <div class="input-group">
                  <textarea
                    v-model="serviceDescription"
                    id="crud-form-6"
                    rows="5"
                    class="form-control"
                    placeholder="description"
                    aria-describedby="input-group-1"
                    disabled
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- BEGIN: Latest Uploads -->
            <div class="mt-4"></div>
            <div class="intro-y box col-span-12 lg:col-span-12">
              <div
                class="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400"
              >
                <h2 class="">Documents</h2>
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
                <!-- <button
                  data-tw-toggle="modal"
                  data-tw-target="#new-order-modal"
                  class="btn btn-outline-secondary hidden sm:flex"
                  
                >
                  Add files
                </button> -->
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
                    <a
                      :href="getFilePath(file)"
                      target="_blank"
                      class="font-medium"
                    >
                      {{ file }}</a
                    >
                    <div class="text-slate-500 text-xs mt-0.5">
                      {{ getFileSize(file) }}
                    </div>
                  </div>
                  <!-- delete icon -->
                  <!-- <div class="dropdown ml-auto mouser" style="cursor: pointer">
                    <a
                      class="flex items-center text-danger"
                      href="javascript:;"
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
                  </div> -->
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

            <!-- END: Latest Uploads -->

            <div class="text-right mt-8">
              <button
                type="button"
                class="btn btn-outline-secondary w-24 mr-1"
                @click="goBack"
              >
                Cancel
              </button>

              <button
                @click="aprove()"
                type="submit"
                class="btn btn-success text-white w-24 mr-1"
                :disabled="btnloading"
              >
                Aprove
              </button>
              <button
                @click="revoke()"
                type="submit"
                class="btn btn-primary w-24"
                :disabled="btnloading"
              >
                Revoke
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
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";

export default {
  data() {
    return {
      plan: "",
      errorMessage: "",
      loading: false,
      btnloading: false,
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
      multipleFiles: [],
      startDate: "",
      endDate: "",
      selectedDate: null,

      status: "",
    };
  },
  //   watch: {
  //     id() {
  //       this.getProfile();
  //     },
  //   },
  created() {
    this.getProfile();
  },
  computed: {
    datePickerConfig() {
      return {
        // mode: "range", // Enables range selection mode
        dateFormat: "Y-m-d", // Customize the date format
      };
    },
    filesArray() {
      const filesString = this.user.multipleFiles;
      return filesString.split(",");
    },
  },
  methods: {
    async aprove() {
      // const message = {
      //   text: this.newMessage,
      //   senderId: this.profileId,
      //   receiverId: this.receiverUser,
      // };
      this.loading = true;
      this.btnloading = true;
      const token = Cookies.get("token");
      const transactionId = this.$route.params.id;
      try {
        const response = await axios.put(
          `api/aprove/transaction/${transactionId}`,
          {},
          {
            headers: {
              token: token,
            },
          }
        );

        //   // Emit the chat message event
        //   this.$socket.emit("chat message", message);

        //   // Emit the notification event
        //   this.$socket.emit("notification", {
        //     receiverId: this.receiverUser,
        //     // message: "You have a new message",
        //   });
        Swal.fire({
          icon: "warning",
          title: "Warning!",
          toast: true,
          text: `Invoice ${this.invoiceNumber} aproved`,
          timer: 3000,
          showConfirmButton: false,
          position: "top-end",
        });

        this.btnloading = false;
        this.loading = false;
        this.$router.push("/customertransactions");
        this.isSuccess = true;
        console.log(response);
      } catch (error) {
        this.btnloading = false;
        this.loading = false;
        Swal.fire({
          icon: "warning",
          title: "Warning!",
          toast: true,
          text: `${error.response.data.error}`,
          timer: 5000,
          showConfirmButton: false,
          position: "top-end",
        });
        this.$router.push("/customertransactions");
        console.error("Error aproving invoice:", error);
      }
    },
    async revoke() {
      // const message = {
      //   text: this.newMessage,
      //   senderId: this.profileId,
      //   receiverId: this.receiverUser,
      // };
      this.loading = true;
      this.btnloading = true;
      const token = Cookies.get("token");
      const transactionId = this.$route.params.id;
      try {
        const response = await axios.put(
          `api/revoke/transaction/${transactionId}`,
          {},
          {
            headers: {
              token: token,
            },
          }
        );

        //   // Emit the chat message event
        //   this.$socket.emit("chat message", message);

        //   // Emit the notification event
        //   this.$socket.emit("notification", {
        //     receiverId: this.receiverUser,
        //     // message: "You have a new message",
        //   });
        Swal.fire({
          icon: "warning",
          title: "Warning!",
          toast: true,
          text: `Invoice ${this.invoiceNumber} revoked`,
          timer: 3000,
          showConfirmButton: false,
          position: "top-end",
        });

        this.btnloading = false;
        this.loading = false;
        this.$router.push("/customertransactions");
        this.isSuccess = true;
        console.log(response);
      } catch (error) {
        this.btnloading = false;
        this.loading = false;
        Swal.fire({
          icon: "warning",
          title: "Warning!",
          toast: true,
          text: `${error.response.data.error}`,
          timer: 5000,
          showConfirmButton: false,
          position: "top-end",
        });
        this.$router.push("/customertransactions");
        console.error("Error revoking invoice:", error);
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
    async getProfile() {
      this.btnloading = true;
      this.loading = true;
      const id = this.$route.params.id;
      const token = Cookies.get("token");
      await axios
        .get(`/api/ctransation/get/transaction/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          this.btnloading = false;
          this.loading = false;

          const transactions = response.data.transaction;
          this.firstName = transactions.customerId.firstName;
          this.lastName = transactions.customerId.lastName;
          this.invoiceNumber = transactions.invoiceNumber;

          this.amount = transactions.amount;

          this.updatedAt = this.formatDate(transactions.updatedAt);
          this.service = transactions.serviceIds[0].serviceName;
          this.serviceAreaOfCover =
            transactions.serviceIds[0].serviceAreaOfCover;
          this.serviceDescription =
            transactions.serviceIds[0].serviceDescription;

          this.partnerName = transactions.user.partnerUser.partnerName;

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

    getFilePath(file) {
      
      return `${axios.defaults.baseURL}/${file}`;
      // return `http://localhost:8000/${file}`;

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
