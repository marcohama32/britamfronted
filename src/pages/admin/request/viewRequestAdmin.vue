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
    </div>
    <!-- Kanban board -->
    <div class="kanban-board">
      <!-- Render each Kanban column based on status -->
      <div
        v-for="(status, column) in kanbanColumns"
        :key="column"
        class="kanban-column"
      >
        <h2>{{ status }}</h2>
        <div
          class="kanban-cards overflow-y-auto"
          @dragenter.prevent="dragEnter(column)"
          @dragover.prevent="dragOver"
          @drop.prevent="drop(column, $event)"
          :ref="`kanbanColumn-${column}`"
        >
          <!-- Wrap Kanban cards with the card-like layout HTML -->
          <div
            v-for="request in filteredRequests(column)"
            :key="request._id"
            draggable="true"
            @dragstart="dragStart(request, index, column, $event)"
          >
            <div class="kanban-card-container">
              <div
                class="intro-y col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
              >
                <div class="box">
                  <div class="p-5 flex flex-col items-start justify-start">
                    <!-- Your card-like layout HTML goes here -->
                    <div class="text-slate-600 dark:text-slate-500 mt-5">
                      <div class="flex flex-wrap items-center">
                        <strong> {{ request.title }}</strong>
                      </div>
                      <div class="flex flex-wrap items-center">
                        <i data-lucide="layers" class="w-4 h-4 mr-2"></i>
                        {{ request.comment }}
                      </div>
                      <div class="flex flex-wrap items-center">
                        <strong>
                          {{ request.customer.firstName }}
                          <strong>
                            {{ request.customer.lastName }}</strong
                          ></strong
                        >
                      </div>
                      <!-- Loop through files and create clickable links with PDF icon -->
                      <div class="mt-2">
                        <b>Files:</b>
                        <div class="flex flex-wrap items-center">
                          <div
                            v-for="file in request.files.split(',')"
                            :key="file"
                            class="mr-2"
                          >
                            <a
                              :href="getFilePath(file)"
                              target="_blank"
                              class="flex items-center"
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
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- End of card-like layout HTML -->
        </div>
      </div>
    </div>
    <!-- END: Kanban board -->
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
</template>

<script>
import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
export default {
  data() {
    return {
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,
      pageSize: 10,
      count: 0,
      firstEntryIndex: 0,
      lastEntryIndex: 0,
      searchTerm: "",
      startDate: "",
      endDate: "",
      selectedDate: null,
      customerRequests: [],
      loading: false,
      kanbanColumns: {
        Pending: "Pending",
        Received: "Received",
        Under_assessment: "Under assessment",
        canceled: "canceled",
        Under_approval: "Under approval",
        Done: "Done",
        // Add more statuses as needed
      },
      dragData: null,
      currentDropTarget: null,
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    datePickerConfig() {
      return {
        // mode: "range", // Enables range selection mode
        dateFormat: "Y-m-d", // Customize the date format
      };
    },
    filteredRequests() {
      return (column) => {
        // Filter the cards by matching the status property
        return this.customerRequests.filter(
          (request) => request.status === column
        );
      };
    },
  },
  methods: {
    refresh() {
      (this.startDate = null),
        (this.endDate = null),
        (this.searchTerm = null),
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
    goToPage(page) {
      if (page !== this.currentPage) {
        this.currentPage = page;
        this.fetchData();
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
    async changePageSize() {
      this.currentPage = 1;
      this.itemsPerPage = this.pageSize;
      await this.fetchData();
    },
    isActivePage(page) {
      return page === this.currentPage;
    },
    getFilePath(file) {
       return `${axios.defaults.baseURL}/${file}`;
      // return `http://localhost:8000/${file}`;
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
        const response = await axios.get("/api/request/getall", {
          headers: {
            token: token,
          },
          params: queryParams,
        });

        this.customerRequests = response.data.customerRequests;
        this.count = response.data.total;
        this.totalPages = Math.ceil(this.count / this.pageSize);

        this.firstEntryIndex = (this.currentPage - 1) * this.pageSize + 1;
        this.lastEntryIndex = Math.min(
          this.currentPage * this.pageSize,
          this.count
        );

        console.log("customerRequests:", this.customerRequests);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    dragStart(request, index, column, event) {
      console.log("Dragging card:", request);
      this.dragData = { request, column, event }; // Include the event object
    },
    dragEnter(targetColumn) {
      // this.currentDropTarget = targetColumn;
      console.log("target column: ", targetColumn);
    },
    async drop(targetColumn, event) {
      event.preventDefault();

      if (!this.dragData) return;

      const { request, column } = this.dragData;

      let currentIndex;

      if (column === targetColumn) {
        // Logic for reordering cards within the same column
        const cardToMove = this.customerRequests.find(
          (item) => item._id === request._id
        );

        currentIndex = this.customerRequests.findIndex(
          (item) => item._id === request._id
        );

        // Remove the card from its current position
        const currentStatusArray = this.customerRequests.filter(
          (item) => item.status === column
        );

        const adjustedTargetIndex = currentStatusArray.findIndex(
          (item) => item._id === request._id
        );

        currentStatusArray.splice(currentIndex, 1);

        // Insert the card at the adjusted target index within the same column
        currentStatusArray.splice(adjustedTargetIndex, 0, cardToMove);

        console.log(
          "Move card within",
          targetColumn,
          "from",
          currentIndex,
          "to",
          adjustedTargetIndex
        );
      } else {
        try {
          const cardToMove = this.customerRequests.find(
            (item) => item._id === request._id
          );

          currentIndex = this.customerRequests.findIndex(
            (item) => item._id === request._id
          );

          const status = targetColumn;

          const token = Cookies.get("token");
          console.log("New status: ", status);
          console.log("Card id: ", cardToMove._id);

          await axios.put(
            `/api/request/status/${cardToMove._id}`,
            { status },
            {
              headers: {
                token: token,
                "Content-Type": "application/json",
              },
            }
          );

          cardToMove.status = status;

          // Remove the card from its current status array
          const currentStatusArray = this.customerRequests.filter(
            (item) => item.status === column
          );

          currentStatusArray.splice(currentIndex, 1);

          // Find the target status array
          const targetStatusArray = this.customerRequests.filter(
            (item) => item.status === status
          );

          // Insert the card into the target status array
          targetStatusArray.push(cardToMove);

          // Update the customerRequests array in your data model
          this.customerRequests = [...this.customerRequests];
        } catch (error) {
          console.error("Error updating status:", error);
        }
      }

      this.dragData = null;
      event.preventDefault();
    },
  },
};
</script>

<style scoped>
/* Your custom styles for Kanban board */
.kanban-board {
  display: flex;
  background-color: #f0f0f0;
  padding: 20px;
  overflow-x: auto; /* Add horizontal scrolling if columns overflow */
}

.kanban-column-container {
  min-width: 250px; /* Minimum column width */
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 10px; /* Add some spacing between columns */
}

.kanban-column {
  border: 1px solid #ccc;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px; /* Add spacing between columns */
}

.kanban-column h2 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #333;
}

/* .kanban-cards {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 10px;
  overflow-y: auto; 
  flex: 1; 
} */

.kanban-cards {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 20px; /* Increase the padding to make cards larger */
  overflow-y: auto; /* Add vertical scrolling if too many cards */
  flex: 1; /* Distribute available space evenly among cards */
}

.kanban-card-container {
  margin: 10px; /* Add margin around each card */
}

.kanban-card {
  background-color: #ffffff;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  cursor: grab;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.kanban-card:active {
  cursor: grabbing;
  background-color: #f0f0f0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.kanban-cards-scrollable {
  height: 400px; /* Set the desired height for the scrollable container */
  overflow-y: auto; /* Enable vertical scrolling */
}

/* Adjust the margin for Title and Comment */
.kanban-card-container .mt-2 {
  margin-top: 10px; /* Add margin between Files and Title/Comment */
}

/* Additional styling for Title and Comment */
.kanban-card-container .flex.items-center {
  justify-content: flex-start; /* Align Title and Comment to start */
}
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
