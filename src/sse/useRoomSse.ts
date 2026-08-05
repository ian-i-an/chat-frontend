import { useEffect, useRef, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export type ChatListSseEvent = {
  roomCode: string;
  lastMessage: string;
  isMyMessage: boolean;
};

export function useChatListSse({
  onEventReceived,
}: {
  onEventReceived: (event: ChatListSseEvent) => void;
}) {
  const [isConnected, setIsConnected] = useState(false);
  const callbackRef = useRef(onEventReceived);

  useEffect(() => {
    callbackRef.current = onEventReceived;
  });

  useEffect(() => {
    const eventSource = new EventSource(`${API_URL}/api/rooms/events`, {
      withCredentials: true,
    });

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onmessage = (message) => {
      const event: ChatListSseEvent = JSON.parse(message.data);
      callbackRef.current(event);
    };

    eventSource.onerror = () => {
      setIsConnected(false);
    };

    return () => {
      eventSource.close();
      setIsConnected(false);
    };
  }, []);

  return { isConnected };
}
