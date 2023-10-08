<template>
  <div>
    <h2 class="intro-y text-lg font-medium mt-10">
      Partner users</h2>
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

        <!-- add btn -->
        <router-link :to="`/createpartneruser/${this.$route.params.id}`">
        <div class="intro-y flex flex-col sm:flex-row items-center ml-2">
          <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
            <div class="dropdown ml-auto sm:ml-0">
              <button
                class="dropdown-toggle btn px-2 box"
                aria-expanded="false"
                data-tw-toggle="dropdown"
              >
                <span class="w-5 h-5 flex items-center justify-center">
                
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
                    class="lucide lucide-plus w-4 h-4"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </router-link>
        <!--  -->

        <div class="hidden xl:block mx-auto text-slate-500">
          Showing {{ firstEntryIndex }} to {{ lastEntryIndex }} of
          {{ count }} entries
        </div>
        
      </div>

      <!-- BEGIN: Data List -->
      <div
        class="intro-y col-span-12 md:col-span-4"
        v-for="partner in allPartners"
        :key="partner._id"
      >
        <div class="box">
          <div class="flex flex-col lg:flex-row items-center p-5">
            <div class="w-24 h-24 lg:w-12 lg:h-12 image-fit lg:mr-1">
              <img
                v-if="partner.avatar"
                class="tooltip rounded-full"
                :title="
                  partner.avatarUploadDate
                    ? 'Uploaded at ' + partner.avatarUploadDate
                    : 'Avatar Image'
                "
                alt="partner logo"
                :src="`${axios.defaults.baseURL}/${partner.avatar}`"
                @error="handleAvatarError"
                @load="handleAvatarLoad"
              />
              <img
                v-else
                src="../../../../dist/images/logow.png"
                alt="profilecustomer"
                class="rounded-full"
              />
            </div>
            <div
              class="lg:ml-2 lg:mr-auto text-center lg:text-left mt-3 lg:mt-0"
            >
              <a href="#" class="font-medium">{{ partner.firstName }} {{ partner.lastName }}</a>
              <div class="text-slate-500 text-xs mt-0.5 mb-1">{{ partner.profile }}</div>
              <div class="lg:text-left mt-3 lg:mt-0" :class="getStatusClass(partner.status)">
                {{ partner.status }}
              </div>
            </div>
            <div class="flex mt-4 lg:mt-0">
              <label class="text btn-secondary py-1 px-2 mr-2">{{
                partner.contact2
              }}</label>

              <router-link :to="`/employerprofile/${partner._id}`"
                ><button class="btn btn-outline-secondary py-1 px-2">
                  Profile
                </button></router-link
              >
            </div>
          </div>
        </div>
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
        </select>
      </div>
      <!-- END: Pagination -->
    </div>
    <!-- BEGIN: Delete Confirmation Modal -->
    <div
      id="delete-confirmation-modal"
      class="modal"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body p-0">
            <div class="p-5 text-center">
              <i
                data-lucide="x-circle"
                class="w-16 h-16 text-warning mx-auto mt-3"
              ></i>
              <div class="text-3xl mt-5">Are you sure?</div>
              <div class="text-slate-500 mt-2">
                Do you really want to change status?
                <br />
                This client will lose access to all services.
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
              <button type="button" class="btn btn-danger w-24">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END: Delete Confirmation Modal -->

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
    isActivePage(page) {
      return page === this.currentPage;
    },

    async fetchData() {
      try {
        this.loading = true;
        const id = this.$route.params.id;
        const token = Cookies.get("token");
        const response = await axios.get(`/api/user/usersbypartner/${id}/?pageSize=15/`, {
          headers: {
            token: token,
          },
          params: {
            pageNumber: this.currentPage,
            pageSize: this.pageSize,
            searchTerm: this.searchTerm,
          },
        });

        this.allPartners = response.data.allUsers;
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
  },
};
</script>
