<template>
    <div>
      <div class="intro-y flex items-center mt-8">
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
        <h2 class="text-lg font-medium mr-auto">Customer Profile</h2>
        <button
          type="button"
          class="btn btn-outline-secondary w-24 mr-1 mt-5"
          @click="goBack"
        >
          Cancel
        </button>
        <div v-if="role === 4">
          <router-link :to="`/updatecorporate/${this.$route.params.id}`"
            ><button class="btn btn-secondary mt-5">Edit</button>
          </router-link>
        </div>
        <div v-if="role !== 4">
          <router-link :to="`/updatecustomer/${this.$route.params.id}`"
            ><button class="btn btn-secondary mt-5">Edit</button>
          </router-link>
        </div>
      </div>
      <!-- BEGIN: Profile Info -->
      <div class="intro-y box px-5 pt-5 mt-5">
        <div
          class="flex flex-col lg:flex-row border-b border-slate-200/60 dark:border-darkmode-400 pb-5 -mx-5"
        >
          <div
            class="flex flex-1 px-5 items-center justify-center lg:justify-start"
          >
            <div
              class="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative"
            >
              <img
                v-if="avatar"
                :src="getAvatarUrl()"
                alt="profilecustomer"
                class="rounded-full"
              />
              <img
                v-else
                src="../../../dist/images/logow.png"
                alt="profilecustomer"
                class="rounded-full"
              />
            </div>
            <div class="ml-5">
              <div
                class="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg"
              >
                {{ firstName }} {{ lastName }}
              </div>
              <div class="text-slate-500">{{ getRole(role) }}</div>
              <div class="text-slate-200 mt-1">{{ memberShipID }}</div>
              <div class="text-slate-200 mt-1">{{ formatCurrency(monthlyFee) }}</div>
              <div
                class="lg:text-left mt-3 lg:mt-0"
                :class="getStatusClass(status)"
              >
                {{ status }}
              </div>
            </div>
          </div>
          <div
            class="mt-6 lg:mt-0 flex-1 px-5 border-l border-r border-slate-200/60 dark:border-darkmode-400 border-t lg:border-t-0 pt-5 lg:pt-0"
          >
            <div class="font-medium text-center lg:text-left lg:mt-3">
              Contact Details
            </div>
            <div
              class="flex flex-col justify-center items-center lg:items-start mt-4"
            >
              <div class="truncate sm:whitespace-normal flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail w-4 h-4 mr-2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                {{ email }}
              </div>
              <div class="truncate sm:whitespace-normal flex items-center mt-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-smartphone-nfc w-4 h-4 mr-2"><rect width="7" height="12" x="2" y="6" rx="1"/><path d="M13 8.32a7.43 7.43 0 0 1 0 7.36"/><path d="M16.46 6.21a11.76 11.76 0 0 1 0 11.58"/><path d="M19.91 4.1a15.91 15.91 0 0 1 .01 15.8"/></svg>
                {{ contact1 }}
              </div>
              <div class="truncate sm:whitespace-normal flex items-center mt-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-smartphone-nfc w-4 h-4 mr-2"><rect width="7" height="12" x="2" y="6" rx="1"/><path d="M13 8.32a7.43 7.43 0 0 1 0 7.36"/><path d="M16.46 6.21a11.76 11.76 0 0 1 0 11.58"/><path d="M19.91 4.1a15.91 15.91 0 0 1 .01 15.8"/></svg>
                {{ contact2 }}
              </div>
              <div class="truncate sm:whitespace-normal flex items-center mt-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin w-4 h-4 mr-2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                {{ address }}
              </div>
            </div>
          </div>
          <div
            class="mt-6 lg:mt-0 flex-1 px-5 border-t lg:border-0 border-slate-200/60 dark:border-darkmode-400 pt-5 lg:pt-0"
          >
            <div class="font-medium text-center lg:text-left lg:mt-2">
              Member type: {{ relation }}
            </div>
            <div class="flex items-center justify-center lg:justify-start mt-2">
              <div class="">
                Gender: <span class="ml-3 font-medium">{{ gender }}</span>
              </div>
            </div>
            <div class="flex items-center justify-center lg:justify-start mt-2">
              <div class="">
                DOB: <span class="ml-3 font-medium">{{ dob }}</span>
              </div>
            </div>
            <div class="flex items-center justify-center lg:justify-start mt-2">
              <div class="">
                Enrolment Date :
                <span class="ml-3 font-medium">{{ enrolmentDate }}</span>
              </div>
            </div>
            <div class="flex items-center justify-center lg:justify-start mt-2">
              <div class="">
                Plan: <span class="ml-3 font-medium">{{ plan }}</span>
              </div>
            </div>
            <div class="flex items-center justify-center lg:justify-start mt-2">
              <div class="">
                Manager:
                <span class="ml-3 font-medium"
                  >{{ managerFirstName }} {{ managerLastName }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Profile Info -->
      <div class="tab-content mt-5">
        <div
          id="profile"
          class="tab-pane active"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <div class="grid grid-cols-12 gap-6">
            <!-- BEGIN: Latest Uploads -->
  
            <!-- END: Latest Uploads -->
            <!-- BEGIN: Latest Tasks -->
            <div class="intro-y box col-span-12 lg:col-span-6">
              <div
                class="flex items-center px-5 py-5 sm:py-0 border-b border-slate-200/60 dark:border-darkmode-400"
              >
                <h2 class="font-medium text-base mr-auto mt-3 mb-3">
                  Latest Transaction
                </h2>
                <div class="dropdown ml-auto sm:hidden">
                  <a
                    class="dropdown-toggle w-5 h-5 block"
                    href="javascript:;"
                    aria-expanded="false"
                    data-tw-toggle="dropdown"
                  >
                    <i
                      data-lucide="more-horizontal"
                      class="w-5 h-5 text-slate-500"
                    ></i>
                  </a>
                </div>
              </div>
              <div class="p-5">
                <div class="tab-content">
                  <div
                    id="latest-tasks-new"
                    class="tab-pane active"
                    role="tabpanel"
                    aria-labelledby="latest-tasks-new-tab"
                  >
                    <div class="flex items-center">
                      <div
                        class="border-l-2 border-primary dark:border-primary pl-4"
                      >
                        <a href="#" class="font-medium">Compra de medicacao</a>
                        <div class="text-slate-500">10:00 AM</div>
                      </div>
                      <div class="form-check form-switch ml-auto">$ 1.833</div>
                    </div>
                    <div class="flex items-center mt-5">
                      <div
                        class="border-l-2 border-primary dark:border-primary pl-4"
                      >
                        <a href="#" class="font-medium">Exames medicos</a>
                        <div class="text-slate-500">02:00 PM</div>
                      </div>
                      <div class="form-check form-switch ml-auto">$ 8.721</div>
                    </div>
                    <div class="flex items-center mt-5">
                      <div
                        class="border-l-2 border-primary dark:border-primary pl-4"
                      >
                        <a href="#" class="font-medium"
                          >Consulta com expecialista</a
                        >
                        <div class="text-slate-500">04:00 PM</div>
                      </div>
                      <div class="form-check form-switch ml-auto">$ 5.351</div>
                    </div>
                    <div class="flex items-center mt-5">
                      <div
                        class="border-l-2 border-primary dark:border-primary pl-4"
                      >
                        <a href="#" class="font-medium">Consulta geral</a>
                        <div class="text-slate-500">04:00 PM</div>
                      </div>
                      <div class="form-check form-switch ml-auto">$ 2.356</div>
                    </div>
                  </div>
                  <a href="#" class="btn btn-secondary block w-40 mx-auto mt-5"
                    >View More</a
                  >
                </div>
              </div>
            </div>
            <!-- END: Latest Tasks -->
            <!-- BEGIN: Work In Progress -->
            <div class="intro-y box col-span-12 lg:col-span-6">
              <div
                class="flex items-center px-5 py-5 sm:py-0 border-b border-slate-200/60 dark:border-darkmode-400"
              >
                <h2 class="font-medium text-base mr-auto mt-3 mb-3">
                  Dependents
                </h2>
                <div class="dropdown ml-auto sm:hidden">
                  <a
                    class="dropdown-toggle w-5 h-5 block"
                    href="javascript:;"
                    aria-expanded="false"
                    data-tw-toggle="dropdown"
                  >
                    <i
                      data-lucide="more-horizontal"
                      class="w-5 h-5 text-slate-500"
                    ></i>
                  </a>
                </div>
              </div>
              <div class="p-5">
                <div class="tab-content">
                  <div
                    id="work-in-progress-new"
                    class="tab-pane active"
                    role="tabpanel"
                    aria-labelledby="work-in-progress-new-tab"
                  >
                    <div v-if="myMembers.length > 0" class="intro-y">
                      <div
                        class="intro-y"
                        v-for="member in myMembers"
                        :key="member._id"
                      >
                        <router-link :to="`/dependentprofile/${member._id}`">
                          <div
                            class="box px-4 py-4 mb-3 flex items-center zoom-in"
                          >
                            <div
                              class="w-10 h-10 flex-none image-fit rounded-md overflow-hidden"
                            >
                              <img
                                v-if="member.avatar"
                                class="tooltip rounded-full"
                                :title="
                                  member.avatarUploadDate
                                    ? 'Uploaded at ' + member.avatarUploadDate
                                    : 'Avatar Image'
                                "
                                alt="partner logo"
                                :src="`${axios.defaults.baseURL}/${member.avatar}`"
                                @error="handleAvatarError"
                                @load="handleAvatarLoad"
                              />
                              <img
                                v-else
                                src="../../../dist/images/logow.png"
                                alt="profilecustomer"
                                class="rounded-full"
                              />
                            </div>
                            <div class="ml-4 mr-auto">
                              <div class="font-medium">
                                {{ member.firstName }} {{ member.lastName }}
                              </div>
  
                              <div class="text-slate-500 text-xs mt-0.5">
                                {{ member.relation }}
                              </div>
                              <div class="text-slate-500 text-xs mt-0.5">
                                {{ this.formatDate(member.enrolmentDate) }}
                              </div>
                              
                            </div>
                            <div
                              class="lg:text-left mt-3 lg:mt-0"
                              :class="getStatusClass(member.status)"
                            >
                              {{ member.status }}
                            </div>
                            
                          </div>
                        </router-link>
                      </div>
                    </div>
                    <div v-else class="text-center text-gray-600 mt-4">
                      No members found.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- END: Work In Progress -->
            <!-- BEGIN: Latest Uploads -->
            <!-- BEGIN: Latest Uploads -->
            <div class="intro-y box col-span-12 lg:col-span-12">
              <div
                class="flex items-center px-5 py-5 sm:py-3 border-b border-slate-200/60 dark:border-darkmode-400"
              >
                <h2 class="font-medium text-base mr-auto">Uploads</h2>
                <div class="dropdown ml-auto sm:hidden">
                  <a
                    class="dropdown-toggle w-5 h-5 block"
                    href="javascript:;"
                    aria-expanded="false"
                    data-tw-toggle="dropdown"
                  >
                    <i
                      data-lucide="more-horizontal"
                      class="w-5 h-5 text-slate-500"
                    ></i>
                  </a>
                </div>
                <button
                  data-tw-toggle="modal"
                  data-tw-target="#new-order-modal"
                  class="btn btn-outline-secondary hidden sm:flex"
                >
                  Add files
                </button>
              </div>
              <div class="p-5" v-if="multipleFiles && multipleFiles.length > 0">
                <!-- Iterate over the files array and display each file -->
                <div
                  v-for="file in multipleFiles"
                  :key="file"
                  class="flex items-center mt-5"
                >
                  <div class="file">
                    <a
                      :href="getFilePath(file)"
                      target="_blank"
                      class="w-12 file__icon file__icon--directory"
                    ></a>
                  </div>
                  <div class="ml-4">
                    <a
                      :href="getFilePath(file)"
                      target="_blank"
                      class="font-medium"
                    >
                      {{ file }}</a
                    >
                    <div class="text-slate-500 text-xs mt-0.5">
                      {{ getFileSize(file) }}
                    </div>
                  </div>
                  <!-- delete icon -->
                  <div class="dropdown ml-auto mouser" style="cursor: pointer">
                    <a class="flex items-center text-danger" href="javascript:;">
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
                        class="lucide lucide-trash-2"
                        @click="deleteFile(file)"
                      >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        <line x1="10" x2="10" y1="11" y2="17"></line>
                        <line x1="14" x2="14" y1="11" y2="17"></line>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
  
              <div
                v-else
                class="intro-y w-full block text-center rounded-md py-4 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
              >
                No files available. Add customer documents
                <a href="#"></a>
              </div>
            </div>
  
            <!-- END: Latest Uploads -->
  
            <!-- END: Latest Uploads -->
          </div>
        </div>
      </div>
      <!-- Your form code here -->
      <div id="new-order-modal" class="modal" tabindex="-1" aria-hidden="true">
        <!-- Modal content -->
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal header -->
            <div class="modal-header">
              <h2 class="font-medium text-base mr-auto">
                Upload file <span>.jpeg .png .pdf</span>
              </h2>
            </div>
            <div
              v-if="loading"
              class="col-span-6 sm:col-span-3 xl:col-span-2 flex flex-col justify-end items-center"
            ></div>
            <!-- Modal body -->
            <div class="modal-body grid grid-cols-12 gap-4 gap-y-3">
              <div class="col-span-12">
                <label for="pos-form-1" class="form-label">Name</label>
                <div class="fallback">
                  <input
                    ref="fileInput"
                    type="file"
                    multiple
                    required
                    @change="handleFileInputChange"
                  />
                </div>
              </div>
            </div>
  
            <!-- Modal footer -->
            <div class="modal-footer text-right">
              <button
                type="button"
                data-tw-dismiss="modal"
                class="btn btn-outline-secondary w-32 mr-1"
              >
                Cancel
              </button>
              <button
                type="button"
                data-tw-dismiss="modal"
                class="btn btn-primary w-32"
                @click="uploadFiles"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Content -->
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
        plan: "",
        errorMessage: "",
        firstName: "",
        lastName: "",
        avatar: "",
        multipleFiles: [],
        files: [],
        myMembers: [],
        loading: false,
        role: "",
        address: "",
        balancePlan: "",
        contact1: "",
        contact2: "",
        company: "",
        dob: "",
        email: "",
        gender: "",
        memberShipID: "",
        idNumber: "",
        idType: "",
        monthlyFee: "",
        relation: "",
        manager: "",
        managerFirstName: "",
        managerLastName: "",
        id: "",
        enrolmentDate: "",
        status: "",
      };
    },
    watch: {
      id() {
        this.getProfile();
      },
    },
    created() {
      this.getProfile();
    },
    computed: {
      // filesArray() {
      //   const filesString = this.user.multipleFiles;
      //   return filesString.split(",");
      // },
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
      getStatusClass(status) {
      if (status === "Done") {
        return "text-success";
      } else if (status === "Pending") {
        return "text-pending";
      } else if (status === "Canceled") {
        return "text-danger";
      } else if (status === "Under_approval") {
        return "text-warning";
      } else if (status === "Under_assessment") {
        return "text-muted";
      } else if (status === "Received") {
        return "text-primary";
      } else if (status === "Completed") {
        return "text-success";
      } else if (status === "Revoked") {
        return "text-danger";
      }
      {
        return ""; // Default class if no match
      }
    },
  
      getRole(role) {
        if (role === 1) {
          return "Admin";
        } else if (role === 2) {
          return "Line Manager";
        } else if (role === 3) {
          return "Agent";
        }
        {
          return ""; // Default class if no match
        }
      },
      getProfile() { 
        this.loading = true
        const id = this.$route.params.id;
        const token = Cookies.get("token");
        axios
          .get(`/api/user/${id}`, {
            headers: {
              token: token,
            },
          })
          .then((response) => {
            this.loading = false
            // Update the component's data with the received response
            // console.log("Plano", response.data.user.plan[0].planName);
            this.myMembers = response.data.user.myMembers;
  
            this.manager = response.data.user.manager;
            this.managerFirstName = this.manager.firstName;
            this.managerLastName = this.manager.lastName;
            this.company = response.data.user.company;
            this.plan = response.data.user.plan[0].planName;
            this.firstName = response.data.user.firstName;
            this.lastName = response.data.user.lastName;
            this.address = response.data.user.address;
            this.balancePlan = response.data.user.balancePlan;
            this.contact1 = response.data.user.contact1;
            this.contact2 = response.data.user.contact2;
            this.memberShipID = response.data.user.memberShipID;
            // this.dob = response.data.user.dob;
  
            this.dob = this.formatDate(response.data.user.dob);
            this.enrolmentDate = this.formatDate(
              response.data.user.enrolmentDate
            );
  
            this.email = response.data.user.email;
            this.gender = response.data.user.gender;
            this.idNumber = response.data.user.idNumber;
            this.idType = response.data.user.idType;
            this.monthlyFee = response.data.user.monthlyFee;
            this.relation = response.data.user.relation;
            this.status = response.data.user.status;
            // this.enrolmentDate = response.data.user.enrolmentDate;
            this.role = response.data.user.role;
  
            if (response.data.user.multipleFiles) {
              this.multipleFiles = response.data.user.multipleFiles.split(",");
            } else {
              this.multipleFiles = [];
            }
            // Check if the avatar field exists and construct the full URL
            if (response.data.user.avatar) {
              this.avatar = `${response.data.user.avatar}`; // Replace 'your-image-url' with the actual URL or path to your images
            } else {
              this.avatar = ""; // Set to empty string if there is no avatar
            }
          })
          .catch((error) => {
            this.errorMessage = "Error retrieving this plan. Please try again."; // Set the error message
            console.error("Error retrieving plan:", error);
          });
      },
      handleFileInputChange(event) {
        const selectedFiles = event.target.files;
        const filesArray = Array.from(selectedFiles);
  
        // Filter out empty files
        this.files = filesArray.filter((file) => file.size > 0);
  
        // Validate file types
        const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
        const invalidFiles = this.files.filter(
          (file) => !allowedTypes.includes(file.type)
        );
        if (invalidFiles.length > 0) {
          // Show Toast for invalid file types
          const invalidFileNames = invalidFiles
            .map((file) => file.name)
            .join(", ");
          this.showToast("error", `Invalid file type: ${invalidFileNames}`);
          // Clear the file input
          this.$refs.fileInput.value = "";
          this.$refs.fileInput.files = null;
          this.$refs.fileInput.dispatchEvent(new Event("change"));
          // Stop further execution
          return;
        }
      },
  
      showToast(icon, text) {
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
  
        Toast.fire({
          icon: icon,
          text: text,
        });
      },
  
      uploadFiles() {
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
        const id = this.$route.params.id;
        const token = Cookies.get("token");
  
        const formData = new FormData();
  
        this.files.forEach((file) => {
          formData.append(`multipleFiles[]`, file);
        });
  
        // Check if there are any files selected
        if (this.files.length === 0) {
          Toast.fire({
            icon: "error",
            // title: "Error",
            text: "Please select at least one file",
            timer: 3000,
            // showConfirmButton: false,
            // position: "top-end",
          });
          return; // Stop further execution
        }
  
        // Show loading indicator
        this.loading = true;
  
        axios
          .put(`/user/uploadmultiplefiles/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              token: token,
            },
          })
          .then((response) => {
            if (response.data.success) {
              // Close the modal
              this.$refs.fileInput.value = ""; // Clear the file input
              this.$refs.fileInput.files = null; // Reset the file input
              this.$refs.fileInput.dispatchEvent(new Event("change")); // Trigger change event to clear the selected files
              // Display success message using SweetAlert
              Swal.fire({
                icon: "success",
                title: "Success!",
                toast: true,
                text: "Files uploaded successfully",
                timer: 3000,
                showConfirmButton: false,
                position: "top-end",
              }).then(() => {
                // Perform any additional actions after success, if needed
                // Close the modal
              });
            }
            this.getProfile();
            // Hide loading indicator
            this.loading = false;
          })
          .catch((error) => {
            console.error("Error uploading file:", error);
  
            // Hide loading indicator
            this.loading = false;
          });
      },
  
      deleteFile(file) {
        // Show loading indicator
        this.loading = true;
  
        // Display a confirmation dialog using SweetAlert
        Swal.fire({
          title: "Are you sure?",
          text: "You are about to delete the file. This action cannot be undone.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            const token = Cookies.get("token");
            axios
              .delete("admin/file/delete", {
                headers: {
                  token: token,
                },
                data: {
                  userId: this.$route.params.id,
                  file: file,
                },
              })
              .then((response) => {
                console.log(response);
                this.getProfile();
                Swal.fire("Deleted!", "The file has been deleted.", "success");
              })
              .catch((error) => {
                console.error("Error deleting file:", error);
                Swal.fire("Error!", "Failed to delete the file.", "error");
              })
              .finally(() => {
                // Hide loading indicator
                this.loading = false;
              });
          } else {
            // Hide loading indicator if the user cancels the deletion
            this.loading = false;
          }
        });
      },
  
      getFilePath(file) {
        return `${axios.defaults.baseURL}/${file}`;
      },
      getFileName(file) {
        const fileName = file.split("-")[2];
        return fileName;
      },
      getFileSize(file) {
        if (!file) {
          return "";
        }
        const fileSize = file.split("-")[2];
        return fileSize ? `${fileSize} KB` : "";
      },
  
      getAvatarUrl() {
        if (this.avatar) {
          // Assuming the base URL is "http://localhost:8000"
          return `${axios.defaults.baseURL}/${this.avatar.replace("\\", "/")}`;
        }
        // Return a default image URL if the avatar is not available
        return "../../../dist/images/logow.png";
      },
    },
  };
  </script>
  <style></style>
  