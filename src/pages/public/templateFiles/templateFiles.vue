<template>
  <div>
    <label v-if="loading" class="shadow-md">
      <div class="spinner" style="font-size: 18px"></div>
    </label>
    <div class="grid grid-cols-12 gap-6 mt-5">
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

        <div class="hidden xl:block mx-auto text-slate-500">
          Showing {{ firstEntryIndex }} to {{ lastEntryIndex }} of
          {{ count }} entries
        </div>
        <div class="w-full xl:w-auto flex items-center mt-3 xl:mt-0">
          
        </div>
      </div>

      <!-- BEGIN: Data List -->

      <div class="intro-y col-span-12 overflow-auto 2xl:overflow-visible">
        <!-- BEGIN: Directory & Files -->
        <div class="intro-y grid grid-cols-12 gap-3 sm:gap-6 mt-5">
          <div
            v-for="file in fileTemplates"
            :key="file._id"
            class="intro-y col-span-6 sm:col-span-4 md:col-span-3 2xl:col-span-2"
          >
            <div
              class="file box rounded-md px-5 pt-8 pb-5 px-3 sm:px-5 relative zoom-in"
            >
              <div class="absolute left-0 top-0 mt-3 ml-3"></div>
              <a
                :href="getFilePath(file.fileTemplate)"
                target="_blank"
                class="w-3/5 file__icon file__icon--empty-directory mx-auto"
              ></a>
              <a
                :href="getFilePath(file.fileTemplate)"
                target="_blank"
                class="block font-medium mt-4 text-center truncate"
                >{{ file.description }}</a
              >
              <div class="text-slate-500 text-xs text-center mt-0.5">
                <!-- 120 MB -->
              </div>
              <div class="absolute top-0 right-0 mr-2 mt-3 dropdown ml-auto">
                <a
                  :href="getFilePath(file.fileTemplate)"
                  class="dropdown-toggle w-5 h-5 block"
                  aria-expanded="false"
                  data-tw-toggle="dropdown"
                >
                  <i
                    data-lucide="more-vertical"
                    class="w-5 h-5 text-slate-500"
                  ></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- END: Directory & Files -->
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
  </div>
</template>
<script>
import { utils, writeFile } from "xlsx";
import axios from "axios";
import html2pdf from "html2pdf.js";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      transactions: [],
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
      fileTemplates: "",
    };
  },
  computed: {
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
    getFilePath(file) {
      return `http://localhost:8000/${file}`;
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
        const response = await axios.get("/api/get/active/filetemplate", {
          headers: {
            token: token,
          },
          params: {
            pageNumber: this.currentPage,
            pageSize: this.pageSize,
            searchTerm: this.searchTerm,
          },
        });

        this.fileTemplates = response.data.fileTemplates;
        // console.log("Info", this.fileTemplates);
        this.count = response.data.count;
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
      if (status === "Completed") {
        return "text-success";
      } else if (status === "Pending") {
        return "text-pending";
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
