<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Create Agent</h2>
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
      @submit.prevent="onUpdateUser"
      enctype="multipart/form-data"
      data-single="true"
      action="/file-upload"
    >
      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="intro-y col-span-12 lg:col-span-6">
          <!-- BEGIN: Form Layout -->
          <div class="intro-y box p-5">
            <div class="grid grid-cols-2 gap-6 mt-3">
              <div>
                <label for="crud-form-15" class="form-label"
                  >First name *</label
                >
                <div class="input-group">
                  <input
                    v-model="firstName"
                    id="crud-form-16"
                    type="text"
                    class="form-control"
                    placeholder="first name"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
              <div>
                <label for="crud-form-4" class="form-label">Last name *</label>
                <div class="input-group">
                  <input
                    v-model="lastName"
                    id="crud-form-5"
                    type="text"
                    class="form-control"
                    placeholder="last name"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-6 mt-3">
              <div>
                <label for="crud-form-19" class="form-label">ID Type *</label>
                <div class="input-group">
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    v-model="idType"
                  >
                    <option>ID</option>
                    <option>Drive Licence</option>
                    <option>Passport</option>
                    <option>Voters</option>
                    <option>...</option>
                  </select>
                </div>
              </div>
              <div>
                <label for="crud-form-4" class="form-label">ID Number *</label>
                <div class="input-group">
                  <input
                    v-model="idNumber"
                    id="crud-form-6"
                    type="text"
                    class="form-control"
                    placeholder="id number"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
              <div>
                <label for="crud-form-4" class="form-label">DOB *</label>
                <div class="input-group">
                  <input
                    v-model="dob"
                    id="crud-form-4"
                    type="date"
                    class="form-control"
                    placeholder="date"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-6 mt-3">
              <div>
                <label for="crud-form-17" class="form-label">Gender *</label>
                <div class="input-group">
                  <select
                    v-model="gender"
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option>male</option>
                    <option>female</option>
                    <option>other</option>
                  </select>
                </div>
              </div>
              <div>
                <label for="crud-form-4" class="form-label">Email *</label>
                <div class="input-group">
                  <input
                    v-model="email"
                    id="crud-form-10"
                    type="text"
                    class="form-control"
                    placeholder="email"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-6 mt-3">
              <div>
                <label for="crud-form-4" class="form-label">Address *</label>
                <div class="input-group">
                  <input
                    v-model="address"
                    id="crud-form-11"
                    type="text"
                    class="form-control mt-2 sm:mr-2"
                    placeholder="address"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
              <div>
                <label for="crud-form-4" class="form-label">Manager *</label>
                <div class="input-group">
                  <select
                    v-model="lineManager"
                    class="form-control mt-2 sm:mr-2"
                    aria-label="Default select example"
                  >
                    <option
                      v-for="Item in managers"
                      :key="Item._id"
                      :value="Item._id"
                    >
                      {{ Item.firstName }} {{ Item.lastName }} -
                      {{ Item.contact1 }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-6 mt-3">
              <div>
                <label for="crud-form-4" class="form-label">Contact *</label>
                <div class="input-group">
                  <input
                    v-model="contact1"
                    id="crud-form-12"
                    type="number"
                    class="form-control mt-2 sm:mr-2"
                    placeholder="contact"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
              <div>
                <label for="crud-form-4" class="form-label">Contact 2</label>
                <div class="input-group">
                  <input
                    v-model="contact2"
                    id="crud-form-13"
                    type="number"
                    class="form-control mt-2 sm:mr-2"
                    placeholder="contact"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
              <div>
                <label for="crud-form-4" class="form-label">Password</label>
                <div class="input-group">
                  <input
                    v-model="password"
                    id="crud-form-14"
                    type="password"
                    class="form-control mt-2 sm:mr-2"
                    placeholder="password"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-6 mt-3">
              <div>
                <label for="crud-form-4" class="form-label">Status</label>
                <div class="input-group">
                  <select
                    v-model="status"
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <label for="crud-form-4" class="form-label"
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
import Cookies from "js-cookie";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import axios from "axios";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      idType: "",
      idNumber: "",
      dob: "",

      gender: "",
      email: "",
      address: "",
      contact1: "",
      contact2: "",
      relation: "",
      lineManager: "",
      password: "",
      formattedDob: "",
      formattedEnrolment: "",
      plans: [],
      managers: [],
      status: "",
      avatar: null,
      btnloading: false,
      loading: false,
    };
  },

  watch: {
    id() {
      this.getUser();
    },
  },
  created() {
    this.getUser();
    this.getMagers();
  },
  methods: {
    formatCurrency(value) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      return formatter.format(value);
    },

    goBack() {
      this.$router.go(-1);
    },
    formatDate(dateString) {
      const date = new Date(dateString); // Create a Date object from the ISO 8601 date string
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1 and pad with '0' if needed
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`; // Return the formatted date as a string
    },

    async getMagers() {
      this.loading = true;
      const token = Cookies.get("token");
      try {
        const response = await axios.get("/api/user/employer/manager/active/get", {
          headers: {
            token: token,
          },
        });
        if (response.data.success) {
          this.managers = response.data.employer;
          // console.log(response.data.employer)
          this.loading = false;
        } else {
          throw new Error("Failed to fetch plans");
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        this.loading = false;
      }
    },
    getUser() {
      const id = this.$route.params.id;
      const token = Cookies.get("token");
      axios
        .get(`/api/user/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          // Update the component's data with the received response
          this.firstName = response.data.user.firstName;
          this.lastName = response.data.user.lastName;
          this.idType = response.data.user.idType;
          this.idNumber = response.data.user.idNumber;
          this.password = response.data.user.password;
          this.dob = this.formatDate(response.data.user.dob);
          this.enrolmentDate = this.formatDate(
            response.data.user.enrolmentDate
          );

          this.gender = response.data.user.gender;

          this.email = response.data.user.email;
          this.address = response.data.user.address;
          this.contact1 = response.data.user.contact1;
          this.contact2 = response.data.user.contact2;
          this.lineManager = response.data.user.lineManager;

          this.status = response.data.user.status;
        })
        .catch((error) => {
          this.errorMessage = "Error retrieving this plan. Please try again.";
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
    async onUpdateUser() {
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
        "firstName",
        "lastName",
        "idType",
        "idNumber",
        "dob",
        "gender",
        "email",
        "address",
        "contact1",
        "contact2",
        "lineManager",
        "status",
      ];
      const token = Cookies.get("token");
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
        formData.append("firstName", this.firstName);
        formData.append("lastName", this.lastName);
        formData.append("idType", this.idType);
        formData.append("idNumber", this.idNumber);
        formData.append("dob", this.dob);
        formData.append("gender", this.gender);
        formData.append("plan", this.plan);
        formData.append("address", this.address);
        formData.append("password", this.password);
        formData.append("email", this.email);
        formData.append("contact1", this.contact1);
        formData.append("contact2", this.contact2);
        formData.append("lineManager", this.lineManager);
        formData.append("avatar", this.avatar);
        formData.append("status", this.status);

        this.btnloading = true;
        const response = await axios.put(`/api/user/agent/update/${id}`, formData, {
          headers: {
            token: token,
            "Content-Type": "multipart/form-data",
          },
        });

        Toast.fire({
          icon: "success",
          title: "Success!",
          text: "Customer update successfully",
          timer: 3000,
        });

        this.btnloading = false;
        // this.$router.push("/viewcustomer");
        this.$router.go(-1);
        this.isSuccess = true;
        console.log(response.status);
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
          console.error("Error updating company:", errorMessage);
          setTimeout(() => {
            // window.location.reload();
          }, 3000);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "An error occurred. Please try again.",
          });
          console.error("Error updating company:", error.message);
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
