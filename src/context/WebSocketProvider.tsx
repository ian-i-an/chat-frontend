import { useEffect, useState, type ReactNode } from "react";
import { stompClient } from "@/api/websocket-client";
import { WebSocketContext } from "./WebSocketContext";

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
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

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={isConnected}>
      {children}
    </WebSocketContext.Provider>
  );
}
