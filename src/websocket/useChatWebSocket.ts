import { useEffect, useRef } from "react";
import { stompClient } from "./websocket-client";
import type { Chat } from "@/types/types";
import { useWebSocketConnection } from "@/websocket/WebSocketContext";
import { toast } from "sonner";

export const useChatWebSocket = (
  roomCode: string,
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
      `/sub/rooms/${roomCode}`,
      (message) => {
        const newChat: Chat = JSON.parse(message.body);
        callbackRef.current(newChat);
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [roomCode, isConnected]);

  const sendMessage = (content: string) => {
    if (stompClient.connected) {
      stompClient.publish({
        destination: `/pub/rooms/${roomCode}/chats`,
        body: JSON.stringify({ content }),
      });
    } else {
      toast.error("연결이 끊겨 메시지를 보낼 수 없어요");
    }
  };

  return { sendMessage };
};
