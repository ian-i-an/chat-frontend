import { Outlet } from "react-router-dom";

export default function AppBackgroundLayout() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-gray-50">
      <Outlet />
    </div>
  );
}
