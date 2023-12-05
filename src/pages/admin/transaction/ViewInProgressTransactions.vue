<template>
  <div>
    <h2 class="intro-y text-lg font-medium mt-5">Transactions in progress</h2>
  
    <label v-if="loading" class="shadow-md">
      <div class="spinner" style="font-size: 18px"></div>
    </label>
    <div class="grid grid-cols-12 gap-6 mt-8">
      <div
        class="intro-y col-span-12 flex flex-wrap xl:flex-nowrap items-center mt-2"
      >
      <div class="flex w-full sm:w-auto">
          <div class="w-48 relative text-slate-500">
            <input
              type="text"
              class="form-control w-48 box pr-10"
              placeholder="Search..."
              v-model="searchTerm"
              @input="applyFilter"
            />
            <i
              class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
              data-lucide="search"
            ></i>
          </div>
        
        </div>
        <div class="ml-1">
            <!-- <label class="ml-5" for="startDate">Start Date:</label> -->
            <vue-flatpickr
              class="box pr-10 ml-2 custom-date-input"
              id="startDate"
              v-model="startDate"
              :config="datePickerConfig"
              placeholder="Select start Date"
            ></vue-flatpickr>

            <!-- <label class="ml-5" for="endDate">End Date:</label> -->
            <vue-flatpickr
              class="box pr-10 ml-2 custom-date-input"
              id="endDate"
              v-model="endDate"
              :config="datePickerConfig"
              placeholder="Select last Date"
            ></vue-flatpickr>

            <button
              class="btn btn-outline-primary inline-block ml-5"
              @click="applyFilterDate"
            >
              Search by date
            </button>
            <button
              class="btn btn-outline-primary inline-block ml-5"
              @click="refresh"
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
                class="w-3 h-3 lucide lucide-refresh-ccw"
              >
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 16h5v5" />
              </svg>
            </button>
            
          </div>

        <div class="hidden xl:block mx-auto text-slate-500">
          Showing {{ firstEntryIndex }} to {{ lastEntryIndex }} of
          {{ count }} entries
        </div>
        <div class="w-full xl:w-auto flex items-center mt-3 xl:mt-0">
          <!-- <button class="btn btn-primary shadow-md mr-2" @click="exportToExcel">
            <i data-lucide="file-text" class="w-4 h-4 mr-2"></i> Export to Excel
          </button> -->
        </div>
      </div>

      <!-- BEGIN: Data List -->

      <div class="intro-y col-span-12 overflow-auto 2xl:overflow-visible">
        <table class="table table-report -mt-2">
          <thead>
            <tr>
              <th class="whitespace-nowrap">INVOICE</th>
              <th class="whitespace-nowrap">Company</th>
              <th class="whitespace-nowrap">Partner</th>
              <th class="whitespace-nowrap">Customer</th>
              <th class="text-center whitespace-nowrap">Amount</th>
              <th class="whitespace-nowrap">Service</th>
              <th class="twhitespace-nowrap">
                <div class="">Created At</div>
              </th>
              <th class="twhitespace-nowrap">
                <div class="">Updated At</div>
              </th>
              <th class="text-right whitespace-nowrap">
                <div class="pr-16">Status</div>
              </th>

              <th class="text-center whitespace-nowrap">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="transaction in transactions"
              :key="transaction._id"
              class="intro-x"
            >
              <td class="w-40 !py-4">
                <a class="decoration-dotted whitespace-nowrap">{{
                  transaction.invoiceNumber
                }}</a>
              </td>
              <td class="w-40 !py-4">
                <div
                  v-if="
                    transaction.customerId &&
                    transaction.customerId.company !== undefined
                  "
                  class="decoration-dotted whitespace-nowrap"
                >
                  {{ transaction.customerId.company.companyName }}
                </div>
                <div v-else class="decoration-dotted whitespace-nowrap">
                  Individual
                </div>
              </td>
              <td class="w-40 !py-4">
                <a class="decoration-dotted whitespace-nowrap">{{
                  transaction.user.partnerUser.partnerName
                }}</a>
              </td>
              <td class="w-40">
                <a class="font-medium whitespace-nowrap"
                  >{{ transaction.customerId.firstName }}
                  {{ transaction.customerId.lastName }}
                </a>
              </td>
              <td class="text-center">
                <!-- outra abordagem que poderei usar se esta tiver problemas e ver se transacao status igual a revoked mostrar revokedAmount caso contrario mostrar amount -->
                <div
                  v-if="
                    transaction.transactionStatus !== 'Revoked' &&
                    transaction.transactionStatus !== 'Canceled'
                  "
                  class="flex items-center justify-center whitespace-nowrap"
                >
                  {{ formatCurrency(transaction.amount) }}
                </div>
                <div
                  v-else
                  class="flex items-center justify-center whitespace-nowrap"
                >
                  {{ formatCurrency(transaction.revokedAmount) }}
                </div>
              </td>
              <td>
                <div class="whitespace-nowrap">
                  {{ transaction.serviceIds[0].serviceName }}
                </div>
              </td>
              <td>
                <div class="whitespace-nowrap">
                  {{ formatDateWithTime(transaction.createdAt) }}
                </div>
              </td>
              <td>
                <div class="whitespace-nowrap">
                  {{ formatDateWithTime(transaction.updatedAt) }}
                </div>
              </td>
              <td class="w-40 !py-4">
                <div
                  class="whitespace-nowrap"
                  :class="getStatusClass(transaction.transactionStatus)"
                >
                  {{ transaction.transactionStatus }}
                </div>
              </td>
              <td class="table-report__action">
                <div class="flex justify-center items-center">
                  <a
                    href="javascript:;"
                    class="flex items-center text-primary whitespace-nowrap mr-5"
                    @click="openTransactionFilesModal(transaction)"
                    data-tw-toggle="modal"
                    data-tw-target="#files-modal"
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
                      class="w-4 h-4 mr-1 lucide lucide-file-symlink"
                    >
                      <path
                        d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v7"
                      />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="m10 18 3-3-3-3" />
                      <path d="M4 18v-1a2 2 0 0 1 2-2h6" />
                    </svg>
                    Files
                  </a>
                  <a
                    v-if="transaction.transactionStatus === 'Pending'"
                    class="flex items-center text-primary whitespace-nowrap mr-5"
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
                      class="w-4 h-4 mr-1 lucide lucide-pencil"
                    >
                      <path
                        d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"
                      />
                      <path d="m15 5 4 4" />
                    </svg>
                    <router-link
                      :to="`/customertransactiondetail/${transaction._id}`"
                    >
                      Edit
                    </router-link>
                  </a>
                  <a
                    v-if="transaction.transactionStatus === 'Completed'"
                    class="flex items-center text-primary whitespace-nowrap mr-5"
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
                      class="w-4 h-4 mr-1 lucide lucide-file-symlink"
                    >
                      <path
                        d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v7"
                      />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="m10 18 3-3-3-3" />
                      <path d="M4 18v-1a2 2 0 0 1 2-2h6" />
                    </svg>

                    <router-link :to="`/transactioninvoice/${transaction._id}`"
                      >Invoice</router-link
                    >
                  </a>
                  <a
                    v-if="
                      transaction.transactionStatus !== 'Completed' &&
                      transaction.transactionStatus !== 'Canceled'
                    "
                    class="flex items-center text-primary whitespace-nowrap mr-5"
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
                      class="w-4 h-4 mr-1 lucide lucide-trash-2"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" x2="10" y1="11" y2="17" />
                      <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>

                    <router-link :to="`/canceltransaction/${transaction._id}`"
                      >Cancel</router-link
                    >
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- END: Data List -->
      <div
        v-if="loading"
        class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center"
      >
        <i data-loading-icon="puff" class="w-8 h-8"></i>
        <div class="text-center text-xs mt-2">Loading...</div>
      </div>

      <!-- BEGIN: Pagination -->
      <div
        class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center"
      >
        <nav class="w-full sm:w-auto sm:mr-auto">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" @click="previousPage">
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
                  class="w-4 h-4 lucide lucide-chevron-left"
                >
                  <path d="m11 17-5-5 5-5" />
                  <path d="m18 17-5-5 5-5" />
                </svg>
              </a>
            </li>

            <li
              class="page-item"
              v-for="page in totalPages"
              :key="page"
              :class="{ active: isActivePage(page) }"
            >
              <a class="page-link" @click="goToPage(page)">{{ page }}</a>
            </li>

            <li class="page-item">
              <a class="page-link" @click="nextPage">
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
                  class="w-4 h-4 lucide lucide lucide-chevrons-right"
                >
                  <path d="m6 17 5-5-5-5" />
                  <path d="m13 17 5-5-5-5" />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
        <select
          class="w-20 form-select box mt-3 sm:mt-0"
          v-model="pageSize"
          @change="changePageSize"
        >
          <option>10</option>
          <option>25</option>
          <option>35</option>
          <option>50</option>
          <option>100</option>
          <option>500</option>
          <option>1000</option>
        </select>
      </div>
      <!-- END: Pagination -->
    </div>
    <!-- BEGIN: transaction Modal -->
    <div id="files-modal" class="modal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body p-0">
            <div class="p-5 text-center">
              <i
                data-lucide="x-circle"
                class="w-16 h-16 text-danger mx-auto mt-3"
              ></i>
              <div class="text-3xl mt-5">Transaction files</div>
              <div class="text-slate-500 mt-2">
                <ul>
                  <li v-for="(file, index) in transactionFiles" :key="file">
                    {{ index + 1 }}.
                    <a :href="getFilePath(file)" target="_blank">{{
                      shortenFileName(file)
                    }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="px-5 pb-8 text-center">
              <button
                type="button"
                data-tw-dismiss="modal"
                class="btn btn-outline-secondary w-24 mr-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END: transaction Modal -->

    <!-- END: Content -->
  </div>
</template>
<script>
import { utils, writeFile } from "xlsx";
import axios from "axios";
import html2pdf from "html2pdf.js";
import Cookies from "js-cookie";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";

export default {
  data() {
    return {
      transactions: [],
      transactionFiles: [], // Initialize as an empty array
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,
      firtName: "",
      lastName: "",
      idType: "",
      loading: false,
      pageSize: 10,
      count: 0,
      firstEntryIndex: 0,
      lastEntryIndex: 0,
      searchTerm: "",
      inprogress: "",
      revoked: "",
      aproved: "",
      pending: "",
      completed: "",
      inprogressCount: "",
      revokedCount: "",
      aprovedCount: "",
      pendingCount: "",
      completedCount: "",
      canceled: "",
      canceledCount: "",
      averageApprovalTime: "",
      startDate: "",
      endDate: "",
      selectedDate: null,
    };
  },
  computed: {
    datePickerConfig() {
      return {
        // mode: "range", // Enables range selection mode
        dateFormat: "Y-m-d", // Customize the date format
      };
    },
    formattedAverageApprovalTime() {
      const totalMilliseconds = this.averageApprovalTime;
      const totalSeconds = Math.floor((totalMilliseconds / 1000) % 60);
      const totalMinutes = Math.floor((totalMilliseconds / (1000 * 60)) % 60);
      const totalHours = Math.floor(
        (totalMilliseconds / (1000 * 60 * 60)) % 24
      );
      const totalDays = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));

      let formattedTime = "";
      if (totalDays > 0) {
        formattedTime += `${totalDays} days `;
      }
      if (totalHours > 0) {
        formattedTime += `${totalHours} hours `;
      }
      if (totalMinutes > 0) {
        formattedTime += `${totalMinutes} minutes `;
      }
      if (totalSeconds > 0 || formattedTime === "") {
        formattedTime += `${totalSeconds} seconds`;
      }

      return formattedTime;
    },
    hasPreviousPage() {
      return this.currentPage > 1;
    },
    hasNextPage() {
      return this.currentPage < this.totalPages;
    },
  },
  watch: {
    currentPage: "fetchData",
    pageSize: "fetchData",
    searchTerm: "fetchData",
  },
  methods: {
    refresh(){
      this.startDate = null,
      this.endDate = null,
      this.searchTerm = null,
      this.fetchData();
    },
    applyFilterDate() {
      // Check if both start and end dates are selected
      if (this.startDate && this.endDate) {
        // Convert the selected dates to ISO format
        const isoStartDate = new Date(this.startDate).toISOString();
        const isoEndDate = new Date(this.endDate).toISOString();

        // Process the selected date range (e.g., make an API request)
        console.log("Selected Date Range:");
        console.log("Start Date:", isoStartDate);
        console.log("End Date:", isoEndDate);

        // Reset currentPage to 1 when applying a new filter
        this.currentPage = 1;
       
          this.fetchData();
        
      } else {
        // Handle the case where one or both dates are not selected
        // console.log("Please select both start and end dates.");
        Swal.fire({
          icon: "warning",
          title: "Warning!",
          toast: true,
          text: "Please select both start and end dates.",
          timer: 3000,
          showConfirmButton: false,
          position: "top-end",
        });
      }
    },
    shortenFileName(fileName, maxLength = 20) {
      if (fileName.length > maxLength) {
        return fileName.slice(0, maxLength) + "...";
      } else {
        return fileName;
      }
    },
    openTransactionFilesModal(transaction) {
      // Replace this logic with fetching the files for the selected transaction
      // For example, you can populate this.transactionFiles with your file data.
      this.transactionFiles = transaction.multipleFiles.split(",");

      // Open the modal
      const modal = document.getElementById("files-modal");
      modal.style.display = "block";
    },
    getFilePath(file) {
      return `${axios.defaults.baseURL}/${file}`;
    },
    formatNumber(number) {
      // Check if the input is a valid number
      if (isNaN(number)) {
        return "Invalid Number";
      }

      // Convert the number to a string and split it into parts
      const parts = number.toString().split(".");

      // Format the integer part with commas as thousands separators
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      // Join the integer and decimal parts with a dot
      return parts.join(".");
    },

    formatDateWithTime(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    formatCurrency(value) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      return formatter.format(value);
    },
    isActivePage(page) {
      return page === this.currentPage;
    },
    async fetchData() {
      try {
        this.loading = true;

        const token = Cookies.get("token");
         // Prepare the query parameters for the API request
         const queryParams = {
          pageNumber: this.currentPage,
          pageSize: this.pageSize,
          searchTerm: this.searchTerm,
        };

        // Check if both start and end dates are selected
        if (this.startDate && this.endDate) {
          queryParams.startDate = this.startDate;
          queryParams.endDate = this.endDate;
        }
        const response = await axios.get("/api/ctransation/get/transaction/inprogress", {
          headers: {
            token: token,
          },
          params: queryParams,
        });

        this.transactions = response.data.transactions;
        // console.log(response.data.transactions);
        this.count = response.data.total;
        this.totalPages = Math.ceil(this.count / this.pageSize);

        // Update the firstEntryIndex and lastEntryIndex values based on the current page and pageSize
        this.firstEntryIndex = (this.currentPage - 1) * this.pageSize + 1;
        this.lastEntryIndex = Math.min(
          this.currentPage * this.pageSize,
          this.count
        );
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    applyFilter() {
      this.currentPage = 1;
      this.fetchData();
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchData();
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchData();
      }
    },
    goToPage(page) {
      if (page !== this.currentPage) {
        this.currentPage = page;
        this.fetchData();
      }
    },
    async changePageSize() {
      this.currentPage = 1;
      this.itemsPerPage = this.pageSize;
      await this.fetchData();
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
    exportToExcel() {
      const table = document.querySelector("table");
      const workbook = utils.table_to_book(table);
      writeFile(workbook, "service_list.xlsx");
    },
    exportToPDF() {
      const table = document.querySelector("table");
      setTimeout(() => {
        const element = document.createElement("div");
        element.appendChild(table);
        html2pdf()
          .set({ filename: "transactions_list.pdf" })
          .from(element)
          .save();
      }, 500);
    },
  },
  created() {
    this.fetchData();

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
