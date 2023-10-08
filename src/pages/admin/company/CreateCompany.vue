<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Create Company</h2>
    </div>
    <form
      @submit.prevent="onCreateCompany"
      enctype="multipart/form-data"
      data-single="true"
      action="/file-upload"
    >
      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="intro-y col-span-12 lg:col-span-6">
          <!-- BEGIN: Form Layout -->
          <div class="intro-y box p-5">
            <div>
              <label for="crud-form-1" class="form-label">Company Name *</label>
              <input
                id="crud-form-1"
                type="text"
                class="form-control w-full"
                placeholder="name"
                v-model="companyName"
              />
            </div>

            <div class="mt-3">
              <label for="crud-form-3" class="form-label">Brand *</label>
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
                >Company Manager</label
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
              <label for="crud-form-3" class="form-label">Email *</label>
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


            <div class="mt-3">
                <label for="crud-form-4" class="form-label">Account Manager *</label>
                <div class="input-group">
                  <select
                    v-model="manager"
                    class="form-control"
                    aria-label="Default select example"
                  >
                    <option
                      v-for="Item in managers"
                      :key="Item._id"
                      :value="Item._id"
                    >
                      {{ Item.firstName }}  {{ Item.lastName }} - {{ Item.contact1 }}
                    </option>
                  </select>
                </div>
              </div>


            <div class="mt-3">
              <label class="form-label">Contacts *</label>
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
                Save
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
      managers: [],
      manager:"",
      avatar: null,
      btnloading: false,
    };
  },
  created() {
    this.getMagers();
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
    async onCreateCompany() {
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
        "email",
        "contact1",
        "manager",
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
        formData.append("email", this.email);
        formData.append("contact1", this.contact1); 
        formData.append("contact2", this.contact2);
        formData.append("avatar", this.avatar);
        formData.append("manager", this.manager);

      
        this.btnloading = true;
        const response = await axios.post("/api/company/create", formData, {
          headers: {
            token: token,
            "Content-Type": "multipart/form-data",
          },
        });

        Toast.fire({
          icon: "success",
          title: "Success!",
          text: "Company created successfully",
          timer: 3000,
        });

        this.btnloading = false;
        this.$router.push("/viewcompany");
        this.isSuccess = true;
        console.log(response);
        this.$emit("created successfully");
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
          console.error("Error creating company:", errorMessage);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "An error occurred. Please try again.",
          });
          console.error("Error creating company:", error.message);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
        this.btnloading = false;
      }
    },
  },
};
</script>
