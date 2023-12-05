<template>
  <div>
    <label v-if="loading" class="shadow-md">
      <div class="spinner" style="font-size: 18px"></div>
    </label>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">
        Add Bulk Customers on {{ company }} account
      </h2>
    </div>
    <form
      @submit.prevent="onCreateBulkCorporateCustomer"
      enctype="multipart/form-data"
      data-single="true"
      action="/file-upload"
    >
      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="intro-y col-span-12 lg:col-span-6">
          <!-- BEGIN: Form Layout -->
          <div class="intro-y box p-5">
            <div class="grid grid-cols-1 gap-6 mt-3">
              <div>
                <label for="crud-form-4" class="form-label"
                  >Select file to create customers</label
                >
                <div class="mt-8 mb-2">
                  <p><span>Rules: </span></p>
                  <p class="mt-2">
                    <span>1. Dates must be in the format yyyy/mm/dd</span>
                  </p>
                  <p class="mt-2">
                    <span
                      >2. Contact must be in numeric format, unique, and begin
                      with the prefix +258</span
                    >
                  </p>

                  <p class="mt-2">
                    <span>3. Please use a valid and unique email address</span>
                  </p>
                  <p class="mt-2">
                    <span>4. Membership IDs must be unique</span>
                  </p>
                  <p class="mt-2">
                    <span>5. There should be no empty rows or columns</span>
                  </p>

                  <p class="mt-2">
                    <span
                      >6. After uploading the file, please review the fields
                      before submitting</span
                    >
                  </p>
                </div>

                <div class="fallback mt-8">
                  <input
                    id="fileInput"
                    ref="fileInput"
                    type="file"
                    accept=".csv"
                    name="csvFile"
                    @change="onFileChange"
                  />
                </div>
              </div>
            </div>

            <div class="text-right mt-8">
              <button
                type="button"
                class="btn btn-outline-secondary w-24 mr-1"
                @click="goBack"
              >
                Cancel
              </button>

              <button
                type="submit"
                class="btn btn-primary w-24"
                :disabled="btnloading"
              >
                Save
              </button>
            </div>
          </div>
          <!-- END: Form Layout -->
        </div>
      </div>
    </form>
    <div class="grid grid-cols-12 gap-12 mt-5">
      <!-- BEGIN: Data List -->
      <div class="intro-y col-span-12 overflow-auto 2xl:overflow-visible">
        <div class="table-wrapper">
          <table class="table table-report -mt-2" id="csvDataTable">
            <thead>
              <tr></tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import Papa from "papaparse";
import axios from "axios";
import Cookies from "js-cookie";
export default {
  data() {
    return {
      csvContent: "",
      manager: "",
      company: "",
      loading: false,
      btnloading: false,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    onFileChange(event) {
      const file = event.target.files[0]; // Get the selected file

      // Create a FileReader instance
      const reader = new FileReader();

      // Define an event handler for when the file is loaded
      reader.onload = (e) => {
        // Read the content of the file as text
        const fileContent = e.target.result;

        // Now, 'fileContent' contains the content of the uploaded file as a string
        console.log("CSV File Content:", fileContent);

        // Set the file content to the 'csvFile' property if needed
        this.csvContent = fileContent;

        // Call a method to parse and display CSV data in the table
        this.displayCSVData(fileContent);
      };

      // Read the file as text
      reader.readAsText(file);
    },
    // Method to parse and display CSV data in the table
    displayCSVData(fileContent) {
      // Parse the CSV content into an array of arrays (you can use a library like PapaParse)
      const parsedData = Papa.parse(fileContent, { header: true }).data;

      // Assuming the first row contains headers
      const headers = Object.keys(parsedData[0]);

      // Clear previous data
      const table = document.getElementById("csvDataTable");
      table.innerHTML = "<thead></thead><tbody></tbody>";

      // Add table headers
      const thead = table.querySelector("thead");
      const headerRow = document.createElement("tr");
      headers.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);

      // Add data rows
      const tbody = table.querySelector("tbody");
      parsedData.forEach((rowData) => {
        const dataRow = document.createElement("tr");
        headers.forEach((header) => {
          const td = document.createElement("td");
          td.textContent = rowData[header];
          dataRow.appendChild(td);
        });
        tbody.appendChild(dataRow);
      });
    },

    async getCompany() {
      const id = this.$route.params.id;
      this.loading = true;
      const token = Cookies.get("token");
      try {
        const response = await axios.get(`/api/company/${id}`, {
          headers: {
            token: token,
          },
        });
        if (response.data.success) {
          this.company = response.data.company.companyName;
          this.manager = response.data.company.manager;
          this.loading = false;
        } else {
          throw new Error("Failed to fetch plans");
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        this.loading = false;
      }
    },
    async onCreateBulkCorporateCustomer() {
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
      const token = Cookies.get("token");
      const requiredFields = ["csvFile", "manager"];

      for (const field of requiredFields) {
        if (this[field] === "") {
          Swal.fire({
            icon: "warning",
            title: "Warning!",
            toast: true,
            text: `${field} cannot be empty`,
            timer: 3000,
            showConfirmButton: false,
            position: "top-end",
          });
          return;
        }
      }

      try {
        const formData = new FormData();
        formData.append("csvContent", this.csvContent);
        formData.append("manager", this.manager);
        this.btnloading = true;
        this.loading = true;
        const company = this.$route.params.id;
        const response = await axios.post(
          `/api/user/bulk/corporatebulk/${company}`,
          formData,
          {
            headers: {
              token: token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        Toast.fire({
          icon: "success",
          title: "Success!",
          // title: "Error",
          text: "Customers created successfully",
          timer: 3000,
        });

        this.btnloading = false;
        this.loading = false;
        this.$router.go(-1); // Redirect to other page
        this.isSuccess = true;
        console.log(response);
        this.$emit("postcreated");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          this.errorMessage = error.response.data.error;
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: this.errorMessage,
          });
          console.error("Error creating post:", this.errorMessage);
          //   setTimeout(() => {
          //     window.location.reload();
          //   }, 3000);
        } else {
          this.errorMessage = "An error occurred. Please try again.";
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: this.errorMessage,
          });

          console.error("Error creating post:", error.message);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 3000);
        }
        this.btnloading = false;
        this.loading = false;
      }
    },
  },
  created() {
    const id = this.$route.params.id;
    if (!id) {
      window.location.reload();
    }
    this.getCompany();
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
.table-wrapper {
  max-height: 100%;
  height: 100%;
  overflow: auto;
}
</style>
