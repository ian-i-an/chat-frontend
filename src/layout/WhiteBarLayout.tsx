import { Outlet } from "react-router-dom";

export default function WhiteBarLayout() {
  return (
    <div className="flex flex-col h-full  overflow-hidden bg-gray-100">
      <div className="mx-auto flex flex-1 w-full max-w-md min-w-64 flex-col overflow-hidden bg-white shadow-sm">
        <Outlet />
      </div>
    </div>
  );
}
