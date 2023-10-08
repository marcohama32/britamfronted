<template>
  <div>
    <div class="intro-y flex items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Create a Partner</h2>
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
      @submit.prevent="onUpdatePartner"
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

            <label for="crud-form-4" class="form-label mt-3"
              ><strong>Status</strong></label
            >
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
      console.log("response 1");
      const id = this.$route.params.id;
      const token = Cookies.get("token");
      axios
        .get(`/api/partner/${id}`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          // Update the component's data with the received response

          // console.log("response.data");
          this.partnerName = response.data.partner.partnerName;
          this.partnerLocation = response.data.partner.partnerLocation;
          this.partnerBusiness = response.data.partner.partnerBusiness;
          this.contact1 = response.data.partner.contact1;
          this.contact2 = response.data.partner.contact2;

          this.enrolmentDate = this.formatDate(
            response.data.partner.enrolmentDate
          );
          this.enrolmentDate = this.formatDate(
            response.data.partner.enrolmentDate
          );

          this.email = response.data.partner.email;

          this.status = response.data.partner.status;
        })
        .catch((error) => {
          this.errorMessage =
            "Error retrieving this partner. Please try again.";
          console.error("Error retrieving partner:", error);
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
    async onUpdatePartner() {
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
        "partnerName",
        "partnerLocation",
        "partnerBusiness",
        "contact1",
        "contact2",
        "enrolmentDate",
        "email",
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
        formData.append("partnerName", this.partnerName);
        formData.append("partnerLocation", this.partnerLocation);
        formData.append("partnerBusiness", this.partnerBusiness);
      
        formData.append("email", this.email);
        formData.append("contact1", this.contact1);
        formData.append("contact2", this.contact2);
        formData.append("enrolmentDate", this.enrolmentDate);
        formData.append("avatar", this.avatar);
        formData.append("status", this.status);

        this.btnloading = true;
        const response = await axios.put(
          `/api/partner/update/${id}`,
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
          text: "Partner update successfully",
          timer: 3000,
        });

        this.btnloading = false;
        // this.$router.push("/viewcustomer");
        this.$router.go(-1);
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
          console.error("Error updating partner:", errorMessage);
          setTimeout(() => {
            // window.location.reload();
          }, 3000);
        } else {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "An error occurred. Please try again.",
          });
          console.error("Error updating partner:", error.message);
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
