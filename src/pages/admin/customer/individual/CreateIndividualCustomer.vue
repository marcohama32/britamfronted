<template>
  <div>
    <label v-if="loading" class="shadow-md">
        <div class="spinner" style="font-size: 18px"></div>
      </label>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Create Individual Customer</h2>
      
    </div>
    <form
      @submit.prevent="onCreateIndivitualCustomer"
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
            <div class="grid grid-cols-3 gap-6 mt-3">
              <div>
                <label for="crud-form-4" class="form-label"
                  >Enrolment date *</label
                >
                <div class="input-group">
                  <input
                    v-model="enrolmentDate"
                    id="crud-form-7"
                    type="date"
                    class="form-control"
                    placeholder="enrolment date"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
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
                <label for="crud-form-20" class="form-label"
                  >Monthly fee *</label
                >
                <div class="input-group">
                  <input
                    v-model="monthlyFee"
                    id="crud-form-20"
                    type="number"
                    min="1"
                    step="0.01"
                    class="form-control"
                    placeholder="monthly fee"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-6 mt-3">
              <div>
                <label for="crud-form-18" class="form-label">Plan *</label>
                <div class="input-group">
                  <select
                    v-model="plan"
                    class="form-control mt-2 sm:mr-2"
                    aria-label="Default select example"
                  >
                    <option
                      v-for="planItem in plans"
                      :key="planItem._id"
                      :value="planItem._id"
                    >
                      {{ planItem.planName }} -
                      {{ formatCurrency(planItem.planPrice) }}
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <label for="crud-form-21" class="form-label"
                  >MemberShip ID *</label
                >
                <div class="input-group">
                  <input
                    v-model="memberShipID"
                    id="crud-form-21"
                    type="text"
                    class="form-control mt-2 sm:mr-2"
                    placeholder="memberShipID"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-6 mt-3">
              <div>
                <label for="crud-form-4" class="form-label">Email *</label>
                <div class="input-group">
                  <input
                    v-model="email"
                    id="crud-form-10"
                    type="text"
                    class="form-control mt-2 sm:mr-2"
                    placeholder="email"
                    aria-describedby="input-group-1"
                  />
                </div>
              </div>
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
                      {{ Item.firstName }} {{ Item.lastName }} -
                      {{ Item.contact1 }}
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <label for="crud-form-4" class="form-label"
                  >Select Avatar</label
                >

                <div class="fallback mt-4">
                  <input
                    id="fileInput"
                    ref="fileInput"
                    type="file"
                    accept=".jpg, .jpeg, .png"
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
  </div>
</template>

<script>
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import Cookies from "js-cookie";
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
      memberShipID: "",
      gender: "",
      monthlyFee: "",
      plan: "",
      email: "",
      address: "",
      contact1: "",
      contact2: "",
      relation: "",
      manager: "",
      password: "",
      avatar: null,
      plans: [],
      managers: [],
      loading: false,
      btnloading: false,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    formatCurrency(value) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      return formatter.format(value);
    },
    onFileChange(event) {
      const file = event.target.files[0]; // Get the selected file

      // Set the file object to the avatar property
      this.avatar = file;
    },
    async getPlans() {
      this.loading = true;
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          "/api/active/allplans",

          {
            headers: {
              token: token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.success) {
          this.plans = response.data.plan;
          this.loading = false;
        } else {
          throw new Error("Failed to fetch plans");
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        this.loading = false;
      }
    },
    async getMagers() {
      this.btnloading = true;
      this.loading = true;
      const token = Cookies.get("token");
      try {
        const response = await axios.get("/api/user/employer/manager/active/get", {
          headers: {
            token: token,
          },
        });
        if (response.data.success) {
          this.btnloading = false;
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
    async onCreateIndivitualCustomer() {
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
      const requiredFields = [
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
        "manager",
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

      try {
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
        formData.append("email", this.email);
        formData.append("address", this.address);
        formData.append("contact1", this.contact1);
        formData.append("contact2", this.contact2);
        formData.append("manager", this.manager);
        formData.append("avatar", this.avatar);
        formData.append("password", this.password);
        this.btnloading = true;
        this.loading = true;

        const response = await axios.post(
          "/api/user/invididual/create/customer",
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
          text: "Customer created successfully",
          timer: 3000,
        });

        this.btnloading = false;
        this.loading = false;
        this.$router.push("/viewcustomer"); // Redirect to other page
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
          setTimeout(() => {
            window.location.reload();
          }, 3000);
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
    this.getPlans();
    this.getMagers();
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
