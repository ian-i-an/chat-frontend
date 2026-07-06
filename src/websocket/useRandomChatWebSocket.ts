import { useEffect, useRef } from "react";
import { toast } from "sonner";
import type { RandomChatEvent } from "@/types/types";
import { useWebSocketConnection } from "@/websocket/WebSocketContext";
import { stompClient } from "./websocket-client";

export const useRandomChatWebSocket = (
  onEventReceived: (event: RandomChatEvent) => void,
) => {
  const isConnected = useWebSocketConnection();
  const callbackRef = useRef(onEventReceived);

  useEffect(() => {
    callbackRef.current = onEventReceived;
  });

  useEffect(() => {
    if (!isConnected) return;

    const subscription = stompClient.subscribe(
      "/user/queue/random-chat",
      (message) => {
        const event: RandomChatEvent = JSON.parse(message.body);
        callbackRef.current(event);
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [isConnected]);

  const startRandomChat = () => {
    if (!stompClient.connected) {
      toast.error("연결이 끊겨 랜덤 채팅을 시작할 수 없어요.");
      return;
    }

    stompClient.publish({
      destination: "/pub/random-chat/start",
      body: JSON.stringify({}),
    });
  };

  const sendRandomChatMessage = (content: string) => {
    if (!stompClient.connected) {
      toast.error("연결이 끊겨 메시지를 보낼 수 없어요.");
      return;
    }

    stompClient.publish({
      destination: "/pub/random-chat/message",
      body: JSON.stringify({ content }),
    });
  };

  const leaveRandomChat = () => {
    if (!stompClient.connected) return;

    stompClient.publish({
      destination: "/pub/random-chat/leave",
      body: JSON.stringify({}),
    });
  };

  return {
    isConnected,
    startRandomChat,
    sendRandomChatMessage,
    leaveRandomChat,
  };
};
