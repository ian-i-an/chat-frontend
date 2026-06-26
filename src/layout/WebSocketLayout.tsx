import { stompClient } from "@/websocket/websocket-client";
import { WebSocketContext } from "@/websocket/WebSocketContext";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function WebSocketLayout() {
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
      <Outlet />
    </WebSocketContext.Provider>
  );
}
