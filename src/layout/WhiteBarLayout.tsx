import { Outlet } from "react-router-dom";

export default function WhiteBarLayout() {
  return (
    <div className="app-layout mx-auto w-full max-w-md min-w-64 bg-surface shadow-sm">
      <Outlet />
    </div>
  );
}
