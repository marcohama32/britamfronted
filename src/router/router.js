import { createRouter, createWebHistory } from "vue-router";
import Cookies from "js-cookie";
import axios from "axios";
import Login from "../pages/Log-in.vue";
import Signup from "../pages/Sign-up.vue";
import Home from "../pages/HomePage.vue";
// plan
import ViewPlan from "../pages/admin/plan/ViewPlan.vue";
import CreatePlan from "../pages/admin/plan/CreatePlan.vue";
import UpdatePlan from "../pages/admin/plan/UpdatePlan.vue";
// service
import ViewService from "../pages/admin/service/ViewService.vue";
import CreateService from "../pages/admin/service/CreateService.vue";
import UpdateService from "../pages/admin/service/UpdateService.vue";
// Customer transactions
import CustomerTransactions from "../pages/admin/transaction/CustomerTransactions.vue";
import CustomerTransactionDetails from "../pages/admin/transaction/CustomerTransactionDetail.vue";
import CancelTransaction from "../pages/admin/transaction/CancelTransaction.vue";
// Transactions status
import viewPendingTransactions from "@/pages/admin/transaction/viewPendingTransactions.vue";
import viewAprovedTransactions from "@/pages/admin/transaction/viewAprovedTransactions.vue";
import viewCanceledTransactions from "@/pages/admin/transaction/viewCanceledTransactions.vue";
import viewCompletedTransactions from "@/pages/admin/transaction/viewCompletedTransactions.vue";
import viewRevokedTransactions from "@/pages/admin/transaction/viewRevokedTransactions.vue";
// Chat
import Chat from "../pages/chat/ChatPage.vue";
import AdminChatPage from "../pages/chat/AdminChatPage.vue";

// Event
import Event from "../pages/admin/event/CreateEvent.vue";
// Partner
import CreatePartner from "../pages/admin/partner/partner/CreatePartner.vue";
import UpdatePartner from "../pages/admin/partner/partner/UpdatePartner.vue";
import ViewPartner from "../pages/admin/partner/partner/ViewPartner.vue";

//partner access
import SearchCustomer from "../pages/partner/search/SearchCustomer.vue";
import HospitalSearchCustomer from "../pages/partner/search/HospitalSearchCustomer.vue";
import FarmacySearchCustomer from "../pages/partner/search/FarmacySearchCustomer.vue";
// Partner User
import CreatePartnerUser from "../pages/admin/partner/partnerUser/CreatePartnerUser.vue";
import UpdatePartnerUser from "../pages/admin/partner/partnerUser/UpdatePartnerUser.vue";
import ViewPartnerUser from "../pages/admin/partner/partnerUser/ViewPartnerUser.vue";
//transaction
import CreateTransaction from "@/pages/partner/transaction/CreateTransaction.vue";
import HospitalTransaction from "@/pages/partner/transaction/HospitalTransaction.vue";
import FarmacyTransaction from "@/pages/partner/transaction/FarmacyTransaction.vue";
import UpdateTransaction from "@/pages/partner/transaction/UpdateTransaction.vue";
import UpdateHospitalTransaction from "../pages/partner/transaction/UpdateHospitalTransaction.vue";
import MyTransactions from "@/pages/partner/transaction/MyTransactions.vue";
import AllTransactions from "@/pages/partner/transaction/AllTransactions.vue";
import TransactionDetails from "@/pages/partner/transaction/TransactionDetails.vue";
import TransactionInvoice from "@/pages/partner/transaction/TransactionInvoice.vue";
import TransactionHitory from "../pages/partner/transaction/TransactionHistory.vue";
// Company
import CreateCompany from "../pages/admin/company/CreateCompany.vue";
import UpdateCompany from "../pages/admin/company/UpdateCompany.vue";
import ViewCompany from "../pages/admin/company/ViewCompany.vue";
import CompanyMembers from "../pages/admin/company/members/CompanyMembers.vue";
import CreateCorporate from "@/pages/admin/company/members/CreateCorporate.vue";
import CreateBulkCorporate from "@/pages/admin/company/members/CreateBulkCorporate.vue";

import UpdateCorporate from "@/pages/admin/company/members/UpdateCorporate.vue";
import ViewCompanyTransactions from "../pages/admin/transaction/ViewCompanyTransactions.vue";
//dependent
import CreateDependentCorporate from "../pages/admin/customer/CreateDependentCorporate.vue";
import CreateDependentIndividual from "../pages/admin/customer/CreateDependentInvividual.vue";
import UpdateDependentCorporate from "../pages/admin/customer/UpdateDependentCorporate.vue";
import UpdateDependentIndividual from "../pages/admin/customer/UpdateDepententIndividual.vue";
//customer
import CreateIndividualCustomer from "../pages/admin/customer/individual/CreateIndividualCustomer.vue";
import UpdateIndividualCustomer from "../pages/admin/customer/individual/UpdateIndividualCustomer.vue";
import ViewIndividualCustomer from "../pages/admin/customer/individual/ViewIndividualCustomer.vue";
// all customes
import allcustomers from "../pages/admin/customer/allcustomers/viewAllCustomers.vue";

//create employer
import CreateEmployer from "../pages/admin/employer/CreateEmployer.vue";
import UpdateEmployer from "../pages/admin/employer/UpdateEmployer.vue";
import EmployerManagement from "../pages/admin/employer/EmployerManagement.vue";

//agent
import CreateAgent from "../pages/admin/employer/agent/CreateAgent.vue";
import UpdateAgent from "../pages/admin/employer/agent/UpdateAgent.vue";

  //----------------------------------------------------- Start Manager Funactionalities--------------------------------------------------
import ViewMyAgents from "../pages/manager/agents/ViewMyAgents.vue";
import ViewMyInvidividualCustomer from "../pages/manager/individual/ViewMyIndividualCustomers.vue";
import ViewMyCompanies from "../pages/manager/corporate/ViewMyCompanies.vue";
import ViewMyAllCustomers from "../pages/manager/customers/ViewMyAllCustomers.vue"
import ManagerChatPage from "../pages/manager/chat/ManagerChatPage.vue"
import AllManagerTransactions from "../pages/manager/transactions/AllManagerTransactions.vue"
import ManagerRequests from "../pages/manager/requests/ManagerRequests.vue"
import CreateMyAgent from "../pages/manager/agents/CreateMyAgent.vue"
import ManagerDashboard from "../pages/manager/ManagerhomeDashboard.vue"

//admin
import CreateAdmin from "@/pages/admin/employer/admin/CreateAdmin.vue";
import UpdateAdmin from "@/pages/admin/employer/admin/UpdateAdmin.vue";

//dependent
// Profile
import CustomerProfile from "../pages/admin/customer/profile/CustomerProfile.vue";
import EmployerProfile from "../pages/admin/customer/profile/EmployerProfile.vue";
import DependentProfile from "../pages/admin/customer/profile/DependentProfile.vue";

//manager
import CreateManager from "@/pages/admin/employer/manager/CreateManager.vue";
import UpdateManager from "@/pages/admin/employer/manager/UpdateManager.vue";

//user routes
import UserServices from "../pages/user/UserServices.vue";
import UserTransactions from "../pages/user/UserTransactions.vue";

// template files
import templateFiles from "../pages/public/templateFiles/templateFiles.vue";
import viewTemplateFiles from "@/pages/public/templateFiles/viewTemplateFiles.vue";
import createTemplateFile from "../pages/public/templateFiles/createTemplateFile.vue";
import updateTemplateFile from "../pages/public/templateFiles/updateTemplateFile.vue";

// requests
// kanban
import viewRequestAdmin from "@/pages/admin/request/viewRequestAdmin.vue";
//customer request
import createRequest from "@/pages/user/request/createRequest.vue";
import updateRequst from "@/pages/user/request/updateRequest.vue";
import viewRequest from "@/pages/user/request/viewRequest.vue";
import requesthistory from "@/pages/user/request/requestHistory.vue";
//faq
import faqPage from "../pages/public/faqPage.vue";

// not found
import NotFound from "../pages/NotFound.vue";

// reset
import Reset from "../pages/ResetPassword.vue";

//forget
import Forget from "../pages/ForgetPassword.vue";
import ViewInProgressTransactionsVue from "@/pages/admin/transaction/ViewInProgressTransactions.vue";

const routes = [
  {
    path: "/",
    component: Home,
    name: "Dashboard",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  {
    path: "/managerdashboard",
    component: ManagerDashboard,
    name: "Manager Dashboard",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  
  {
    path: "/partner",
    component: SearchCustomer,
    name: "Partner",
    meta: { requiresAuth: true, roles: ["6", "11"] },
  },

  //   plan
  {
    path: "/viewplan",
    component: ViewPlan,
    name: "View Plan",
    meta: { requiresAuth: true, roles: ["1","2","3"] },
  },
  //   all customers
  {
    path: "/allcustomers",
    component: allcustomers,
    name: "View All Customers",
    meta: { requiresAuth: true, roles: ["1"] },
  },
  {
    path: "/createplan",
    component: CreatePlan,
    name: "Create Plan",
    meta: { requiresAuth: true, roles: ["1"] },
  },
  {
    path: "/updateplan/:id",
    component: UpdatePlan,
    name: "Edit Plan",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  //   service
  {
    path: "/viewservices/:id",
    component: ViewService,
    name: "View Service",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  {
    path: "/createservice/:id",
    component: CreateService,
    name: "Create Service",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  {
    path: "/updateservice/:id",
    component: UpdateService,
    name: "Edit Service",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  //   Customer Transations
  {
    path: "/customertransactions",
    component: CustomerTransactions,
    name: "Customer Transactions",
    meta: { requiresAuth: true, roles: ["1"] },
  },
  {
    path: "/customertransactiondetail/:id",
    component: CustomerTransactionDetails,
    name: "Customer Transaction Detail",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  {
    path: "/canceltransaction/:id",
    component: CancelTransaction,
    name: "Cancel Transaction",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  // transaction status
  {
    path: "/transactionspending",
    component: viewPendingTransactions,
    name: "Pending Transactions",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  {
    path: "/transactionsaproved",
    component: viewAprovedTransactions,
    name: "Aproved Transactions",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  {
    path: "/transactionscanceled",
    component: viewCanceledTransactions,
    name: "Canceled Transactions",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  {
    path: "/transactionscompleted",
    component: viewCompletedTransactions,
    name: "Completed Transactions",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  {
    path: "/transactionsrevoked",
    component: viewRevokedTransactions,
    name: "Revoked Transactions",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  {
    path: "/transactionsinprogress",
    component: ViewInProgressTransactionsVue,
    name: "In Progress Transactions",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  //transaction history
  {
    path: "/transactionhitory/:id",
    component: TransactionHitory,
    name: "Transaction Hitory",
    meta: { requiresAuth: true, roles: ["6", "9"] },
  },
  // view company transactions:
  {
    path: "/viewcompanytransactions/:id",
    component: ViewCompanyTransactions,
    name: "View Company Transactions",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  //   Chat
  {
    path: "/chat",
    component: Chat,
    name: "Chat",
    meta: {
      requiresAuth: true,
      roles: ["4", "5", "7", "8"],
    },
  },
  //  Admin Chat
  {
    path: "/adminchat",
    component: AdminChatPage,
    name: "Admin Chat Page",
    meta: {
      requiresAuth: true,
      roles: ["1"],
    },
  },

  //   Event
  {
    path: "/event",
    component: Event,
    name: "Event",
    meta: {
      requiresAuth: true,
      roles: ["1", "2", "3", "4", "5", "6", "7", "8"],
    },
  },
  //   Partner
  {
    path: "/createpartner",
    component: CreatePartner,
    name: "Create Partner",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  {
    path: "/updatepartner/:id",
    component: UpdatePartner,
    name: "Update Partner",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  {
    path: "/viewpartner",
    component: ViewPartner,
    name: "View Partner",
    meta: { requiresAuth: true, roles: ["1"] },
  },

  //   Partner User
  {
    path: "/createpartneruser/:id",
    component: CreatePartnerUser,
    name: "Create Partner User",
    meta: { requiresAuth: true, roles: ["1"] },
  },
  {
    path: "/updatepartneruser/:id",
    component: UpdatePartnerUser,
    name: "Update Partner User",
    meta: { requiresAuth: true, roles: ["1"] },
  },
  {
    path: "/viewpartneruser/:id",
    component: ViewPartnerUser,
    name: "View Partner User",
    meta: { requiresAuth: true, roles: ["1"] },
  },
  //Parner Access
  {
    path: "/searchcustomer",
    component: SearchCustomer,
    name: "Search Customer",
    meta: { requiresAuth: true, roles: ["6"] },
  },
  //Parner Hospital
  {
    path: "/hospital",
    component: HospitalSearchCustomer,
    name: "Hospital Search Customer",
    meta: { requiresAuth: true, roles: ["6"] },
  },
  //Parner Farmacr
  {
    path: "/farmacy",
    component: FarmacySearchCustomer,
    name: "Farmacy Search Customer",
    meta: { requiresAuth: true, roles: ["9"] },
  },

  //partner transaction
  {
    path: "/createtransaction/:id",
    component: CreateTransaction,
    name: "Create Transaction",
    meta: { requiresAuth: true, roles: ["1", "6"] },
  },
  //hospital transaction
  {
    path: "/hospitaltransaction/:id",
    component: HospitalTransaction,
    name: "Hospital Transaction",
    meta: { requiresAuth: true, roles: ["1", "6"] },
  },
  //farmacy transaction
  {
    path: "/farmacytransaction/:id",
    component: FarmacyTransaction,
    name: "farmacy Transaction",
    meta: { requiresAuth: true, roles: ["1", "6"] },
  },
  //update transaction
  {
    path: "/updatetransaction/:id",
    component: UpdateTransaction,
    name: "Update Transaction",
    meta: { requiresAuth: true, roles: ["1", "2", "6"] },
  },
  //update Hospital transaction
  {
    path: "/updatehospitaltransaction/:id",
    component: UpdateHospitalTransaction,
    name: "Update Hospital Transaction",
    meta: { requiresAuth: true, roles: ["6"] },
  },
  {
    path: "/mytransactions",
    component: MyTransactions,
    name: "My Transactions",
    meta: { requiresAuth: true, roles: ["6"] },
  },
  {
    path: "/alltransactions",
    component: AllTransactions,
    name: "All Transactions",
    meta: { requiresAuth: true, roles: ["6"] },
  },

  {
    path: "/transactiondetails/:id",
    component: TransactionDetails,
    name: "Transaction Detail",
    meta: { requiresAuth: true, roles: ["1", "6"] },
  },
  {
    path: "/transactioninvoice/:id",
    component: TransactionInvoice,
    name: "Transaction Invoice",
    meta: {
      requiresAuth: true,
      roles: ["1", "2", "3", "4", "5", "6", "7", "8"],
    },
  },
  //  company
  {
    path: "/createcompany",
    component: CreateCompany,
    name: "Create Company",
    meta: { requiresAuth: true, roles: ["1"] },
  },
  {
    path: "/updatecompany/:id",
    component: UpdateCompany,
    name: "Update Company",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  {
    path: "/viewcompany",
    component: ViewCompany,
    name: "View Company",
    meta: { requiresAuth: true, roles: ["1"] },
  },
  {
    path: "/companymembers/:id",
    component: CompanyMembers,
    name: "View Company Members",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  {
    path: "/createcorporate/:id",
    component: CreateCorporate,
    name: "Create Company Member",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  {
    path: "/createbulkcorporate/:id",
    component: CreateBulkCorporate,
    name: "Create Bulk Company Employers",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  {
    path: "/updatecorporate/:id",
    component: UpdateCorporate,
    name: "Update Company Member",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  //profile
  {
    path: "/customerprofile/:id",
    component: CustomerProfile,
    name: "Customer Profile",
    meta: { requiresAuth: true, roles: ["1", "2", "3", "5", "7", "8"] },
  },
  {
    path: "/employerprofile/:id",
    component: EmployerProfile,
    name: "Employer Profile",
    meta: { requiresAuth: true, roles: ["1", "2", "3", "6"] },
  },
  {
    path: "/dependentprofile/:id",
    component: DependentProfile,
    name: "Dependent Profile",
    meta: { requiresAuth: true, roles: ["1", "2", "3", "4", "5", "7", "8"] },
  },
  //customer
  {
    path: "/createdependentcorporate/:id",
    component: CreateDependentCorporate,
    name: "Create Dependent Corporate",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  {
    path: "/createdependentindividual/:id",
    component: CreateDependentIndividual,
    name: "Create Dependent Individual",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  {
    path: "/updatependentcorporate/:id",
    component: UpdateDependentCorporate,
    name: "Update Dependent Corporate",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  {
    path: "/updatedependentindividual/:id",
    component: UpdateDependentIndividual,
    name: "Update Dependent Invididual",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },

  {
    path: "/createcustomer",
    component: CreateIndividualCustomer,
    name: "Create Individual Customer",
    meta: { requiresAuth: true, roles: ["1"] },
  },
  // View Individual Customers : For admin
  {
    path: "/viewcustomer",
    component: ViewIndividualCustomer,
    name: "View Individual Customer",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  // View Individual Customers : For line manager
  {
    path: "/viewmycustomers",
    component: ViewMyInvidividualCustomer,
    name: "View My Individual Customer",
    meta: { requiresAuth: true, roles: ["2", "3"] },
  },
  {
    path: "/updatecustomer/:id",
    component: UpdateIndividualCustomer,
    name: "Update Individual Customer",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  {
    path: "/createemployer/",
    component: CreateEmployer,
    name: "Create Employer",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  {
    path: "/updateemployer/:id",
    component: UpdateEmployer,
    name: "Update Employer",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  {
    path: "/employermanagement/",
    component: EmployerManagement,
    name: "Employer management",
    meta: { requiresAuth: true, roles: ["1"] },
  },
  {
    path: "/allmanagertransactions/",
    component: AllManagerTransactions,
    name: "All Manager Transactions",
    meta: { requiresAuth: true, roles: ["2"] },
  },
  {
    path: "/managerrequests/",
    component: ManagerRequests,
    name: "Manager Requests",
    meta: { requiresAuth: true, roles: ["2"] },
  },
  //----------------------------------------------------- Start Manager Funactionalities--------------------------------------------------
  // My agents
  {
    path: "/viewmyagents/",
    component: ViewMyAgents,
    name: "View My Agents",
    meta: { requiresAuth: true, roles: ["2"] },
  }, 
  {
    path: "/viewindividualcustomer/",
    component: ViewMyInvidividualCustomer,
    name: "View My Invidividual Customer",
    meta: { requiresAuth: true, roles: ["2"] },
  },
  {
    path: "/viewmanagercompanies/",
    component: ViewMyCompanies,
    name: "View Manager Companies",
    meta: { requiresAuth: true, roles: ["2"] },
  },
  {
    path: "/viewmyallcustomers/",
    component: ViewMyAllCustomers,
    name: "View My All Customers",
    meta: { requiresAuth: true, roles: ["2"] },
  },
  {
    path: "/managerchatpage/",
    component: ManagerChatPage,
    name: "Manager Chat Page",
    meta: { requiresAuth: true, roles: ["2"] },
  },
  {
    path: "/createmyagent/",
    component: CreateMyAgent,
    name: "Create My Agent",
    meta: { requiresAuth: true, roles: ["2"] },
  },
  //----------------------------------------------------- End Manager Funactionalities-------------------------------------------------- 
  //agent
  {
    path: "/createagent/",
    component: CreateAgent,
    name: "Create Agent",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  // {
  //   path: "/viewagents/",
  //   component: CreateAgent,
  //   name: "Create Agent",
  //   meta: { requiresAuth: true, roles: ["2"] },
  // },
  {
    path: "/updateeagent/:id",
    component: UpdateAgent,
    name: "Update Agent",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  //admin
  {
    path: "/createadmin/",
    component: CreateAdmin,
    name: "Create Admin",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  {
    path: "/updateadmin/:id",
    component: UpdateAdmin,
    name: "Update Admin",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },

  //manager
  {
    path: "/createmanager/",
    component: CreateManager,
    name: "Create Manager",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },
  {
    path: "/updatemanager/:id",
    component: UpdateManager,
    name: "Update Manager",
    meta: { requiresAuth: true, roles: ["1", "2"] },
  },

  //   myservices
  {
    path: "/myservices",
    component: UserServices,
    name: "My Services",
    meta: { requiresAuth: true, roles: ["4", "5", "7", "8"] },
  },
  //   usertransactions
  {
    path: "/usertransactions",
    component: UserTransactions,
    name: "User Transactions",
    meta: { requiresAuth: true, roles: ["4", "5", "7", "8"] },
  },

  //   templateFiles
  // for users
  {
    path: "/templatefiles",
    component: templateFiles,
    name: "Template Files",
    meta: {
      requiresAuth: true,
      roles: ["4", "5", "6", "7", "8"],
    },
  },
  // for admin
  {
    path: "/viewtemplatefiles",
    component: viewTemplateFiles,
    name: "View Template Files",
    meta: {
      requiresAuth: true,
      roles: ["1", "2", "3"],
    },
  },
  {
    path: "/createtemplatefile",
    component: createTemplateFile,
    name: "Create Template File",
    meta: {
      requiresAuth: true,
      roles: ["1", "2", "3"],
    },
  },
  {
    path: "/updatetemplatefile/:templateId",
    component: updateTemplateFile,
    name: "Update Template File",
    meta: {
      requiresAuth: true,
      roles: ["1", "2", "3"],
    },
  },
  //   request
  {
    path: "/viewrequestadmin",
    component: viewRequestAdmin,
    name: "View Customer Request",
    meta: { requiresAuth: true, roles: ["1"] },
  },

  //   request
  {
    path: "/viewrequest",
    component: viewRequest,
    name: "View Request",
    meta: { requiresAuth: true, roles: ["4", "5", "7", "8"] },
  },
  {
    path: "/createrequest",
    component: createRequest,
    name: "Create Request",
    meta: { requiresAuth: true, roles: ["4", "5", "7", "8"] },
  },

  {
    path: "/updaterequst",
    component: updateRequst,
    name: "Update Request",
    meta: { requiresAuth: true, roles: ["4", "5", "7", "8"] },
  },
  {
    path: "/requesthistory/:id",
    component: requesthistory,
    name: "Request History",
    meta: { requiresAuth: true, roles: ["4", "5", "7", "8"] },
  },

  //   faq
  {
    path: "/faq",
    component: faqPage,
    name: "Faq",
    meta: {
      requiresAuth: true,
      roles: ["1", "2", "3", "4", "5", "6", "7", "8"],
    },
  },

  // Login & Logout
  {
    path: "/login",
    name: "Login",
    components: {
      default: Login,
      login: Login,
    },
    meta: { requiresAuth: false },
  },

  {
    path: "/signup",
    component: Signup,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/reset/:token",
    name: "Reset Token",
    component: Reset,
    meta: { requiresAuth: false }, // Make sure this is set to false
  },
  {
    path: "/forget-password",
    name: "Forget Password",
    component: Forget,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const isAuthenticated = Cookies.get("token");
  const userRole = Cookies.get("role");
  // const visitedBefore = sessionStorage.getItem("visitedBefore");

  // Check if authentication is required and the user is not authenticated
  if (
    (to.meta.requiresAuth && !isAuthenticated) ||
    (isTokenValid(isAuthenticated) === "false" && to.name !== "Login")
  ) {
    // Clear token and session data on token expiration
    clearUserData();
    window.location.replace("/login");
    return next({ path: "/login" });
  }

  // Redirect users to their respective dashboard based on their role
  if (to.path === "/" && isAuthenticated) {
    if (userRole === "2") {
      return next({ path: "/managerdashboard" });
    } else if (userRole === "6") {
      return next({ path: "/hospital" });
    } else if (userRole === "9") {
      return next({ path: "/farmacy" });
    } else if(userRole === "4" || userRole === "5" || userRole === "6" || userRole === "8"){
      return next({ path: "/usertransactions" });

    }
  }

  // Check if roles are defined and the user role is not included
  if (to.meta.roles && !to.meta.roles.includes(userRole)) {
    return next({ name: "NotFound" });
  }

  // Reset the auto-logout timer on user activity
  if (isAuthenticated) {
    resetAutoLogoutTimer();
  }

  // Allow navigation to the next route
  next();
});

// Define the auto-logout timer functions
let autoLogoutTimer;

function resetAutoLogoutTimer() {
  clearTimeout(autoLogoutTimer);
  autoLogoutTimer = setTimeout(() => {
    clearUserData(); // Perform logout actions
    window.location.replace("/login");
  }, 900000); // 15 minutes (900,000 milliseconds)
}

function clearUserData() {
  Cookies.remove("token");
  Cookies.remove("role");
  sessionStorage.removeItem("visitedBefore");
}



async function isTokenValid(token) {
  try {
    const response = await axios.get("/api/check/verify-token/", {
      headers: {
        token: token,
      },
    });

    return response.status === 200; // Return true if token is valid
  } catch (error) {
    Cookies.remove("token");
    Cookies.remove("role");
    sessionStorage.removeItem("visitedBefore");
    return false; // Return false if token is invalid or request fails
  }
}

export default router;
