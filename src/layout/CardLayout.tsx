import { Outlet } from "react-router-dom";

export default function CardLayout() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <div className="flex w-full max-w-sm min-w-75 flex-col rounded-3xl border border-white/60 bg-white/60 px-6 pt-5 pb-6 shadow-lg ring-1 shadow-gray-200/50 ring-gray-950/5 backdrop-blur-xl">
        <Outlet />
      </div>
    </div>
  );
}
