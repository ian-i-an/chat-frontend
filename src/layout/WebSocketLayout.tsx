import { WebSocketProvider } from "@/context/WebSocketProvider";
import { Outlet } from "react-router-dom";

export default function WebSocketLayout() {
  return (
    <WebSocketProvider>
      <Outlet />
    </WebSocketProvider>
  );
}
