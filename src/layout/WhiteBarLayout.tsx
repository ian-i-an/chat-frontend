import { Outlet } from "react-router-dom";

export default function WhiteBarLayout() {
  return (
    <div className="mx-auto flex min-h-0 w-full max-w-md min-w-64 flex-1 flex-col overflow-hidden bg-white shadow-sm">
      <Outlet />
    </div>
  );
}
