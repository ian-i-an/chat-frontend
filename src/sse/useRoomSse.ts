import type { RoomSseEvent } from "@/domain/room.type";
import { useEffect, useRef, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;


export function useRoomSse({
  onEventReceived,
}: {
  onEventReceived: (event: RoomSseEvent) => void;
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
      const event: RoomSseEvent = JSON.parse(message.data);
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
