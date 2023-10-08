<template>
  <div>
    <h2 class="intro-y text-lg font-medium mt-10">Request history</h2>
    <label v-if="loading" class="shadow-md">
      <div class="spinner" style="font-size: 18px"></div>
    </label>

    <!-- BEGIN: Content -->
    <!-- BEGIN: Recent Activities -->
    <div class="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3">
      <div class="intro-x flex items-center h-10">
        <!-- <h2 class="text-lg font-medium truncate mr-5">Recent Activities</h2> -->
        <!-- <a href="#" class="ml-auto text-primary truncate">Show More</a> -->
        <div class="ml-auto text-primary">
          <button
            type="button"
            class="btn btn-outline-secondary w-24 mr-1 mt-5"
            @click="goBack"
          >
            Back
          </button>
        </div>
      </div>
      <div
        class="mt-5 relative before:block before:absolute before:w-px before:h-[85%] before:bg-slate-200 before:dark:bg-darkmode-400 before:ml-5 before:mt-5"
      >
        <div
          v-for="transaction in transactions"
          :key="transaction._id"
          class="intro-x relative flex items-center mb-3"
        >
          <div
            class="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5"
          >
            <div
              class="w-10 h-10 flex-none image-fit rounded-full overflow-hidden"
            >
              <img
                v-if="transaction.changedBy.avatar"
                class="tooltip rounded-full"
                :title="
                  transaction.avatarUploadDate
                    ? 'Uploaded at ' + transaction.avatarUploadDate
                    : 'Avatar Image'
                "
                alt="Company logo"
                :src="`${axios.defaults.baseURL}/${transaction.changedBy.avatar}`"
                @error="handleAvatarError"
                @load="handleAvatarLoad"
              />
              <img
                v-else
                src="../../../dist/images/logow.png"
                alt="profilecustomer"
                class="rounded-full"
              />
            </div>
          </div>
          <div class="box px-5 py-3 ml-4 flex-1 zoom-in">
            <div class="flex items-center">
              <div class="font-medium">
                {{ transaction.changedBy.firstName }}
                {{ transaction.changedBy.lastName }}
              </div>
              <div class="text-xs text-slate-500 ml-auto">
                {{ formatDateWithTime(transaction.date) }}
              </div>
            </div>
            <div
              class="lg:text-left mt-3 lg:mt-0"
              :class="getStatusClass(transaction.status)"
            >
              {{ transaction.status }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Recent Activities -->
    <!-- END: Content -->
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { utils, writeFile } from "xlsx";
import axios from "axios";
import html2pdf from "html2pdf.js";

export default {
  data() {
    return {
      transactions: [],
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,

      loading: false,
      pageSize: 10,
      count: 0,
      firstEntryIndex: 0,
      lastEntryIndex: 0,
      searchTerm: "",
    };
  },
  computed: {
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
    goBack() {
      this.$router.go(-1);
    },
    getAvatarUrl() {
      if (this.avatar) {
        // Assuming the base URL is "http://localhost:8000"
        return `${axios.defaults.baseURL}/${this.avatar.replace("\\", "/")}`;
      }
      // Return a default image URL if the avatar is not available
      return "../../../../dist/images/logow.png";
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
        const id = this.$route.params.id;
        const token = Cookies.get("token");
        const response = await axios.get(`/api/request/get/${id}`, {
          headers: {
            token: token,
          },
          params: {
            pageNumber: this.currentPage,
            pageSize: this.pageSize,
            searchTerm: this.searchTerm,
          },
        });

        this.transactions = response.data.customerRequest.statusHistory;
        // console.log("Hamas: ", this.transactions);
        // this.companyName = response.data.transactions[0].customerId.company.companyName
        // alert(this.companyName)
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
      } else if (status === "canceled") {
        return "text-danger";
      } else if (status === "Under_approval") {
        return "text-warning";
      } else if (status === "Under_assessment") {
        return "text-muted";
      } else if (status === "Received") {
        return "text-primary";
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
</style>
