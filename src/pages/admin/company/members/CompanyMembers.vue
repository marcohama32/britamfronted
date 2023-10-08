<template>
  <div>
    <h2 class="intro-y text-lg font-medium mt-10">Costomers</h2>
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
        <router-link :to="`/createcorporate/${this.$route.params.id}`">
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
        <!-- end add btn -->
        <!-- add btn bulk -->
        <router-link :to="`/createbulkcorporate/${this.$route.params.id}`">
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
                  Add Bulk
                </button>
              </div>
            </div>
          </div>
        </router-link>
        <!-- end add btn bulk-->
        <div class="hidden xl:block mx-auto text-slate-500">
          Showing {{ firstEntryIndex }} to {{ lastEntryIndex }} of
          {{ count }} entries
        </div>

        <div class="w-full xl:w-auto flex items-center mt-3 xl:mt-0">
          <button class="btn btn-secondary shadow-md mr-2" @click="goBack">
            Back
          </button>
          <!-- <button class="btn btn-primary shadow-md mr-2" @click="exportToExcel">
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
              class="lucide lucide-file-text w-4 h-4 mr-2"
            >
              <path
                d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
              />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" x2="8" y1="13" y2="13" />
              <line x1="16" x2="8" y1="17" y2="17" />
              <line x1="10" x2="8" y1="9" y2="9" />
            </svg>
            Export to Excel
          </button> -->
        </div>
      </div>

      <!-- BEGIN: Data List -->

      <div class="intro-y col-span-12 overflow-auto 2xl:overflow-visible">
        <table class="table table-report -mt-2">
          <thead>
            <tr>
              <th class="whitespace-nowrap">Name</th>
              <th class="whitespace-nowrap">Contact</th>
              <th class="text-center whitespace-nowrap">Gender</th>
              <th class="whitespace-nowrap">Monthlyfee</th>
              <th class="whitespace-nowrap">Relation</th>
              <th class="whitespace-nowrap">Membership ID</th>
              <th class="whitespace-nowrap">Plan</th>
              <th class="whitespace-nowrap">Status</th>
              <th class="text-center whitespace-nowrap">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="companymember in companymembers"
              :key="companymember._id"
              class="intro-x"
            >
              <td class="w-40 !py-4">
                <a
                  href="javascript:;"
                  class="decoration-dotted whitespace-nowrap"
                  >{{ companymember.firstName }} {{ companymember.lastName }}</a
                >
              </td>
              <td class="w-40">
                <a href="#" class="font-medium whitespace-nowrap"
                  >{{ companymember.contact1 }}
                </a>
                <div class="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                  {{ companymember.contact2 }}
                </div>
              </td>
              <td class="text-center">
                <div class="flex items-center justify-center whitespace-nowrap">
                  {{ companymember.gender }}
                </div>
              </td>
              <td class="w-40 text-right">
                <div class="pr-16">
                  {{ formatCurrency(companymember.monthlyFee) }}
                </div>
              </td>
              <td>
                <div class="whitespace-nowrap">
                  {{ companymember.relation }}
                </div>
              </td>
              <td>
                <div class="whitespace-nowrap">
                  {{ companymember.memberShipID }}
                </div>
              </td>
              <td class="w-40">
                <div v-if="companymember.plan && companymember.plan.length > 0">
                  <a href="javascript:;" class="font-medium whitespace-nowrap">
                    {{ companymember.plan[0].planName }}
                  </a>
                </div>
                <div v-else>No Plan add</div>
              </td>

              <td>
                <div
                  class="whitespace-nowrap"
                  :class="getStatusClass(companymember.status)"
                >
                  {{ companymember.status }}
                </div>
              </td>
              
              <td class="table-report__action">
                <div class="flex justify-center items-center">
                  <a a v-if="companymember.userType === 7"
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

                    <router-link :to="`/dependentprofile/${companymember._id}`"
                      >Details</router-link
                    >
                  </a>

                  <a a v-if="companymember.userType === 4"
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

                    <router-link :to="`/customerprofile/${companymember._id}`"
                      >Details</router-link
                    >
                  </a>

                  <a v-if="companymember.userType === 4"
                    class="flex items-center text-primary whitespace-nowrap mr-5 ml-5"
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

                    <router-link :to="`/createdependentcorporate/${companymember._id}`"
                      >Add dependent</router-link
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
                class="w-16 h-16 text-danger mx-auto mt-3"
              ></i>
              <div class="text-3xl mt-5">Are you sure?</div>
              <div class="text-slate-500 mt-2">
                Do you really want to delete these records?
                <br />
                This process cannot be undone.
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
              <button type="button" class="btn btn-danger w-24">Delete</button>
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
import Cookies from "js-cookie";

export default {
  data() {
    return {
      companymembers: [],

      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,
      firstEntryIndex: 0,
      lastEntryIndex: 0,
      searchTerm: "",
      pageSize: 10,
      count: 0,

      loading: false,
    };
  },
  computed: {
   
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    isActivePage(page) {
      return page === this.currentPage;
    },
    applyFilter() {
      this.currentPage = 1;
      this.getCompanyUsers();
    },
    formatCurrency(value) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      return formatter.format(value);
    },
    async getCompanyUsers() {
      try {
        this.loading = true;
        const companyId = this.$route.params.id;
        const token = Cookies.get("token")
        const response = await axios.get(`/api/allcompanyuser/${companyId}`, {
          headers: {
            token: token,
          },
          params: {
            pageNumber: this.currentPage,
            pageSize: this.pageSize,
            searchTerm: this.searchTerm,
          },
        });

        this.companymembers = response.data.allUsers;
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
    getStatusClass(status) {
      if (status === "Active") {
        return "text-success";
      } else if (status === "Inactive") {
        return "text-danger";
      } else {
        return ""; // Default class if no match
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page; // Update the current page
        // Perform data fetching or update the displayed data based on the current page
        this.fetchData();
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.goToPage(this.currentPage - 1); // Go to the previous page
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.goToPage(this.currentPage + 1); // Go to the next page
      }
    },
    updatePerPage() {
      this.currentPage = 1; // Reset the current page when changing items per page
      // Perform data fetching or update the displayed data based on the new items per page
      this.getCompanyUsers();
    },

    exportToExcel() {
      // Select the table element
      const table = document.querySelector("table");

      // Convert the table to a workbook object
      const workbook = utils.table_to_book(table);

      // Generate Excel file
      writeFile(workbook, "Company_Members.xlsx");
    },
    exportToPDF() {
      // Select the table element
      const table = document.querySelector("table");

      // Delay the PDF generation until the table data is rendered
      setTimeout(() => {
        // Create a new html2pdf instance
        const element = document.createElement("div");
        element.appendChild(table);
        html2pdf()
          .set({ filename: "transactinos_list.pdf" })
          .from(element)
          .save();
      }, 500);
    },
  },
  created() {
    this.getCompanyUsers();
  },
};
</script>
