import { Outlet } from "react-router-dom";

export default function WhiteBarLayout() {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden mobile-page-size bg-surface shadow-sm">
      <Outlet />
    </div>
  );
}
