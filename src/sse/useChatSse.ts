import type { ChatSseEvent } from "@/domains/chat/chat.type";
import { useEffect, useRef, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export function useChatSse(
  roomCode: string,
  onEventReceived: (event: ChatSseEvent) => void,
) {
  const [isConnected, setIsConnected] = useState(false);
  const callbackRef = useRef(onEventReceived);

  useEffect(() => {
    callbackRef.current = onEventReceived;
  });

  useEffect(() => {
    const eventSource = new EventSource(
      `${API_URL}/api/rooms/${roomCode}/events`,
      { withCredentials: true },
    );

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onmessage = (message) => {
      const event: ChatSseEvent = JSON.parse(message.data);
      callbackRef.current(event);
    };

    eventSource.onerror = () => {
      setIsConnected(false);
    };

    return () => {
      eventSource.close();
      setIsConnected(false);
    };
  }, [roomCode]);

  return { isConnected };
}
