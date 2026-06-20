import { useEffect } from "react";
import { stompClient } from "../api/websocket-client";
import type { Chat } from "@/types";
import { useWebSocketConnection } from "@/context/WebSocketContext";
import { useQueryClient } from "@tanstack/react-query";

export const useChatWebSocket = (
  chatRoomId: number,
  onMessageReceived: (newChat: Chat) => void,
) => {
  const isConnected = useWebSocketConnection();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isConnected) return;
    const subscription = stompClient.subscribe(
      `/sub/chat-rooms/${chatRoomId}`,
      (message) => {
        const newChat: Chat = JSON.parse(message.body);
        onMessageReceived(newChat);
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [chatRoomId, onMessageReceived, isConnected, queryClient]);

  const sendMessage = (content: string) => {
    if (stompClient.connected) {
      stompClient.publish({
        destination: `/pub/chat-rooms/${chatRoomId}/chats`,
        body: JSON.stringify({ content }),
      });
    } else {
      console.warn("웹소켓이 연결되어 있지 않아 메시지를 보낼 수 없습니다.");
    }
  };

  return { sendMessage };
};
