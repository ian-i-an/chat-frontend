import type { RandomChatEvent } from "@/types/types";
import { useEffect, useRef, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export function useRandomChatSse(
  onEventReceived: (event: RandomChatEvent) => void,
) {
  const [isConnected, setIsConnected] = useState(false);
  const callbackRef = useRef(onEventReceived);

  useEffect(() => {
    callbackRef.current = onEventReceived;
  });

  useEffect(() => {
    const eventSource = new EventSource(`${API_URL}/api/random-chat/events`, {
      withCredentials: true,
    });

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onmessage = (message) => {
      const event: RandomChatEvent = JSON.parse(message.data);
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
