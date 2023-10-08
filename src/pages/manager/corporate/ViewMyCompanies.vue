<template>
    <div>
      <h2 class="intro-y text-lg font-medium mt-10">Company</h2>
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
  
          <div class="hidden xl:block mx-auto text-slate-500">
            Showing {{ firstEntryIndex }} to {{ lastEntryIndex }} of
            {{ count }} entries
          </div>
          <!-- <div class="w-full xl:w-auto flex items-center mt-3 xl:mt-0">
            <button class="btn btn-primary shadow-md mr-2" @click="exportToExcel">
              <i data-lucide="file-text" class="w-4 h-4 mr-2"></i> Export to Excel
            </button>
          </div> -->
        </div>
  
        <!-- BEGIN: Data List -->
  
        <div class="intro-y col-span-12 overflow-auto 2xl:overflow-visible">
          <table class="table table-report -mt-2">
            <thead>
              <tr>
                <th class="whitespace-nowrap">Logo</th>
                <th class="whitespace-nowrap">Company name</th>
                <th class="whitespace-nowrap">Brand</th>
                <th class="text-center whitespace-nowrap">Company Manager</th>
  
                <th class="text-right whitespace-nowrap">
                  <div class="pr-16">Contacts</div>
                </th>
                <th class="text-center whitespace-nowrap">Account Manager</th>
                <th class="whitespace-nowrap">Status</th>
                <th class="text-center whitespace-nowrap">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="company in allCompanies"
                :key="company._id"
                class="intro-x"
              >
                <td class="w-40 !py-4">
                  <div class="w-10 h-10 image-fit zoom-in">
                    <img
                      v-if="company.avatar"
                      class="tooltip rounded-full"
                      :title="
                        company.avatarUploadDate
                          ? 'Uploaded at ' + company.avatarUploadDate
                          : 'Avatar Image'
                      "
                      alt="Company logo"
                      :src="`http://localhost:8000/${company.avatar}`"
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
                </td>
                <td class="w-40 !py-4">
                  <a href="#" class="decoration-dotted whitespace-nowrap">{{
                    company.companyName
                  }}</a>
                </td>
                <td class="w-40">
                  <a href="#" class="font-medium whitespace-nowrap"
                    >{{ company.brand }}
                  </a>
                </td>
                <td class="text-center">
                  <div class="flex items-center justify-center whitespace-nowrap">
                    {{ company.accountManager }}
                  </div>
                </td>
                <td class="w-40">
                  <a href="#" class="font-medium whitespace-nowrap"
                    >{{ company.contact1 }}
                  </a>
                  <div class="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                    {{ company.contact2 }}
                  </div>
                </td>
                <td class="text-center">
                  <div
                    class="flex items-center justify-center whitespace-nowrap"
                    v-if="company.manager"
                  >
                    {{ company.manager.firstName }} {{ company.manager.lastName }}
                  </div>
                </td>
  
                <td class="w-40 !py-4">
                  <div
                    class="whitespace-nowrap"
                    :class="getStatusClass(company.status)"
                  >
                    {{ company.status }}
                  </div>
                </td>
                <td class="table-report__action">
                  <div  v-if="company.status === 'Active'" class="flex justify-center items-center">
                    <!-- <a
                   
                      class="flex items-center text-primary whitespace-nowrap mr-5"
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
                        class="w-4 h-4 mr-1 lucide lucide-check-square"
                      >
                        <polyline points="9 11 12 14 22 4" />
                        <path
                          d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                        />
                      </svg>
                      <router-link :to="`/updatecompany/${company._id}`"
                        >Edit</router-link
                      >
                    </a> -->
                    <a
                      class="flex items-center text-primary whitespace-nowrap mr-5"
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
                        class="w-4 h-4 mr-1 lucide lucide-check-square"
                      >
                        <polyline points="9 11 12 14 22 4" />
                        <path
                          d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                        />
                      </svg>
                      <router-link :to="`/companymembers/${company._id}`"
                        >Employees</router-link
                      >
                    </a>
                    <a
                      class="flex items-center text-primary whitespace-nowrap mr-5"
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
                        class="w-4 h-4 mr-1 lucide lucide-check-square"
                      >
                        <polyline points="9 11 12 14 22 4" />
                        <path
                          d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                        />
                      </svg>
                      <router-link :to="`/viewcompanytransactions/${company._id}`"
                        >Transactions</router-link
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
  
              <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': isActivePage(page) }">
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
  import { utils, writeFile } from "xlsx";
  import axios from "axios";
  import html2pdf from "html2pdf.js";
  import "sweetalert2/dist/sweetalert2.css";
  import Cookies from "js-cookie";
  export default {
    data() {
      return {
        allCompanies: [],
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
  
          const token = Cookies.get("token")
          const response = await axios.get("/api/allmanagercompany", {
            headers: {
              token: token,
            },
            params: {
              pageNumber: this.currentPage,
              pageSize: this.pageSize,
              searchTerm: this.searchTerm,
            },
          });
  
          this.allCompanies = response.data.companies;
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
  