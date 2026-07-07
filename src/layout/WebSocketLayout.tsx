import { stompClient } from "@/websocket/websocket-client";
import { WebSocketContext } from "@/websocket/WebSocketContext";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

export default function WebSocketLayout() {
  const [isConnected, setIsConnected] = useState(false);
  const isReconnectingRef = useRef(false);

  useEffect(() => {
    const reconnectWebSocket = async () => {
      if (stompClient.connected || isReconnectingRef.current) return;

      isReconnectingRef.current = true;

      try {
        if (stompClient.active) {
          await stompClient.deactivate();
        }

        stompClient.activate();
      } finally {
        isReconnectingRef.current = false;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void reconnectWebSocket();
      }
    };

    const handleReconnect = () => {
      void reconnectWebSocket();
    };

    stompClient.onConnect = () => {
      setIsConnected(true);
    };
    stompClient.onDisconnect = () => {
      setIsConnected(false);
    };

    stompClient.onWebSocketClose = () => {
      setIsConnected(false);
    };

    stompClient.onStompError = () => {
      setIsConnected(false);
    };

    stompClient.onWebSocketError = () => {
      setIsConnected(false);
    };

    if (!stompClient.active) {
      stompClient.activate();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleReconnect);
    window.addEventListener("online", handleReconnect);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleReconnect);
      window.removeEventListener("online", handleReconnect);
      stompClient.deactivate();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={isConnected}>
      <Outlet />
    </WebSocketContext.Provider>
  );
}
