import { useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";
import type { RandomChatEvent } from "@/types/types";
import { useWebSocketConnection } from "@/websocket/WebSocketContext";
import { stompClient } from "./websocket-client";

type RandomChatStartRequest = {
  initialMessage?: string;
};

type RandomChatMessageRequest = {
  content: string;
};

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

  const startRandomChat = useCallback((initialMessage?: string) => {
    if (!stompClient.connected) {
      toast.error("연결이 끊겨 랜덤 채팅을 시작할 수 없어요.");
      return;
    }

    const payload: RandomChatStartRequest = initialMessage
      ? { initialMessage }
      : {};

    stompClient.publish({
      destination: "/pub/random-chat/start",
      body: JSON.stringify(payload),
    });
    console.log("[random chat] 연결 요청");
  }, []);

  const sendRandomChatMessage = useCallback((content: string) => {
    if (!stompClient.connected) {
      toast.error("연결이 끊겨 메시지를 보낼 수 없어요.");
      return;
    }

    const payload: RandomChatMessageRequest = { content };

    stompClient.publish({
      destination: "/pub/random-chat/message",
      body: JSON.stringify(payload),
    });
  }, []);

  const leaveRandomChat = useCallback(() => {
    if (!stompClient.connected) {
      toast.error("연결이 끊겨 요청을 보낼 수 없어요.");
      return;
    }

    stompClient.publish({
      destination: "/pub/random-chat/leave",
      body: JSON.stringify({}),
    });
  }, []);

  return {
    isConnected,
    startRandomChat,
    sendRandomChatMessage,
    leaveRandomChat,
  };
};
