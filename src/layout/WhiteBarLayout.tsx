import { Outlet } from "react-router-dom";

export default function WhiteBarLayout() {
  return (
    <div className="flex flex-col overflow-hidden bg-gray-100 h-dvh">
      <div className="mx-auto flex w-full max-w-md min-w-64 flex-1 flex-col overflow-hidden bg-white shadow-sm">
        <Outlet />
      </div>
    </div>
  );
}
