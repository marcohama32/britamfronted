<template>
  <div>
    <label v-if="loading" class="shadow-md">
      <div class="spinner" style="font-size: 18px"></div>
    </label>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">
        Create Dependente for {{ memberFirstName }} {{ memberLastName }}
      </h2>
    </div>
    <form
      @submit.prevent="onCreateDependent"
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
                <label for="crud-form-3" class="form-label">First name</label>
                <div class="input-group">
                  <input
                    v-model="firstName"
                    id="crud-form-3"
                    type="text"
                    class="form-control"
                    placeholder="first name"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
              <div>
                <label for="crud-form-4" class="form-label">Last name</label>
                <div class="input-group">
                  <input
                    v-model="lastName"
                    id="crud-form-4"
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
                <label for="crud-form-3" class="form-label">ID Type</label>
                <div class="input-group">
                  <select
                    v-model="idType"
                    class="form-select mt-2 sm:mr-2"
                    aria-label="Default select example"
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
                <label for="crud-form-4" class="form-label">ID Number</label>
                <div class="input-group">
                  <input
                    v-model="idNumber"
                    id="crud-form-4"
                    type="text"
                    class="form-control mt-2 sm:mr-2"
                    placeholder="id number"
                    aria-describedby="input-group-1"
                    required
                  />
                </div>
              </div>
              <div>
                <label for="crud-form-4" class="form-label">DOB</label>
                <div class="input-group">
                  <input
                    v-model="dob"
                    id="crud-form-4"
                    type="date"
                    class="form-control mt-2 sm:mr-2"
                    placeholder="date"
                    aria-describedby="input-group-1"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-6 mt-3">
              <div>
                <label for="crud-form-4" class="form-label"
                  >Enrolment date</label
                >
                <div class="input-group">
                  <input
                    v-model="enrolmentDate"
                    id="crud-form-4"
                    type="date"
                    class="form-control mt-2 sm:mr-2"
                    placeholder="enrolment date"
                    aria-describedby="input-group-1"
                    required
                  />
                </div>
              </div>
              <div>
                <label for="crud-form-3" class="form-label">Gender</label>
                <div class="input-group">
                  <select
                    v-model="gender"
                    class="form-select mt-2 sm:mr-2"
                    aria-label="Default select example"
                  >
                    <option>male</option>
                    <option>female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label for="crud-form-4" class="form-label">Relation</label>
                <div class="input-group">
                  <select
                    v-model="relation"
                    class="form-select mt-2 sm:mr-2"
                    aria-label="Default select example"
                  >
                    <option>Wife</option>
                    <option>Son</option>
                    <option>Daughter</option>
                    <option>Mother</option>
                    <option>Father</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-6 mt-3">
              <div>
                <label for="crud-form-3" class="form-label">Email</label>
                <div class="input-group">
                  <input
                    v-model="email"
                    id="crud-form-3"
                    type="text"
                    class="form-control"
                    placeholder="email"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
              <div>
                <label for="crud-form-4" class="form-label"
                  >MemberShip ID</label
                >
                <div class="input-group">
                  <input
                    v-model="memberShipID"
                    id="crud-form-3"
                    type="text"
                    class="form-control"
                    placeholder="membership id"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-6 mt-3">
              <div class="mt-3">
                <label for="crud-form-3" class="form-label">Monthly fee</label>
                <div class="input-group">
                  <input
                    v-model="monthlyFee"
                    id="crud-form-3"
                    type="number"
                    min="1"
                    step="0.01"
                    class="form-control"
                    placeholder="monthly fee"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
              <div class="mt-3">
                <label for="crud-form-3" class="form-label">Contact 1 *</label>
                <div class="input-group">
                  <input
                    v-model="contact1"
                    id="crud-form-3"
                    type="number"
                    class="form-control"
                    placeholder="contact"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
              <div class="mt-3">
                <label for="crud-form-3" class="form-label">Contact 2 *</label>
                <div class="input-group">
                  <input
                    v-model="contact2"
                    id="crud-form-3"
                    type="number"
                    class="form-control"
                    placeholder="contact"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-6 mt-3">
              <div class="mt-3">
                <label for="crud-form-3" class="form-label">Address</label>
                <div class="input-group">
                  <input
                    v-model="address"
                    id="crud-form-3"
                    type="text"
                    class="form-control"
                    placeholder="address"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
              <div class="mt-3">
                <label for="crud-form-3" class="form-label">Password</label>
                <div class="input-group">
                  <input
                    v-model="password"
                    id="crud-form-3"
                    type="password"
                    class="form-control"
                    placeholder="password"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
            </div>

            <div>
              <label for="crud-form-4" class="form-label mt-4"
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
            <div class="mt-4">
              <input type="text" v-model="manager" disabled hidden />

              <input type="text" v-model="plan" disabled hidden />
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
      enrolmentDate: "",
      gender: "",
      relation: "",
      email: "",
      memberShipID: "",
      address: "",
      contact1: "",
      contact2: "",
      plan: "",
      password: "",
      avatar: null,
      memberFirstName: "",
      memberLastName: "",
      monthlyFee: "",
      manager: "",

      formattedDob: "",
      formattedEnrolment: "",
      status: "",
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

    getUser() {
      this.loading = true;
      this.btnloading = true;
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
          this.btnloading = false;
          this.loading = false;

          this.plan = response.data.user.plan[0]._id;
          // this.monthlyFee = response.data.user.monthlyFee;
          this.relation = response.data.user.relation;
          this.manager = response.data.user.manager._id;
          this.status = response.data.user.status;
          this.memberFirstName = response.data.user.firstName;
          this.memberLastName = response.data.user.lastName;
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
    async onCreateDependent() {
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
        "firstName",
        "lastName",
        "idType",
        "idNumber",
        "dob",
        "enrolmentDate",
        "memberShipID",
        "gender",
        "monthlyFee",
        "plan",
        "email",
        "address",
        "contact1",
        "contact2",
        "manager",
        "company",
        "relation",
        "avatar",
        "status",
      ];

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
        formData.append("enrolmentDate", this.enrolmentDate);
        formData.append("memberShipID", this.memberShipID);
        formData.append("gender", this.gender);
        formData.append("monthlyFee", this.monthlyFee);
        formData.append("plan", this.plan);
        formData.append("address", this.address);
        formData.append("relation", this.relation);
        formData.append("password", this.password);
        formData.append("email", this.email);
        formData.append("company", this.company);
        formData.append("contact1", this.contact1);
        formData.append("contact2", this.contact2);
        formData.append("manager", this.manager);
        formData.append("avatar", this.avatar);
        formData.append("status", this.status);
        formData.append("id", id);

        this.btnloading = true;
        const token = Cookies.get("token");
        const response = await axios.post(
          "/api/user/individualdependent/create",
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
          text: "Dependent created successfully",
          timer: 3000,
        });

        this.btnloading = false;
        this.$router.push("/viewcustomer");
        this.$router.go(-1);
        this.isSuccess = true;
        console.log(response.status);
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
          console.error("Error updating company:", errorMessage);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "An error occurred. Please try again.",
          });
          console.error("Error updating company:", error.message);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 3000);
        }
        this.btnloading = false;
      }
    },
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
</style>
