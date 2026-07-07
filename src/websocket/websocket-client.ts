import { Client } from "@stomp/stompjs";

export const stompClient = new Client({
  brokerURL: import.meta.env.VITE_SOCKET_URL,

  reconnectDelay: 500,
  connectionTimeout: 10000,

  // debug: function (str) {
  //   console.log("[STOMP Debug]: ", str);
  // },

  heartbeatIncoming: 20000,
  heartbeatOutgoing: 20000,
});
