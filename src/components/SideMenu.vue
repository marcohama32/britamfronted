<template>
  <div>
    <nav class="side-nav">
      <router-link to="/" class="intro-x flex items-center pl-5 pt-4 mt-3">
        <img alt="logo" class="w-6" src="../logo.png" />
        <span class="hidden xl:block text-white text-lg ml-3"> Britam </span>
      </router-link>
      <div class="side-nav__devider my-6"></div>
      <ul>
        <router-link to="/">
          <li v-if="hasRoute('Dashboard')">
            <a href="javascript:;" class="side-menu">
              <div class="side-menu__icon">
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
                  class="lucide lucide-home"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>

              <div class="side-menu__title">Home</div>
            </a>
          </li>
          <li v-if="hasRoute('My Services')">
            <router-link to="/myservices" class="side-menu">
              <div class="side-menu__icon">
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
                  class="lucide lucide-candlestick-chart"
                >
                  <path d="M9 5v4" />
                  <rect width="4" height="6" x="7" y="9" rx="1" />
                  <path d="M9 15v2" />
                  <path d="M17 3v2" />
                  <rect width="4" height="8" x="15" y="5" rx="1" />
                  <path d="M17 13v3" />
                  <path d="M3 3v18h18" />
                </svg>
              </div>
              <div class="side-menu__title">Services</div>
            </router-link>
          </li>
          <li v-if="hasRoute('User Transactions')">
            <router-link to="/usertransactions" class="side-menu">
              <div class="side-menu__icon">
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
                  class="lucide lucide-badge-cent"
                >
                  <path
                    d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
                  />
                  <path d="M12 7v10" />
                  <path d="M15.4 10a4 4 0 1 0 0 4" />
                </svg>
              </div>
              <div class="side-menu__title">My Transactions</div>
            </router-link>
          </li>
        </router-link>
        <router-link to="/hospital">
          <li v-if="hasRoute('Partner')">
            <a href="javascript:;" class="side-menu">
              <div class="side-menu__icon">
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
                  class="lucide lucide-home"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>

              <div class="side-menu__title">Home</div>
            </a>
          </li>
        </router-link>

        <li v-if="hasRoute('View Individual Customer')">
          <a href="javascript:;" class="side-menu">
            <div class="side-menu__icon">
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
                class="lucide lucide-user-2"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 1 0-16 0" />
              </svg>
            </div>
            <div class="side-menu__title">
              Individual
              <div class="side-menu__sub-icon">
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
                  class="lucide lucide-chevron-down"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </a>
          <ul class="">
            <li v-if="hasRoute('Create Individual Customer')">
              <router-link to="/createcustomer" class="side-menu">
                <div class="side-menu__icon">
                  <i data-lucide="activity"></i>
                </div>
                <div class="side-menu__title">Add customer</div>
              </router-link>
            </li>
            <li v-if="hasRoute('Create Individual Customer')">
              <router-link to="/viewcustomer" class="side-menu">
                <div class="side-menu__icon">
                  <i data-lucide="activity"></i>
                </div>
                <div class="side-menu__title">List customer</div>
              </router-link>
            </li>
            <li v-if="hasRoute('View My Individual Customer')">
              <router-link to="/viewmycustomers" class="side-menu">
                <div class="side-menu__icon">
                  <i data-lucide="activity"></i>
                </div>
                <div class="side-menu__title">List customer</div>
              </router-link>
            </li>
          </ul>
        </li>
        <li v-if="hasRoute('View Company Members')">
          <a href="javascript:;" class="side-menu">
            <div class="side-menu__icon">
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
                class="lucide lucide-building-2"
              >
                <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                <path d="M10 6h4" />
                <path d="M10 10h4" />
                <path d="M10 14h4" />
                <path d="M10 18h4" />
              </svg>
            </div>
            <div class="side-menu__title">
              Companies
              <div class="side-menu__sub-icon">
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
                  class="lucide lucide-chevron-down"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </a>
          <ul class="">
            <li v-if="hasRoute('Create Company')">
              <router-link to="/createcompany" class="side-menu">
                <div class="side-menu__icon">
                  <i data-lucide="activity"></i>
                </div>
                <div class="side-menu__title">Add company</div>
              </router-link>
            </li>
            <li v-if="hasRoute('Create Company')">
              <router-link to="/viewcompany" class="side-menu">
                <div class="side-menu__icon">
                  <i data-lucide="activity"></i>
                </div>
                <div class="side-menu__title">List companies</div>
              </router-link>
            </li>
            <li v-if="hasRoute('View Manager Companies')">
              <router-link to="/viewmanagercompanies" class="side-menu">
                <div class="side-menu__icon">
                  <i data-lucide="activity"></i>
                </div>
                <div class="side-menu__title">List companies</div>
              </router-link>
            </li>
          </ul>
        </li>
        <li v-if="hasRoute('View Partner')">
          <a href="javascript:;" class="side-menu">
            <div class="side-menu__icon">
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
                class="lucide lucide-heart-handshake"
              >
                <path
                  d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                />
                <path
                  d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"
                />
                <path d="m18 15-2-2" />
                <path d="m15 18-2-2" />
              </svg>
            </div>
            <div class="side-menu__title">
              Partner
              <div class="side-menu__sub-icon">
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
                  class="lucide lucide-chevron-down"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </a>
          <ul class="">
            <li>
              <router-link to="/createpartner" class="side-menu">
                <div class="side-menu__icon">
                  <i data-lucide="activity"></i>
                </div>
                <div class="side-menu__title">Add partner</div>
              </router-link>
            </li>
            <li>
              <router-link to="/viewpartner" class="side-menu">
                <div class="side-menu__icon">
                  <i data-lucide="activity"></i>
                </div>
                <div class="side-menu__title">List partner</div>
              </router-link>
            </li>
          </ul>
        </li>

        <li v-if="hasRoute('View All Customers')">
          <router-link to="/allcustomers" class="side-menu">
            <div class="side-menu__icon">
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
                class="lucide lucide-users-2"
              >
                <path d="M14 19a6 6 0 0 0-12 0" />
                <circle cx="8" cy="9" r="4" />
                <path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8" />
              </svg>
            </div>
            <div class="side-menu__title">All Customers</div>
          </router-link>
        </li>
        <li v-if="hasRoute('View My All Customers')">
          <router-link to="/viewmyallcustomers" class="side-menu">
            <div class="side-menu__icon">
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
                class="lucide lucide-users-2"
              >
                <path d="M14 19a6 6 0 0 0-12 0" />
                <circle cx="8" cy="9" r="4" />
                <path d="M22 19a6 6 0 0 0-6-6 4 4 0 1 0 0-8" />
              </svg>
            </div>
            <div class="side-menu__title">All Customers</div>
          </router-link>
        </li>
        <li
          v-if="hasRoute('Customer Transactions')"
          class="side-nav__devider my-6"
        ></li>
        <li v-if="hasRoute('View Plan')">
          <a href="javascript:;" class="side-menu">
            <div class="side-menu__icon">
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
                class="lucide lucide-gantt-chart-square"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 8h7" />
                <path d="M8 12h6" />
                <path d="M11 16h5" />
              </svg>
            </div>
            <div class="side-menu__title">
              Plan
              <div class="side-menu__sub-icon">
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
                  class="lucide lucide-chevron-down"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </a>
          <ul class="">
            <li v-if="hasRoute('Create Plan')">
              <router-link to="/createplan" class="side-menu">
                <div class="side-menu__icon">
                  <i data-lucide="activity"></i>
                </div>
                <div class="side-menu__title">Add plan</div>
              </router-link>
            </li>
            <li v-if="hasRoute('View Plan')">
              <router-link to="/viewplan" class="side-menu">
                <div class="side-menu__icon">
                  <i data-lucide="activity"></i>
                </div>
                <div class="side-menu__title">List plan</div>
              </router-link>
            </li>
          </ul>
        </li>

        <li v-if="hasRoute('Create Employer')">
          <a href="javascript:;" class="side-menu">
            <div class="side-menu__icon">
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
                class="lucide lucide-user-cog-2"
              >
                <circle cx="18" cy="15" r="3" />
                <circle cx="8" cy="9" r="4" />
                <path d="M10.5 13.5A6 6 0 0 0 2 19" />
                <path d="m21.7 16.4-.9-.3" />
                <path d="m15.2 13.9-.9-.3" />
                <path d="m16.6 18.7.3-.9" />
                <path d="m19.1 12.2.3-.9" />
                <path d="m19.6 18.7-.4-1" />
                <path d="m16.8 12.3-.4-1" />
                <path d="m14.3 16.6 1-.4" />
                <path d="m20.7 13.8 1-.4" />
              </svg>
            </div>
            <div class="side-menu__title">
              Employer
              <div class="side-menu__sub-icon">
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
                  class="lucide lucide-chevron-down"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </a>
          <ul class="Create Agent">
            <li v-if="hasRoute('Employer management')">
              <router-link to="/employermanagement" class="side-menu">
                <div class="side-menu__icon">
                  <i data-lucide="activity"></i>
                </div>
                <div class="side-menu__title">Employer managment</div>
              </router-link>
            </li>
            <li v-if="hasRoute('View My Agents')">
              <router-link to="/viewmyagents" class="side-menu">
                <div class="side-menu__icon">
                  <i data-lucide="activity"></i>
                </div>
                <div class="side-menu__title">My Agents</div>
              </router-link>
            </li>
          </ul>
        </li>

        <li v-if="hasRoute('Chat')">
          <router-link to="/chat" class="side-menu">
            <div class="side-menu__icon">
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
                class="lucide lucide-message-square"
              >
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                />
              </svg>
            </div>
            <div class="side-menu__title">Chat</div>
          </router-link>
        </li>

        <li v-if="hasRoute('Manager Chat Page')">
          <router-link to="/managerchatpage" class="side-menu">
            <div class="side-menu__icon">
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
                class="lucide lucide-message-square"
              >
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                />
              </svg>
            </div>
            <div class="side-menu__title">Chat</div>
          </router-link>
        </li>

        <li v-if="hasRoute('Admin Chat Page')">
          <router-link to="/adminchat" class="side-menu">
            <div class="side-menu__icon">
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
                class="lucide lucide-message-square"
              >
                <path
                  d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                />
              </svg>
            </div>
            <div class="side-menu__title">Chat</div>
          </router-link>
        </li>

        <!-- <li class="side-nav__devider my-6"></li> -->
        <li v-if="hasRoute('Customer Transactions')">
          <router-link to="/customertransactions" class="side-menu">
            <div class="side-menu__icon">
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
                class="lucide lucide-badge-cent"
              >
                <path
                  d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
                />
                <path d="M12 7v10" />
                <path d="M15.4 10a4 4 0 1 0 0 4" />
              </svg>
            </div>
            <div class="side-menu__title">Transactions</div>
          </router-link>
        </li>
        <li v-if="hasRoute('All Manager Transactions')">
          <router-link to="/allmanagertransactions" class="side-menu">
            <div class="side-menu__icon">
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
                class="lucide lucide-badge-cent"
              >
                <path
                  d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
                />
                <path d="M12 7v10" />
                <path d="M15.4 10a4 4 0 1 0 0 4" />
              </svg>
            </div>
            <div class="side-menu__title">Transactions</div>
          </router-link>
        </li>
        <li v-if="hasRoute('View Customer Request')">
          <router-link to="/viewrequestadmin" class="side-menu">
            <div class="side-menu__icon">
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
                class="lucide lucide-git-pull-request-closed"
              >
                <circle cx="18" cy="18" r="3" />
                <circle cx="6" cy="6" r="3" />
                <path d="M18 11.5V15" />
                <path d="m21 3-6 6" />
                <path d="m21 9-6-6" />
                <line x1="6" x2="6" y1="9" y2="21" />
              </svg>
            </div>
            <div class="side-menu__title">Requests</div>
          </router-link>
        </li>

        <li v-if="hasRoute('View Request')">
          <router-link to="/viewrequest" class="side-menu">
            <div class="side-menu__icon">
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
                class="lucide lucide-file-bar-chart"
              >
                <path d="M19 21V4H5v16m0-16h14l-4 4-4-4z" />
              </svg>
            </div>
            <div class="side-menu__title">My Requests</div>
          </router-link>
        </li>

        <li v-if="hasRoute('Manager Requests')">
          <router-link to="/managerrequests" class="side-menu">
            <div class="side-menu__icon">
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
                class="lucide lucide-file-bar-chart"
              >
                <path d="M19 21V4H5v16m0-16h14l-4 4-4-4z" />
              </svg>
            </div>
            <div class="side-menu__title">Requests</div>
          </router-link>
        </li>

        <!-- -----------------------------------Partner---------------------------------------- -->
        <li v-if="hasRoute('Customer Transactions')"></li>

        <li v-if="hasRoute('My Transactions')">
          <router-link to="/mytransactions" class="side-menu">
            <div class="side-menu__icon">
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
                class="lucide lucide-badge-cent"
              >
                <path
                  d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
                />
                <path d="M12 7v10" />
                <path d="M15.4 10a4 4 0 1 0 0 4" />
              </svg>
            </div>
            <div class="side-menu__title">My Transactions</div>
          </router-link>
        </li>
        <li v-if="hasRoute('All Transactions')">
          <router-link to="/alltransactions" class="side-menu">
            <div class="side-menu__icon">
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
                class="lucide lucide-badge-cent"
              >
                <path
                  d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
                />
                <path d="M12 7v10" />
                <path d="M15.4 10a4 4 0 1 0 0 4" />
              </svg>
            </div>
            <div class="side-menu__title">All Transactions</div>
          </router-link>
        </li>

        <li class="side-nav__devider my-6"></li>
        <!-- files -->
        <li v-if="hasRoute('Template Files')">
          <router-link to="/templatefiles" class="side-menu">
            <div class="side-menu__icon">
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
                class="lucide lucide-file-archive"
              >
                <path
                  d="M4 22V4c0-.5.2-1 .6-1.4C5 2.2 5.5 2 6 2h8.5L20 7.5V20c0 .5-.2 1-.6 1.4-.4.4-.9.6-1.4.6h-2"
                />
                <polyline points="14 2 14 8 20 8" />
                <circle cx="10" cy="20" r="2" />
                <path d="M10 7V6" />
                <path d="M10 12v-1" />
                <path d="M10 18v-2" />
              </svg>
            </div>
            <div class="side-menu__title">Template Files</div>
          </router-link>
        </li>
        <!-- admin -->
        <li v-if="hasRoute('View Template Files')">
          <router-link to="/viewtemplatefiles" class="side-menu">
            <div class="side-menu__icon">
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
                class="lucide lucide-file-archive"
              >
                <path
                  d="M4 22V4c0-.5.2-1 .6-1.4C5 2.2 5.5 2 6 2h8.5L20 7.5V20c0 .5-.2 1-.6 1.4-.4.4-.9.6-1.4.6h-2"
                />
                <polyline points="14 2 14 8 20 8" />
                <circle cx="10" cy="20" r="2" />
                <path d="M10 7V6" />
                <path d="M10 12v-1" />
                <path d="M10 18v-2" />
              </svg>
            </div>
            <div class="side-menu__title">Template Files</div>
          </router-link>
        </li>
        <li class="side-nav__devider my-6"></li>
        <!-- faq -->
        <!-- <li v-if="hasRoute('Faq')">
          <router-link to="/faq" class="side-menu">
            <div class="side-menu__icon">
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
                class="lucide lucide-help-circle"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
            </div>
            <div class="side-menu__title">Help</div>
          </router-link>
        </li> -->
      </ul>
    </nav>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  computed: {
    filteredRoutes() {
      try {
        // const isAuthenticated = localStorage.getItem("token");
        // const userRole = localStorage.getItem("role");
        const isAuthenticated = Cookies.get("token"); // Retrieve token from cookie
        const userRole = Cookies.get("role"); // Retrieve role from cookie
        // Filter routes based on authentication and user role
        const routes = this.$router.options.routes;
        const filteredRoutes = routes.filter((route) => {
          if (route.meta && route.meta.requiresAuth && !isAuthenticated) {
            return false;
          }
          if (
            route.meta &&
            route.meta.roles &&
            !route.meta.roles.includes(userRole)
          ) {
            return false;
          }
          return true;
        });
        return filteredRoutes;
      } catch (error) {
        console.error("Error in filteredRoutes:", error);
        return [];
      }
    },
  },
  methods: {
    hasRoute(routeName) {
      const hasRoute = this.filteredRoutes.some(
        (route) => route.name === routeName
      );
      return hasRoute;
    },
  },
};
</script>

<style>
/* Add your styles here */
</style>
