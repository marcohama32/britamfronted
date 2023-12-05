<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Create a Partner</h2>
    </div>
    <form
      @submit.prevent="onCreatePartner"
      enctype="multipart/form-data"
      data-single="true"
      action="/file-upload"
    >
      <div class="grid grid-cols-12 gap-6 mt-5">
        <div class="intro-y col-span-12 lg:col-span-6">
          <!-- BEGIN: Form Layout -->
          <div class="intro-y box p-5">
            <div>
              <label for="crud-form-1" class="form-label">Partner Name *</label>
              <input
                v-model="partnerName"
                id="crud-form-1"
                type="text"
                class="form-control w-full"
                placeholder="name"
              />
            </div>

            <div class="mt-3">
              <label for="crud-form-3" class="form-label">Location *</label>
              <div class="input-group">
                <input
                  v-model="partnerLocation"
                  id="crud-form-3"
                  type="text"
                  class="form-control"
                  placeholder="location"
                  aria-describedby="input-group-1"
                />
              </div>
            </div>
            <div class="mt-3">
              <label for="crud-form-4" class="form-label">Business *</label>
              <div class="input-group">
                <input
                  v-model="partnerBusiness"
                  id="crud-form-4"
                  type="text"
                  class="form-control"
                  placeholder="business"
                  aria-describedby="input-group-2"
                />
              </div>
            </div>
            <div class="mt-3">
              <label for="crud-form-4" class="form-label">Email *</label>
              <div class="input-group">
                <input
                  v-model="email"
                  id="crud-form-4"
                  type="text"
                  class="form-control"
                  placeholder="email"
                  aria-describedby="input-group-2"
                />
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
                    id="crud-form-4"
                    type="date"
                    class="form-control"
                    placeholder="enrolment date"
                    aria-describedby="input-group-1"
                    required
                  />
                </div>
              </div>
              <div>
                <label for="crud-form-3" class="form-label">Contact 1 *</label>
                <div class="input-group">
                  <input
                    v-model="contact1"
                    type="number"
                    class="form-control"
                    placeholder="contact 1"
                    aria-describedby="input-group-3"
                  />
                </div>
              </div>
              <div>
                <label for="crud-form-4" class="form-label">Contact 2</label>
                <div class="input-group">
                  <input
                    v-model="contact2"
                    type="number"
                    class="form-control"
                    placeholder="contact 2"
                    aria-describedby="input-group-4"
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

            <div class="text-right mt-5">
              <router-link to="/viewpartner">
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
import Cookies from "js-cookie";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";
import axios from "axios";

export default {
  data() {
    return {
      partnerName: "",
      partnerLocation: "",
      partnerBusiness: "",
      contact1: "",
      contact2: "",
      enrolmentDate: "",
      email: "",
      avatar: null,

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
  created() {},
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
    async onCreatePartner() {
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
        "partnerName",
        "partnerLocation",
        "partnerBusiness",
        "contact1",
        "contact2",
        "enrolmentDate",
        "email",
        "avatar",
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
        formData.append("partnerName", this.partnerName);
        formData.append("partnerLocation", this.partnerLocation);
        formData.append("partnerBusiness", this.partnerBusiness);
        formData.append("contact1", this.contact1);
        formData.append("contact2", this.contact2);
        formData.append("enrolmentDate", this.enrolmentDate);
        formData.append("email", this.email);

        formData.append("avatar", this.avatar);

        this.btnloading = true;
        const token = Cookies.get("token");
        const response = await axios.post("/api/partner/create", formData, {
          headers: {
            token: token,
            "Content-Type": "multipart/form-data",
          },
        });

        Toast.fire({
          icon: "success",
          title: "Success!",
          text: "Partner created successfully",
          timer: 3000,
        });

        this.btnloading = false;
        this.$router.push("/viewpartner");
        this.$router.go(-1);
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
          console.error("Error creating partner:", errorMessage);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "An error occurred. Please try again.",
          });
          console.error("Error creating partner:", error.message);
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
