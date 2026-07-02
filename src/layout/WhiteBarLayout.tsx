import { Outlet } from "react-router-dom";

export default function WhiteBarLayout() {
  return (
    <div className="fixed inset-0 bg-gray-100">
      <div className="mx-auto flex h-full w-full max-w-md min-w-64 flex-col overflow-hidden bg-white shadow-sm">
        <Outlet />
      </div>
    </div>
  );
}
