<template>
  <div>
 
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 2xl:col-span-9">
        <div class="grid grid-cols-12 gap-6">
          <!-- BEGIN: General Report -->
          <div class="col-span-12 mt-8">
            <div class="intro-y flex items-center h-10">
              <h2 class="text-lg font-medium truncate mr-5">Dashboard</h2>
            </div>

            <div class="grid grid-cols-12 gap-6 mt-5">
              <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <router-link to="/allcustomers">
                  <div class="report-box zoom-in">
                    <div class="box p-5">
                      <!-- <div class="flex">
                      <i
                        data-lucide="shopping-cart"
                        class="report-box__icon text-primary"
                      ></i>
                      <div class="ml-auto">
                        <div
                          class="report-box__indicator bg-success tooltip cursor-pointer"
                          title="33% Higher than last month"
                        >
                          33%
                          <i
                            data-lucide="chevron-up"
                            class="w-4 h-4 ml-0.5"
                          ></i>
                        </div>
                      </div>
                    </div> -->
                      <!-- class="w-8 h-8"> -->
                      <div class="text-3xl font-medium leading-8 mt-6">
                        <label v-if="totalCustomers">{{ totalCustomers }}</label
                        ><label v-else>
                          <div class="spinner" style="font-size: 18px"></div>
                        </label>
                      </div>
                      <div class="text-base text-slate-500 mt-1">Customers</div>
                    </div>
                  </div>
                </router-link>
              </div>
              <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <router-link to="/viewcompany">
                  <div class="report-box zoom-in">
                    <div class="box p-5">
                      <!-- <div class="flex">
                      <i
                        data-lucide="credit-card"
                        class="report-box__icon text-pending"
                      ></i>
                      <div class="ml-auto">
                        <div
                          class="report-box__indicator bg-danger tooltip cursor-pointer"
                          title="2% Lower than last month"
                        >
                          2%
                          <i
                            data-lucide="chevron-down"
                            class="w-4 h-4 ml-0.5"
                          ></i>
                        </div>
                      </div>
                    </div> -->
                      <div class="text-3xl font-medium leading-8 mt-6">
                        <label v-if="totalCompanies">{{ totalCompanies }}</label
                        ><label v-else>
                          <div class="spinner" style="font-size: 18px"></div>
                        </label>
                      </div>
                      <div class="text-base text-slate-500 mt-1">Companies</div>
                    </div>
                  </div>
                </router-link>
              </div>
              <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <router-link to="/viewpartner">
                  <div class="report-box zoom-in">
                    <div class="box p-5">
                      <!-- <div class="flex">
                      <i
                        data-lucide="monitor"
                        class="report-box__icon text-warning"
                      ></i>
                      <div class="ml-auto">
                        <div
                          class="report-box__indicator bg-success tooltip cursor-pointer"
                          title="12% Higher than last month"
                        >
                          12%
                          <i
                            data-lucide="chevron-up"
                            class="w-4 h-4 ml-0.5"
                          ></i>
                        </div>
                      </div>
                    </div> -->

                      <div class="text-3xl font-medium leading-8 mt-6">
                        <label v-if="totalPartners">{{ totalPartners }}</label
                        ><label v-else>
                          <div class="spinner" style="font-size: 18px"></div>
                        </label>
                      </div>

                      <div class="text-base text-slate-500 mt-1">Partners</div>
                    </div>
                  </div>
                </router-link>
              </div>

              <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <router-link to="/customertransactions">
                  <div class="report-box zoom-in">
                    <div class="box p-5">
                      <!-- <div class="flex">
                      <i
                        data-lucide="user"
                        class="report-box__icon text-success"
                      ></i>
                      <div class="ml-auto">
                        <div
                          class="report-box__indicator bg-success tooltip cursor-pointer"
                          title="22% Higher than last month"
                        >
                          Pending: {{ totalPendingTransactions }}
                          <i
                            data-lucide="chevron-up"
                            class="w-4 h-4 ml-0.5"
                          ></i>
                        </div>
                      </div>
                    </div> -->

                      <div class="text-3xl font-medium leading-8 mt-6">
                        <label v-if="totalTransactions">{{
                          totalTransactions
                        }}</label
                        ><label v-else>
                          <div class="spinner" style="font-size: 18px"></div>
                        </label>
                      </div>

                      <div class="text-base text-slate-500 mt-1">
                        Transactions
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <!-- END: General Report -->
          <!-- BEGIN: Sales Report -->
          <div class="col-span-12 lg:col-span-6 mt-8">
            <div class="intro-y block sm:flex items-center h-10">
              <h2 class="text-lg font-medium truncate mr-5">Sales Report</h2>
            </div>
            <div class="intro-y box p-5 mt-12 sm:mt-5">
              <div class="flex flex-col md:flex-row md:items-center">
                <div class="flex">
                  <div>
                    <div
                      class="text-primary dark:text-slate-300 text-lg xl:text-xl font-medium"
                    >
                      {{ formatCurrency(this.currentMonthRevenue) }}
                    </div>
                    <div class="mt-0.5 text-slate-500">This Month</div>
                  </div>
                  <div
                    class="w-px h-12 border border-r border-dashed border-slate-200 dark:border-darkmode-300 mx-4 xl:mx-5"
                  ></div>
                  <div>
                    <div class="text-slate-500 text-lg xl:text-xl font-medium">
                      {{ formatCurrency(lastMonthRevenue) }}
                    </div>
                    <div class="mt-0.5 text-slate-500">Last Month</div>
                  </div>
                </div>
              </div>
              <div class="report-chart">
                <div class="h-[275px]">
                  <!-- <canvas id="report-line-chart" class="mt-6 -mb-6"></canvas> -->
                  <canvas
                    v-if="canvasExists"
                    ref="myChart"
                    class="mt-6 -mb-6"
                  ></canvas>
                </div>
              </div>
            </div>
          </div>
          <!-- END: Sales Report -->

          <div class="col-span-12 sm:col-span-12 lg:col-span-6 mt-8">
            <div class="intro-y flex items-center h-10">
              <h2 class="text-lg font-medium truncate mr-5">
                Must Used Services
              </h2>
              <!-- <a href="#" class="ml-auto ">Show More</a> -->
            </div>
            <div class="intro-y box p-5 mt-12 sm:mt-5">
              <div
                class="flex flex-col md:flex-row md:items-center justify-center"
              >
                <div class="h-[275px]">
                  <canvas v-if="canvasExists" ref="myChart2"></canvas>
                </div>
              </div>
            </div>
          </div>

          <!-- BEGIN: Weekly Best Sellers -->
          <div class="col-span-12 xl:col-span-4 mt-6">
            <div class="intro-y flex items-center h-10">
              <h2 class="text-lg font-medium truncate mr-5">
                Customer Requests
              </h2>
            </div>
            <div class="mt-5">
              <div v-if="recentRequests.length > 0" class="intro-y">
                <div
                  v-for="customerRequest in recentRequests"
                  :key="customerRequest"
                  class="box px-4 py-4 mb-3 flex items-center zoom-in"
                >
                  <div
                    class="w-10 h-10 flex-none image-fit rounded-md overflow-hidden"
                  >
                    <img alt="Midone - HTML Admin Template" src="" />
                  </div>
                  <div class="ml-4 mr-auto">
                    <div class="font-medium">{{ customerRequest.title }}</div>
                    <div class="text-slate-500 text-xs mt-0.5">
                      {{ formatDateWithTime(customerRequest.createdAt) }}
                    </div>
                  </div>
                  <div
                    class="text-black cursor-pointer font-medium"
                    :class="getStatusClass(customerRequest.status)"
                  >
                    {{ customerRequest.status }}
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="spinner" style="font-size: 18px"></div>
              </div>

              <a
                href="#"
                class="intro-y w-full block text-center rounded-md py-4 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
                >View More</a
              >
            </div>
          </div>
          <!-- END: Weekly Best Sellers -->
        </div>
      </div>
      <div class="col-span-12 2xl:col-span-3">
        <div class="2xl:border-l -mb-10 pb-10">
          <div class="2xl:pl-6 grid grid-cols-12 gap-x-6 2xl:gap-x-0 gap-y-6">
            <!-- BEGIN: Transactions -->
            <div
              class="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3 2xl:mt-8"
            >
              <div class="intro-x flex items-center h-10">
                <h2 class="text-lg font-medium truncate mr-5">
                  Pending Transactions
                </h2>
              </div>
              <div class="mt-5">
                <div v-if="recentTransactions.length > 0">
                  <div
                    v-for="transactions in recentPendingTransactions"
                    :key="transactions"
                    class="intro-x"
                  >
                    <div class="box px-5 py-3 mb-3 flex items-center zoom-in">
                      <div class="ml mr-auto">
                        <div class="font-medium">
                          {{ transactions.invoiceNumber }}
                        </div>
                        <div class="text-slate-500 text-xs mt-0.5">
                          {{ transactions.createdAt }}
                        </div>
                      </div>
                      <div class="text-primary truncate">
                        {{ formatCurrency(transactions.amount) }}
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div class="spinner" style="font-size: 18px"></div>
                </div>

                <a
                  href="/customertransactions"
                  class="intro-x w-full block text-center rounded-md py-3 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
                  >View More</a
                >
              </div>
            </div>
            <!-- END: Transactions -->
            <!-- BEGIN: Recent Activities -->
            <div
              class="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3"
            >
              <div class="intro-x flex items-center h-10">
                <h2 class="text-lg font-medium truncate mr-5">
                  Latest Transactions
                </h2>
                <a href="#" class="ml-auto text-primary truncate">Show More</a>
              </div>
              <div
                class="mt-5 relative before:block before:absolute before:w-px before:h-[85%] before:bg-slate-200 before:dark:bg-darkmode-400 before:ml-5 before:mt-5"
              >
                <router-link to="/customertransactions">
                  <div v-if="recentTransactions.length > 0">
                    <div
                      v-for="transactions in recentTransactions"
                      :key="transactions"
                      class="intro-x"
                    >
                      <div class="box px-5 py-3 mb-3 flex items-center zoom-in">
                        <div class="ml mr-auto">
                          <div class="font-medium">
                            {{ transactions.invoiceNumber }}
                          </div>
                          <div class="text-slate-500 text-xs mt-0.5">
                            {{ formatDateWithTime(transactions.createdAt) }}
                          </div>
                        </div>
                        <div class="text-success">
                          {{ formatCurrency(transactions.amount) }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-else>
                    <div class="spinner" style="font-size: 18px"></div>
                  </div>
                </router-link>
              </div>
            </div>
            <!-- END: Recent Activities -->
            <!-- BEGIN: Important Notes -->
            <div
              class="col-span-12 md:col-span-6 xl:col-span-12 xl:col-start-1 xl:row-start-1 2xl:col-start-auto 2xl:row-start-auto mt-3"
            >
              <div class="intro-x flex items-center h-10">
                <h2 class="text-lg font-medium truncate mr-auto">
                  New messages
                </h2>
              </div>
              <div v-if="recentMessages.length > 0">
                <div
                  v-for="message in recentMessages"
                  :key="message"
                  class="mt-5 intro-x"
                >
                  <div class="box zoom-in">
                    <div class="tiny-slider" id="important-notes">
                      <div class="p-5">
                        <div class="text-base font-medium truncate">
                          {{ message.senderName }}
                        </div>
                        <div class="text-slate-400 mt-1">
                          {{ formatDateWithTime(message.timestamp) }}
                        </div>
                        <div class="text-slate-500 text-justify mt-1">
                          {{ message.text }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="spinner" style="font-size: 18px"></div>
              </div>
            </div>
            <!-- END: Important Notes -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Cookies from "js-cookie";
import Chart from "chart.js/auto";
export default {
  data() {
    return {
      response: null,
      userID: "",

      totalCustomers: "",
      totalIndivCustomers: "",
      totalCorpCustomers: "",
      totalTransactions: "",
      totalPendingTransactions: "",
      totalMessages: "",
      totalCompanies: "",
      totalPartners: "",
      totalServices: "",
      totalRequests: "",
      recentTransactions: [],
      recentPendingTransactions: [],
      recentMessages: [],
      recentRequests: [],
      currentMonthRevenue: "",
      lastMonthRevenue: "",
      dailyTransactionAmounts: "",
      servicePopularity: "",
      chartInstance: null, // Add a chart instance property
      chartInstance2: null, // Add a chart instance property
      canvasExists: false,
    };
  },
  created() {
    this.getDashboardData();
    //user is not authorized
    // if (Cookies.get("token"); == null) {
    //   this.$router.push("/login");
    // }
    this.$socket.on("chat message", (message) => {
      console.log("Received chat message:", message);
      // this.fetchChatMessages();
    });
    setInterval(() => {
      this.getDashboardData();
    }, 2 * 60 * 1000); // 5 minutes in milliseconds
  },
  methods: {
    formatDateWithTime(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    formatCurrency(value) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      return formatter.format(value);
    },
    getStatusClass(status) {
      if (status === "Done") {
        return "text-success";
      } else if (status === "Pending") {
        return "text-pending";
      } else if (status === "canceled") {
        return "text-danger";
      } else if (status === "Under_approval") {
        return "text-warning";
      } else if (status === "Under_assessment") {
        return "text-muted";
      } else if (status === "Received") {
        return "text-primary";
      }
      {
        return ""; // Default class if no match
      }
    },
    formatTimestamp(timestamp) {
      const currentTime = new Date();
      const messageTime = new Date(timestamp);

      const timeDifference = currentTime - messageTime;
      const seconds = Math.floor(timeDifference / 1000);

      if (seconds < 60) {
        return `${seconds} seconds ago`;
      }

      const minutes = Math.floor(seconds / 60);

      if (minutes < 60) {
        return `${minutes} minutes ago`;
      }

      const hours = Math.floor(minutes / 60);

      if (hours < 24) {
        return `${hours} hours ago`;
      }

      const days = Math.floor(hours / 24);

      return `${days} days ago`;
    },
    async getDashboardData() {
      const token = Cookies.get("token");
      await axios
        .get("/api/dashboard/getdata", {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          const dashboardData = response.data;
          this.totalCustomers = dashboardData.totalCustomers;
          this.totalIndivCustomers = dashboardData.totalIndivCustomers;
          this.totalCorpCustomers = dashboardData.totalCorpCustomers;
          this.totalTransactions = dashboardData.totalTransactions;
          this.totalPendingTransactions =
            dashboardData.totalPendingTransactions;
          this.totalMessages = dashboardData.totalMessages;
          this.totalCompanies = dashboardData.totalCompanies;
          this.totalPartners = dashboardData.totalPartners;
          this.totalServices = dashboardData.totalServices;
          this.totalRequests = dashboardData.totalRequests;
          this.recentTransactions = dashboardData.recentTransactions;
          this.recentPendingTransactions =
            dashboardData.recentPendingTransactions;
          this.recentMessages = dashboardData.recentMessages;
          this.recentRequests = dashboardData.recentRequests;

          this.currentMonthRevenue = dashboardData.currentMonthRevenue;
          this.lastMonthRevenue = dashboardData.lastMonthRevenue;

          this.dailyTransactionAmounts = dashboardData.dailyTransactionAmounts;
          this.servicePopularity = dashboardData.servicePopularity;

          // Access the dailyTransactionStats object from dashboardData
          const dailyTransactionStats = dashboardData.dailyTransactionStats;

          // Extract dates and corresponding transaction amounts
          const dailyTransactionDates = Object.keys(dailyTransactionStats);
          const dailyTransactionAmounts = dailyTransactionDates.map(
            (date) => dailyTransactionStats[date].amount
          );
          // Destroy the existing charts if they exist
          // Destroy the existing charts if they exist
          if (this.chartInstance) {
            this.chartInstance.destroy();
          }
          if (this.chartInstance2) {
            this.chartInstance2.destroy();
          }

          if (this.$refs.myChart && this.$refs.myChart2) {
            // console.error("Canvas exist.");
            // console.log(this.$refs.myChart);
            // console.log(this.$refs.myChart2);
          } else {
            console.error("Canvas elements are not available.");
          }
          this.canvasExists = true;

          // const ctx = document.getElementById("myChart");
          const ctx = this.$refs.myChart.getContext("2d");

          this.chartInstance = new Chart(ctx, {
            type: "bar",
            data: {
              labels: dailyTransactionDates,
              datasets: [
                {
                  label: "Daily Transactions",
                  data: dailyTransactionAmounts,
                  borderWidth: 1,
                },
              ],
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            },
          });

          const servicePopularityData = this.servicePopularity.map(
            (service) => ({
              label: service.serviceName,
              data: [service.count],
            })
          );
          const colors = [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            // Add more colors as needed
          ];

          // const ctx2 = document.getElementById("myChart2");
          const ctx2 = this.$refs.myChart2.getContext("2d");

          this.chartInstance2 = new Chart(ctx2, {
            type: "doughnut",
            data: {
              labels: servicePopularityData.map((service) => service.label),
              datasets: [
                {
                  label: "Service Popularity",
                  data: servicePopularityData.map((service) => service.data[0]),
                  backgroundColor: colors,
                  borderWidth: 1,
                },
              ],
            },
            plugins: {
              legend: {
                position: "top", // Change the legend position if needed
                responsive: true,
                maintainAspectRatio: false, // Set to false to adjust chart size according to canvas dimensions
                padding: 10, // Adjust the padding value as needed
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const label =
                      servicePopularityData[context.dataIndex].label;
                    const value = servicePopularityData[context.dataIndex].data;
                    return `${label}: ${value}`;
                  },
                },
              },
            },
          });
          //
        })
        .catch((error) => {
          this.errorMessage =
            "Error retrieving this profile. Please try again.";
          console.error("Error retrieving profile:", error);
        });
    },
  },

  mounted() {
    console.log("myChart:", this.$refs.myChart);
    console.log("myChart2:", this.$refs.myChart2);
    // this.fetchChatMessages()
    this.$nextTick(() => {
      this.getDashboardData(); // Move your chart initialization code here
    });
    // this.getDashboardData();
  },
  beforeUnmount() {
    // Ensure that you destroy the charts when the component is about to be destroyed
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    if (this.chartInstance2) {
      this.chartInstance2.destroy();
    }
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
