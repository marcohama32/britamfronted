<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Update Company</h2>
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
    </div>
    <form
      @submit.prevent="onUpdateCompany"
      enctype="multipart/form-data"
      data-single="true"
      action="/file-upload"
    >
      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="intro-y col-span-12 lg:col-span-6">
          <!-- BEGIN: Form Layout -->
          <div class="intro-y box p-5">
            <div>
              <label for="crud-form-1" class="form-label">Company Name</label>
              <input
                id="crud-form-1"
                type="text"
                class="form-control w-full"
                placeholder="name"
                v-model="companyName"
              
              />
            </div>

            <div class="mt-3">
              <label for="crud-form-3" class="form-label">Brand</label>
              <div class="input-group">
                <input
                  id="crud-form-3"
                  type="text"
                  class="form-control"
                  placeholder="brand"
                  aria-describedby="input-group-1"
                  v-model="brand"
                />
              </div>
            </div>
            <div class="mt-3">
              <label for="crud-form-3" class="form-label"
                >Account Manager</label
              >
              <div class="input-group">
                <input
                  id="crud-form-3"
                  type="text"
                  class="form-control"
                  placeholder="manager"
                  aria-describedby="input-group-1"
                  v-model="accountManager"
                />
              </div>
            </div>
            <div class="mt-3">
              <label for="crud-form-3" class="form-label">Email</label>
              <div class="input-group">
                <input
                  id="crud-form-3"
                  type="text"
                  class="form-control"
                  placeholder="email"
                  aria-describedby="input-group-1"
                  v-model="email"
                />
              </div>
            </div>
            <div>
                <label for="crud-form-4" class="form-label">Manager *</label>
                <div class="input-group">
                  <select
                    v-model="manager"
                    class="form-control mt-2 sm:mr-2"
                    aria-label="Default select example"
                  >
                    <option
                      v-for="Item in managers"
                      :key="Item._id"
                      :value="Item._id"
                    >
                      {{ Item.firstName }} {{ Item.lastName }}
                      {{ Item.contact1 }}
                    </option>
                  </select>
                </div>
              </div>

            <div class="mt-3">
              <label class="form-label">Contacts</label>
              <div class="sm:grid grid-cols-3 gap-2">
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="contact 1"
                    aria-describedby="input-group-3"
                    v-model="contact1"
                  />
                </div>
                <div class="input-group mt-2 sm:mt-0">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="contact 2"
                    aria-describedby="input-group-4"
                    v-model="contact2"
                  />
                </div>
              </div>
            </div>
            <label for="pos-form-1" class="form-label mt-3"
              >Select Avatar</label
            >
            <div class="fallback">
              <input
                id="fileInput"
                ref="fileInput"
                type="file"
                accept=".jpg, .jpeg, .png, .pdf"
                @change="onFileChange"
              />
            </div>

            <label for="crud-form-4" class="form-label mt-3"><strong>Status</strong></label>
            <div class="grid grid-cols-2 gap-6 mt-1">
              <select
                v-model="status"
                class="form-select"
                aria-label="Default select example"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div class="text-right mt-5">
              <router-link to="/viewcompany">
                <button
                  type="button"
                  class="btn btn-outline-secondary w-24 mr-1"
                >
                  Cancel
                </button>
              </router-link>
              <button
                type="submit"
                class="btn btn-primary w-24"
                :disabled="btnloading"
              >
                Update
              </button>
            </div>
          </div>
          <!-- END: Form Layout -->
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import axios from "axios";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      companyName: "",
      brand: "",
      accountManager: "",
      contact1: "",
      contact2: "",
      email: "",
      avatar: null,
      manager:"",
      managers: [],
      status:"",
      btnloading: false,
      loading: false
    };
  },
  watch: {
    id() {
      this.getCompany();
    },
  },
  created() {
    this.getCompany();
    this.getMagers()
  },
  methods: {
    async getMagers() {
      this.loading = true;
      const token = Cookies.get("token")
      try {
        const response = await axios.get("/api/user/employer/manager/active/get",{
          headers: {
            token: token,
          },
        });
        if (response.data.success) {
          this.managers = response.data.employer;
          this.loading = false;
        } else {
          throw new Error("Failed to fetch plans");
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        this.loading = false;
      }
    },
    getCompany() {
      this.loading = true
      const id = this.$route.params.id;
      const token = Cookies.get("token")
      axios
        .get(`/api/company/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          this.loading = false

          // Update the component's data with the received response
          this.companyName = response.data.company.companyName;
          this.brand = response.data.company.brand;
          this.accountManager = response.data.company.accountManager;
          this.contact1 = response.data.company.contact1;
          this.contact2 = response.data.company.contact2;
          this.email = response.data.company.email;
          this.manager = response.data.company.manager;
          this.status = response.data.company.status
          
        })
        .catch((error) => {
          this.errorMessage = "Error retrieving this plan. Please try again."; // Set the error message
          console.error("Error retrieving plan:", error);
        });
    },
    onFileChange(event) {
      const file = event.target.files[0]; // Get the selected file
      // Set the file object to the avatar property
      this.avatar = file;
    },
    validateContacts() {
      if (isNaN(this.contact1) || isNaN(this.contact2)) {
        return false;
      }
      return true;
    },
    async onUpdateCompany() {
      const id = this.$route.params.id;
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

      const requiredFields = [
        "companyName",
        "brand",
        "accountManager",
        "manager",
        "email",
        "contact1",
        "status"
      ];
      const token = Cookies.get("token")
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

      // Validate contacts
      if (!this.validateContacts()) {
        Swal.fire({
          icon: "warning",
          title: "Warning!",
          toast: true,
          text: "Contact must be a number",
          timer: 3000,
          showConfirmButton: false,
          position: "top-end",
        });
        return;
      }

      try {
        // Create FormData object
        const formData = new FormData();
        formData.append("companyName", this.companyName);
        formData.append("brand", this.brand);
        formData.append("accountManager", this.accountManager);
        formData.append("manager", this.manager);
        formData.append("email", this.email);
        formData.append("contact1", this.contact1);
        formData.append("contact2", this.contact2);
        formData.append("avatar", this.avatar);
        formData.append("status", this.status)

        this.btnloading = true;
        this.loading = true;
        const response = await axios.put(`/api/company/update/${id}`, formData, {
          headers: {
            token: token,
            "Content-Type": "multipart/form-data",
          },
        });

        Toast.fire({
          icon: "success",
          title: "Success!",
          text: "Company update successfully",
          timer: 3000,
        });

        this.btnloading = false;
        this.loading = false;
        this.$router.push("/viewcompany");
        this.isSuccess = true;
        console.log(response);
        this.$emit("update successfully");
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          const errorMessage = error.response.data.error;
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: errorMessage,
          });
          this.btnloading = false;
          this.loading = false;
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          console.error("Error updating company:", errorMessage);
         
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "An error occurred. Please try again.",
          });
          console.error("Error updating company:", error.message);
       
        }
        this.btnloading = false;
        this.loading = false;
      }
    },
  },
};
</script>
