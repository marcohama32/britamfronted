<template>
  <div>
    <h2 class="intro-y text-lg font-medium mt-10">Services</h2>
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
          <!-- Showing {{ firstEntryIndex }} to {{ lastEntryIndex }} of
          {{ count }} entries -->
        </div>
        <div v-if="role === 1" class="w-full xl:w-auto flex items-center mt-3 xl:mt-0">
          <router-link :to="`/createservice/${this.$route.params.id}`">
            <button  class="btn btn-primary shadow-md mr-2">
              <i data-lucide="file-text" class="w-4 h-4 mr-2"></i>Add service
            </button>
          </router-link>
        </div>
      </div>

      <!-- BEGIN: Users Layout -->
      <div
        class="intro-y col-span-12 md:col-span-6 lg:col-span-4"
        v-for="partner in allPartners"
        :key="partner._id"
      >
        <div class="box">
          <div class="flex items-start px-5 pt-5">
            <div class="w-full flex flex-col lg:flex-row items-left">
              <div
                class="lg:ml-4 text-left lg:text-left mt-3 lg:mt-0"
                :class="getStatusClass(partner.status)"
              >
                <label class="font-medium">{{ partner.status }}</label>
                <div class="text-slate-500 text-xs mt-0.5">
                  <strong>{{ formatCurrency(partner.servicePrice) }}</strong>
                </div>
              </div>
            </div>
            <div v-if="role === 1" class="absolute right-0 top-0 mr-5 mt-3 dropdown">
              <a
                class="dropdown-toggle w-5 h-5 block"
                href="javascript:;"
                aria-expanded="false"
                data-tw-toggle="dropdown"
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
                  class="lucide lucide-more-horizontal"
                >
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </a>
              <div class="dropdown-menu w-40">
                <div class="dropdown-content">
                  <router-link :to="`/updateservice/${partner._id}`">
                    <label class="dropdown-item">
                      Edit
                    </label>
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <div
            class="text-center lg:text-left p-5 text-slate-500 text-xs mt-0.5"
          >
            <div>
              {{ partner.serviceDescription }}
            </div>
            <div
              class="flex items-center justify-left lg:justify-start text-slate-500 mt-5"
            >
              {{ partner.serviceName }}
            </div>
            <div
              class="flex items-center justify-left lg:justify-start text-slate-500 mt-1"
            >
              {{ partner.serviceAreaOfCover }}
            </div>
          </div>
        </div>
      </div>

      <!-- END: Users Layout -->

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
        </select>
      </div>
      <!-- END: Pagination -->
    </div>

    <!-- END: Content -->
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
      allPartners: [],
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 15,
      loading: false,
      pageSize: 10,
      count: 0,
      firstEntryIndex: 0,
      lastEntryIndex: 0,
      searchTerm: "",
      status: "",
      role: null
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
        const id = this.$route.params.id;
        const token = Cookies.get("token");
        const response = await axios.get(`/api/plan/${id}/?pageSize=9/`, {
          headers: {
            token: token,
          },
          params: {
            pageNumber: this.currentPage,
            pageSize: this.pageSize,
            searchTerm: this.searchTerm,
          },
        });

        this.allPartners = response.data.plan.planService;
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
  mounted() {
  // Unwrap the proxy into a regular array
  this.allPartners = Array.from(this.allPartners);
  // OR
  // this.allPartners = [...this.allPartners];

  console.log("allPartners:", this.allPartners);
}
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
