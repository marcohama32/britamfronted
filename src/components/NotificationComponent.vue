<template>
  <div>
    <div class="notification-container">
      <router-link
        v-for="notification in notifications"
        :key="notification.id"
        class="alert alert-primary alert-dismissible show flex items-center mb-2 notification"
        role="alert"
        :to="`customertransactiondetail/${notification.transactionId}`"
      >
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
          class="lucide lucide-alert-circle w-6 h-6 mr-2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
        {{ notification.message }}
        <button
          type="button"
          class="btn-close text-white"
          data-tw-dismiss="alert"
          aria-label="Close"
        >
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
            class="lucide lucide-x w-4 h-4"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      notifications: [],
    };
  },
  computed: {
    axiosBaseUrl() {
      return axios.defaults.baseURL;
    },
  },
  
  created() {
    this.axios = axios; // Create a reference to axios
    // Connect to the SSE endpoint on the server
    const source = new EventSource(
      `${axios.defaults.baseURL}/api/transactionnotifications`
    );

    // Connect to the SSE endpoint on the server
    // const source2 = new EventSource(
    //   `${axios.defaults.baseURL}/api/notifications`
    // );
    // Listen for SSE events
    source.addEventListener("message", (event) => {
      // Parse the event data
      const data = JSON.parse(event.data);

      // Update the notifications array with the received notification data
      this.notifications.push(data);
    });
  },
};
</script>

<style>
.notification-container {
  position: fixed;
  top: 20px; /* Adjust this value to set the vertical position */
  right: 20px; /* Adjust this value to set the horizontal position */
  z-index: 9999; /* Ensure the notification appears on top of other elements */
  background: none;
  color: white;
  --tw-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color),
    0 8px 10px -6px var(--tw-shadow-color);
}
</style>
