import { useEffect, useRef } from "react";
import { stompClient } from "./websocket-client";
import type { Chat } from "@/types/types";
import { useWebSocketConnection } from "@/websocket/WebSocketContext";

export const useChatWebSocket = (
  roomId: number,
  onMessageReceived: (newChat: Chat) => void,
) => {
  const isConnected = useWebSocketConnection();

  const callbackRef = useRef(onMessageReceived);

  useEffect(() => {
    callbackRef.current = onMessageReceived;
  });

  useEffect(() => {
    if (!isConnected) return;
    const subscription = stompClient.subscribe(
      `/sub/rooms/${roomId}`,
      (message) => {
        const newChat: Chat = JSON.parse(message.body);
        callbackRef.current(newChat);
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [roomId, isConnected]);

  const sendMessage = (content: string) => {
    if (stompClient.connected) {
      stompClient.publish({
        destination: `/pub/rooms/${roomId}/chats`,
        body: JSON.stringify({ content }),
      });
    } else {
      console.warn("웹소켓이 연결되어 있지 않아 메시지를 보낼 수 없습니다.");
    }
  };

  return { sendMessage };
};
