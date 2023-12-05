<template>
  <div>
    <h2 class="intro-y text-2xl font-medium mt-10 text-center mr-auto">
      Best Price & Services
    </h2>
    <div class="intro-y flex items-center mt-8"></div>
    <!-- BEGIN: Pricing Layout -->
    <div class="flex flex-wrap justify-center mt-1 space-x-4 gap-4">
      <div
        class="intro-y box w-1/5 h-96 px-5 py-16"
        v-for="plan in allplans"
        :key="plan._id"
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
          class="block w-12 h-12 text-primary mx-auto lucide lucide-credit-card"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
        <p class="text-center mt-5" :class="getStatusClass(plan.status)">
          <b>{{ plan.status }}</b>
        </p>
        <div class="text-xl font-medium text-center mt-5">
          {{ plan.planName }}
        </div>
        <p class="text-center mt-5" style="font-size: 1.25rem">Description</p>
        <p
          class="text-slate-600 dark:text-slate-500 text-center mt-3"
          style="font-size: 1.05rem"
        >
          <span>{{ plan.planDescription }}</span>
        </p>
        <p class="text-center mt-5" style="font-size: 1.25rem">Area Of Cover</p>
        <div
          class="text-slate-500 px-10 text-center mx-auto mt-3"
          style="font-size: 1.05rem"
        >
          {{ plan.areaOfCover }}
        </div>
        <div class="flex justify-center mt-3">
          <div class="relative text-2xl font-semibold mt-8 mx-auto">
            <span class="absolute text-2xl top-0 left-0 -ml-4"></span>
            {{ formatCurrency(plan.planPrice) }}
          </div>
        </div>
        <div v-if="plan.status !== 'Inactive'">
        <router-link :to="`/viewservices/${plan._id}`">
          <button
            type="button"
            class="btn btn-rounded-primary py-3 px-4 block mx-auto mt-8"
          >
            Services
          </button>
        </router-link>
      </div>
        <div v-if="role === 1" class="flex justify-center mt-1">
          <router-link :to="`/updateplan/${plan._id}`">
            <button
              type="button"
              class="btn btn-rounded-secondary py-3 px-4 block mx-auto mt-8"
            >
              Edit
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- END: Pricing Layout -->
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { utils, writeFile } from "xlsx";
import axios from "axios";
import html2pdf from "html2pdf.js";
import "sweetalert2/dist/sweetalert2.css";
export default {
  data() {
    return {
      allplans: [],
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,
      loading: false,
      pageSize: 10,
      count: 0,
      firstEntryIndex: 0,
      lastEntryIndex: 0,
      searchTerm: "",
      status: "",
      role: null,
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
        const response = await axios.get("/api/allplans", {
          headers: {
            token: token,
          },
          params: {
            pageNumber: this.currentPage,
            pageSize: this.pageSize,
            searchTerm: this.searchTerm,
          },
        });

        this.allplans = response.data.plan;
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
      if (status === "Active") {
        return "text-success";
      } else if (status === "Inactive") {
        return "text-danger";
      } else {
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
    const role = Cookies.get("role");
    this.role = role === "1" ? 1 : 0; // Convert role to a number for strict comparison
  },
};
</script>
<style></style>
