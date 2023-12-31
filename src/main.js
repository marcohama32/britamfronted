import { createApp } from "vue";
import axios from "axios";
import App from "./App.vue";
import VueCookies from "vue-cookies";
import Cookies from "js-cookie";
import router from "./router/router";
import store from "./store/store";
import NotificationComponent from "./components/NotificationComponent.vue";
import io from "socket.io-client";
import VueFlatpickr from "vue-flatpickr-component";

// Import the Flatpickr CSS
import "flatpickr/dist/flatpickr.css";
// Set default base URL for Axios requests

// axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.baseURL = "https://zeus-api-63pe.onrender.com";

// Add an Axios interceptor for handling 401 status code
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      let msg = error.response.data.returnMessage;
      Cookies.set("logoutReason", msg);
      const response = axios.get("/api/logout");
      if (response.data.success) {
        Cookies.remove("token");
        router.push("/login");
      }
    }
    return Promise.reject(error);
  }
);

const app = createApp(App);

app.use(VueCookies);
app.use(router);
app.use(store);

// Register the NotificationComponent globally to use it in any part of the app
app.component("notification-component", NotificationComponent);

// Create a socket connection
// const socket = io("ws://localhost:8000", {
// const socket = io("ws://zeus-api-63pe.onrender.com", {
//   transports: ["websocket", "polling", "flashsocket"],
// }); // Replace with your server's URL
// const socket = io("ws://localhost:8000", {
const socket = io("https://zeus-api-63pe.onrender.com", {
  transports: ["websocket", "polling", "flashsocket"],
});

// Add the socket to the Vue app's prototype
app.config.globalProperties.$socket = socket;

// Track socket connection status
app.config.globalProperties.$socketStatus = "connecting";

socket.on("connect", () => {
  console.log("Socket connected");
  app.config.globalProperties.$socketStatus = "connected";
});

socket.on("disconnect", () => {
  console.log("Socket disconnected");
  app.config.globalProperties.$socketStatus = "disconnected";
});
app.component("vue-flatpickr", VueFlatpickr);
app.mount("#app");
