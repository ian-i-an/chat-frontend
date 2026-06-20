import { createContext, useContext } from "react";

export const WebSocketContext = createContext<boolean>(false);

export function useWebSocketConnection() {
  return useContext(WebSocketContext);
}
