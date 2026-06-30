import { useEffect, useRef } from "react";
import { stompClient } from "./websocket-client";
import type { ChatEventPayload } from "@/types/types";
import { useWebSocketConnection } from "@/websocket/WebSocketContext";
import { toast } from "sonner";

export const useChatWebSocket = (
  roomCode: string,
  onMessageReceived: (newChat: ChatEventPayload) => void,
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
        const event: ChatEventPayload = JSON.parse(message.body);
        callbackRef.current(event);
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [roomCode, isConnected]);

  const sendMessage = (content: string, replyToId?: number) => {
    if (stompClient.connected) {
      stompClient.publish({
        destination: `/pub/rooms/${roomCode}/chats`,
        body: JSON.stringify({ content, replyToId }),
      });
    } else {
      toast.error("연결이 끊겨 메시지를 보낼 수 없어요");
    }
  };

  return { sendMessage };
};
