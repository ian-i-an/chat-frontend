import { Outlet } from "react-router-dom";

export default function AppBackgroundLayout() {
  return (
    <div className="min-h-dvh bg-gray-50">
      <Outlet />
    </div>
  );
}
