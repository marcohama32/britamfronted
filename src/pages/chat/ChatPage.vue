<template>
  <div>
    <!-- END: Top Bar -->
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Chat</h2>
    </div>
    <div class="intro-y chat grid grid-cols-12 gap-5 mt-5">
      <!-- BEGIN: Chat Side Menu -->
      <div class="col-span-12 lg:col-span-4 2xl:col-span-3">
        <div class="intro-y pr-1">
          <div class="box p-2">
            <ul class="nav nav-pills" role="tablist">
              <li id="chats-tab" class="nav-item flex-1" role="presentation">
                <button class="nav-link w-full py-2 active" type="button">
                  Chats
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="tab-content">
          <div
            id="chats"
            class="tab-pane active"
            role="tabpanel"
            aria-labelledby="chats-tab"
          >
            <div v-if="manager !== null || agent !== null">
              <div
                class="chat__chat-list overflow-y-auto scrollbar-hidden pr-1 pt-1 mt-4"
              >
                <div
                  v-if="manager !== null"
                  @click="selectChat(manager)"
                  class="intro-x cursor-pointer box relative flex items-center p-5 mt-5"
                >
                  <div class="w-12 h-12 flex-none image-fit mr-1">
                    <img
                      v-if="manager.avatar"
                      class="tooltip rounded-full"
                      :title="
                        manager.avatarUploadDate
                          ? 'Uploaded at ' + manager.avatarUploadDate
                          : 'Avatar Image'
                      "
                      alt="partner logo"
                      :src="`${axiosBaseUrl}/${manager.avatar}`"
                      @error="handleAvatarError"
                      @load="handleAvatarLoad"
                    />
                    <img
                      v-else
                      src="../../dist/images/logow.png"
                      alt="profilecustomer"
                      class="rounded-full"
                    />
                    <div
                      class="w-3 h-3 rounded-full absolute bottom-0 right-0 bg-success"
                      v-if="manager.isOnline"
                    ></div>
                  </div>
                  <div class="ml-2 overflow-hidden">
                    <div class="flex items-center">
                      <a href="javascript:;" class="font-medium">
                        {{ manager.firstName }} {{ manager.lastName }}
                      </a>
                      <!-- <div class="text-xs text-slate-400 ml-auto">01:10 PM</div> -->
                    </div>
                    <div class="w-full truncate text-slate-500 mt-0.5">
                      {{ manager.email }}
                    </div>
                  </div>
                  <div
                    class="w-5 h-5 text-white text-center rounded-full bg-primary font-medium absolute top-0 right-0 -mt-1 -mr-1"
                    v-if="manager.unreadCount > 0"
                  >
                    {{ manager.unreadCount }}
                  </div>
                </div>
                <div
                  v-if="agent !== null"
                  @click="selectChat(agent)"
                  class="intro-x cursor-pointer box relative flex items-center p-5 mt-5"
                >
                  <div class="w-12 h-12 flex-none image-fit mr-1">
                    <img
                      v-if="agent.avatar"
                      class="tooltip rounded-full"
                      :title="
                        agent.avatarUploadDate
                          ? 'Uploaded at ' + agent.avatarUploadDate
                          : 'Avatar Image'
                      "
                      alt="partner logo"
                      :src="`${axiosBaseUrl}/${agent.avatar}`"
                      @error="handleAvatarError"
                      @load="handleAvatarLoad"
                    />
                    <img
                      v-else
                      src="../../dist/images/logow.png"
                      alt="profilecustomer"
                      class="rounded-full"
                    />
                    <div
                      class="w-3 h-3 rounded-full absolute bottom-0 right-0 bg-success"
                      v-if="agent.isOnline"
                    ></div>
                  </div>
                  <div class="ml-2 overflow-hidden">
                    <div class="flex items-center">
                      <a href="javascript:;" class="font-medium">
                        {{ agent.firstName }} {{ agent.lastName }}
                      </a>
                      <!-- <div class="text-xs text-slate-400 ml-auto">01:10 PM</div> -->
                    </div>
                    <div class="w-full truncate text-slate-500 mt-0.5">
                      {{ agent.email }}
                    </div>
                  </div>
                  <div
                    class="w-5 h-5 text-white text-center rounded-full bg-primary font-medium absolute top-0 right-0 -mt-1 -mr-1"
                    v-if="agent.unreadCount > 0"
                  >
                    {{ agent.unreadCount }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Chat Side Menu -->

      <!-- BEGIN: Chat Content -->
      <div class="intro-y col-span-12 lg:col-span-8 2xl:col-span-9">
        <div class="chat__box box">
          <!-- BEGIN: Chat Active -->

          <div class="h-full flex flex-col">
            <div
              class="flex flex-col sm:flex-row border-b border-slate-200/60 dark:border-darkmode-400 px-5 py-4"
            >
              <div class="flex items-center">
                <div
                  class="w-10 h-10 sm:w-12 sm:h-12 flex-none image-fit relative"
                >
                  <img
                    v-if="avatarCustomer"
                    class="tooltip rounded-full"
                    :title="
                      avatarCustomer.avatarUploadDate
                        ? 'Uploaded at ' + avatarCustomer.avatarUploadDate
                        : 'Avatar Image'
                    "
                    alt="Company logo"
                    :src="`${axiosBaseUrl}/${avatarCustomer}`"
                    @error="handleAvatarError"
                    @load="handleAvatarLoad"
                  />
                </div>
                <!--  -->
                <div class="ml-3 mr-auto">
                  <div class="font-medium text-base">
                    {{ firstName }} {{ lastName }}
                  </div>
                  <div class="text-slate-500 text-xs sm:text-sm">
                    <!-- Hey, I am using chat <span class="mx-1">•</span> Online -->
                  </div>
                </div>
              </div>
            </div>

            <div
              class="overflow-y-scroll scrollbar-hidden px-5 pt-5 flex-1"
              id="chat-container"
            >
              <div
                v-for="(message, index) in messages"
                :key="index"
                class="clear-both"
              >
                <div
                  v-if="isCurrentUser(message)"
                  class="chat__box__text-box flex items-end float-right mb-4"
                >
                  <!-- <label>message: {{ message.receiverId._id }} and profile: {{ profileId }}</label> -->
                  <div class="hidden sm:block dropdown mr-3 my-auto">
                    <a
                      href="javascript:;"
                      class="dropdown-toggle w-4 h-4 text-slate-500"
                      aria-expanded="false"
                      data-tw-toggle="dropdown"
                    >
                      <i data-lucide="more-vertical" class="w-4 h-4"></i>
                    </a>
                  </div>
                  <div
                    class="bg-primary px-4 py-3 text-white rounded-l-md rounded-t-md"
                  >
                    {{ message.text }}
                    <div class="mt-1 text-xs text-white text-opacity-80">
                      {{ formatTimestamp(message.timestamp) }}
                    </div>
                  </div>
                  <div
                    class="w-10 h-10 hidden sm:block flex-none image-fit relative ml-5 rounded-full"
                  >
                    <img
                      v-if="message.senderId && message.senderId.avatar"
                      class="rounded-full"
                      :title="
                        message.avatarUploadDate
                          ? 'Uploaded at ' + message.avatarUploadDate
                          : 'Avatar Image'
                      "
                      alt="Company logo"
                      :src="`${axiosBaseUrl}/${message.senderId.avatar}`"
                      @error="handleAvatarError"
                      @load="handleAvatarLoad"
                    />
                    <img
                      v-else
                      src="../../dist/images/logow.png"
                      alt="profilecustomer"
                      class="rounded-full"
                    />
                  </div>
                </div>

                <div
                  v-else
                  class="chat__box__text-box flex items-end float-left mb-4"
                >
                  <div
                    class="w-10 h-10 hidden sm:block flex-none image-fit relative mr-5"
                  >
                    <img
                      v-if="message.senderId && message.receiverId.avatar"
                      class="rounded-full"
                      :title="
                        message.avatarUploadDate
                          ? 'Uploaded at ' + message.avatarUploadDate
                          : 'Avatar Image'
                      "
                      alt="Company logo"
                      :src="`${axiosBaseUrl}/${message.senderId.avatar}`"
                      @error="handleAvatarError"
                      @load="handleAvatarLoad"
                    />
                    <img
                      v-else
                      src="../../dist/images/logow.png"
                      alt="profilecustomer"
                      class="rounded-full"
                    />
                  </div>
                  <div
                    class="bg-slate-100 dark:bg-darkmode-400 px-4 py-3 text-slate-500 rounded-r-md rounded-t-md"
                  >
                    {{ message.text }}
                    <div class="mt-1 text-xs text-slate-500">
                      {{ formatTimestamp(message.timestamp) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="activechat"
              class="pt-4 pb-10 sm:py-4 flex items-center border-t border-slate-200/60 dark:border-darkmode-400"
            >
              <textarea
                class="chat__box__input form-control dark:bg-darkmode-600 h-16 resize-none border-transparent px-5 py-3 shadow-none focus:border-transparent focus:ring-0"
                rows="1"
                placeholder="Type your message..."
                v-model="newMessage"
              ></textarea>
              <div
                class="flex absolute sm:static left-0 bottom-0 ml-5 sm:ml-0 mb-5 sm:mb-0"
              >
                <div class="dropdown mr-3 sm:mr-5">
                  <a
                    href="javascript:;"
                    class="dropdown-toggle w-4 h-4 sm:w-5 sm:h-5 block text-slate-500"
                    aria-expanded="false"
                    data-tw-toggle="dropdown"
                  >
                    <i data-lucide="smile" class="w-full h-full"></i>
                  </a>
                  <div class="chat-dropdown dropdown-menu">
                    <div class="dropdown-content"></div>
                  </div>
                </div>
                <div
                  class="w-4 h-4 sm:w-5 sm:h-5 relative text-slate-500 mr-3 sm:mr-5"
                >
                  <i data-lucide="paperclip" class="w-full h-full"></i>
                  <input
                    type="file"
                    class="w-full h-full top-0 left-0 absolute opacity-0"
                  />
                </div>
              </div>
              <a
                href="javascript:;"
                @click="sendMessage"
                class="w-8 h-8 sm:w-10 sm:h-10 block bg-primary text-white rounded-full flex-none flex items-center justify-center mr-5"
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
                  class="lucide lucide-send-horizontal w-4 h-4"
                >
                  <path d="m3 3 3 9-3 9 19-9Z" />
                  <path d="M6 12h16" />
                </svg>
              </a>
            </div>
          </div>
          <!-- END: Chat Active -->
          <!-- BEGIN: Chat Default -->
          <div class="h-full flex items-center">
            <div class="mx-auto text-center">
              <div
                class="w-16 h-16 flex-none image-fit rounded-full overflow-hidden mx-auto"
              >
                <img
                  alt="Midone - HTML Admin Template"
                  src="dist/images/profile-13.jpg"
                />
              </div>
              <div class="mt-3">
                <div class="font-medium">Hey, Charlize Theron!</div>
                <div class="text-slate-500 mt-1">
                  Please select a chat to start messaging.
                </div>
              </div>
            </div>
          </div>
          <!-- END: Chat Default -->
        </div>
      </div>
      <!-- END: Chat Content -->
    </div>
  </div>
  <!-- END: Content -->
</template>

<script>
import Cookies from "js-cookie";
import axios from "axios"; // Import Axios library

export default {
  components: {
    // Picker,
  },
  data() {
    return {
      activechat: false,
      firstName: "",
      lastName: "",
      avatarCustomer: "",
      users: [],
      messages: [],
      newMessage: "",
      profileId: "",
      showEmojiPicker: false,
      manager: null,
      agent: null,
      currentUser: {
        _id: this.profileId, // Replace with the logged-in user's ID
      },
      receiverId: "",
      // receiverUser: {
      //   _id: "RECEIVER_USER_ID", // Replace with the ID of the chat partner
      // },
      selectedChat: null,
    };
  },
  computed: {
    axiosBaseUrl() {
      return axios.defaults.baseURL;
    },
  },
  created() {
    this.axios = axios; // Create a reference to axios
    this.fetchUsers();
    this.getProfile();
    // Connect to the socket server
    this.$socket.connect();

    // Listen for the 'user-online' event from the server
    this.$socket.on("user-online", (userId) => {
      // Update online status for the specific user
      const user = this.users.find((user) => user._id === userId);
      if (user) {
        user.isOnline = true;
      }
    });

    this.$socket.on("chat message", (message) => {
      // console.log("ENTROU");
      console.log("Received chat message:", message);
      this.fetchChatMessages(this.receiverUser);

      this.scrollToBottom();
    });

    // // Listen for the "notification" event
    // this.$socket.on("notification", (notificationMessage) => {
    //   // Handle the received notification
    //   // alert("Notification: " + notificationMessage);
    //   console.log("Received notification:", notificationMessage);

    //   // You can push the notification message to the notifications array
    //   this.notifications.push(notificationMessage);
    // });

    // Listen for the 'chat message read' event from the server
    this.$socket.on("chat-message-read", (receiverId) => {
      // Reset unread count for the specific user
      const user = this.users.find((user) => user._id === receiverId);
      if (user) {
        user.unreadCount = 0;
      }
    });
  },
  methods: {
    incrementUnreadCount(userId) {
      // Emit a socket event to increment unread count on the server
      this.$socket.emit("increment-unread-count", userId);
    },
    resetUnreadCount(userId) {
      // Emit a socket event to reset unread count on the server
      this.$socket.emit("reset-unread-count", userId);
    },
    isCurrentUser(message) {
      const isCurrent = message.senderId._id === this.profileId;

      return isCurrent;
    },
    getProfile() {
      this.loading = true;
      const token = Cookies.get("token");
      this.axios
        .get(`/api/me`, {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          this.loading = false;
          // Update the component's data with the received response
          const userData = response.data.user;
          this.profileId = response.data.user._id;
          if (userData) {
            this.profileId = userData._id;
            this.manager = userData.manager;
            if (userData.agent) {
              this.agent = userData.agent;
            }
          } else {
            this.errorMessage = "No user data found.";
          }
        })
        .catch((error) => {
          this.errorMessage = "Error retrieving this user. Please try again."; // Set the error message
          console.error("Error retrieving user:", error);
        });
    },

    fetchUsers() {
      this.loading = true;
      const token = Cookies.get("token");
      this.axios
        .get("/api/allusers", {
          headers: {
            token: token,
          },
        })
        .then((response) => {
          this.users = response.data.users;
          // console.log("Usuarios: ", response.data.users);
        })
        .catch((error) => {
          this.errorMessage = "Error retrieving this user. Please try again."; // Set the error message
          console.error("Error retrieving plan:", error);
        });
    },
    openEmojiPicker() {
      this.showEmojiPicker = true;
    },
    addEmoji(emoji) {
      this.newMessage += emoji.native;
    },
    closeEmojiPicker() {
      this.showEmojiPicker = false;
    },
    openFilePicker() {
      this.$refs.fileInput.click();
    },
    attachFile(event) {
      const file = event.target.files[0];
      // Perform necessary actions with the attached file (upload, etc.)
      console.log("Attached file:", file);
    },
    selectChat(user) {
      this.selectedChat = user;
      this.receiverUser = user._id;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.avatarCustomer = user.avatar;
      this.activechat = true;
      this.fetchChatMessages(this.receiverUser);
      this.scrollToBottom();
    },

    async fetchChatMessages(receiverId) {
      const token = Cookies.get("token");
      try {
        // Fetch messages from the server
        const response = await this.axios.get(
          `/api/chat/getmessages?senderId=${this.profileId}&receiverId=${receiverId}`,
          {
            headers: { token: token },
          }
        );

        // Update messages and emit socket event to mark messages as read
        this.messages = response.data.sort((a, b) => {
          return (
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
          );
        });

        // Emit the 'chat-message-read' event to mark messages as read on the server
        this.$socket.emit("chat-message-read", receiverId);

        // Reset unread count locally
        const user = this.users.find((user) => user._id === receiverId);
        if (user) {
          user.unreadCount = 0;
        }

        // Scroll to the bottom of the chat container
        this.scrollToBottom();
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      }
    },

    async sendMessage() {
      if (this.newMessage.trim() !== "") {
        const message = {
          text: this.newMessage,
          senderId: this.profileId,
          receiverId: this.receiverUser,
        };
        const token = Cookies.get("token");
        try {
          await this.axios.post("/api/chat/message", message, {
            headers: {
              token: token,
            },
          });

          if (message.receiverId === this.selectedChat._id) {
            // If the receiver is currently selected, push to the left side (receiver's side)
            this.messages.push({ ...message, senderId: this.selectedChat });
          } else {
            // If not, push to the right side (sender's side)
            this.messages.push(message);
          }

          // Clear the new message input
          this.newMessage = "";

          // Emit the chat message event
          this.$socket.emit("chat message", message);

          // Emit the notification event
          this.$socket.emit("notification", {
            receiverId: this.receiverUser,
            // message: "You have a new message",
          });

          // Increment unread count
          this.incrementUnreadCount(message.receiverId);

          // Scroll to the bottom of the chat
          this.scrollToBottom();
        } catch (error) {
          console.error("Error sending chat message:", error);
        }
      }
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const chatContainer = document.getElementById("chat-container");
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      });
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
  },
};
</script>
