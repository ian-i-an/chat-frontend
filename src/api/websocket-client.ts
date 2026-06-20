import { Client } from "@stomp/stompjs";

export const stompClient = new Client({
  brokerURL: import.meta.env.VITE_SOCKET_URL,

  reconnectDelay: 5000,
  onConnect: () => {
    console.log("웹소켓 메인 고속도로 연결 성공!");
  },
  onDisconnect: () => {
    console.log("웹소켓 연결 끊김!");
  },

  debug: function (str) {
    console.log("[STOMP Debug]: ", str);
  },

  heartbeatIncoming: 20000,
  heartbeatOutgoing: 20000,

  //   onStompError:
  // 6. 웹소켓 자체의 네트워크 에러
  //   onWebSocketError: ()=>{}
});
